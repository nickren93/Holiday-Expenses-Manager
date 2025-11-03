#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_marshmallow import Marshmallow

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Holiday, Category, Expense

app.secret_key = b'?w\x85Z\x08Q\xbdO\xb8\xa9\xb65Kj\xa9_'

ma = Marshmallow(app)

# Schemas:
class ExpenseSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Expense
        load_instance = True
    
    id = ma.auto_field()
    amount = ma.auto_field()
    date = ma.auto_field()
    user_id = ma.auto_field()
    holiday_id = ma.auto_field()
    category_id = ma.auto_field()

class HolidaySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Holiday
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    description = ma.auto_field()

class CategorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Category
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    about = ma.auto_field()

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True
        # exclude = ("_password_hash",)

    id = ma.auto_field()
    username = ma.auto_field()
    name = ma.auto_field()
    age = ma.auto_field()
    holidays = ma.Nested(HolidaySchema, many=True)
    categories = ma.Nested(CategorySchema, many=True)

user_schema = UserSchema()
holiday_schema = HolidaySchema()
holidays_schema = HolidaySchema(many=True)
category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)
expense_schema = ExpenseSchema()

# ---------------------------------------------------------------
# Views:
@app.before_request
def check_if_logged_in():
    user_id = session.get("user_id")
    public_endpoints = ['login', 'signup', 'check_session', 'holidays', 'categories']
    if not user_id and request.endpoint not in public_endpoints:
        return {'error': 'Unauthorized'}, 401


@app.route('/')
def index():
    return '<h1>Holiday Expenses Manager - Server</h1>'

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            user_data = user_schema.dump(user)
            user_data["holidays"] = []
            user_data["categories"] = []
            if user:
                for holiday in user.holidays:
                    holiday_dict = holiday_schema.dump(holiday)
                    # only this user's expenses will be included in holidays
                    user_expenses = [
                        expense_schema.dump(expense)
                        for expense in holiday.expenses
                        if expense.user_id == user.id
                    ]
                    holiday_dict["expenses"] = user_expenses
                    user_data["holidays"].append(holiday_dict)

                for category in user.categories:
                    category_dict = category_schema.dump(category)
                    # only this user's expenses will be included in categories
                    user_expenses = [
                        expense_schema.dump(expense)
                        for expense in category.expenses
                        if expense.user_id == user.id
                    ]
                    category_dict["expenses"] = user_expenses
                    user_data["categories"].append(category_dict)
            
                return user_data, 200
            
            return {'error': 'User cannot be found!'}, 401
        
        return {'error': 'Please Log in first!'}, 401


class Login(Resource):
    def post(self):
        user_data = request.get_json()

        username = user_data.get('username')
        password = user_data.get('password')

        user = User.query.filter(User.username == username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id

            user_data = user_schema.dump(user)
            user_data["holidays"] = []
            user_data["categories"] = []

            for holiday in user.holidays:
                holiday_dict = holiday_schema.dump(holiday)
                user_expenses = [
                    expense_schema.dump(expense)
                    for expense in holiday.expenses
                    if expense.user_id == user.id
                ]
                holiday_dict["expenses"] = user_expenses
                user_data["holidays"].append(holiday_dict)

            for category in user.categories:
                category_dict = category_schema.dump(category)
                user_expenses = [
                    expense_schema.dump(expense)
                    for expense in category.expenses
                    if expense.user_id == user.id
                ]
                category_dict["expenses"] = user_expenses
                user_data["categories"].append(category_dict)

            return user_data, 200

        return {'error': 'Invalid username or password'}, 401


class Logout(Resource):
    def delete(self):

        session['user_id'] = None
        return {}, 204
    


class Signup(Resource):
    def post(self):
        user_data = request.get_json()

        username = user_data.get('username')
        password = user_data.get('password')

        errors = []

        if not username or not password:
            errors.append('Username and password are required')
            return {'errors': errors}, 422
        
        try:
            user = User(username=username)
            user.password_hash = password

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            user_data = user_schema.dump(user)
            return user_data, 201
        
        except IntegrityError:
            db.session.rollback()
            return {'errors': ['Username must be unique']}, 422



class Holidays(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {'errors': 'please log in first'}, 422
        
        holidays = Holiday.query.all()
        holidays_data = holidays_schema.dump(holidays)

        return holidays_data, 200


    def post(self):
        data = request.get_json() 
        try:
            new_holiday = Holiday(name=data.get('name'), description=data.get("description"))
            db.session.add(new_holiday)
            db.session.commit()

            new_holiday_data = holiday_schema.dump(new_holiday)
            return new_holiday_data, 201
        except ValueError:
            db.session.rollback()
            return {'errors': ["validation errors"]}, 400


class Categories(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {'errors': 'please log in first'}, 422
        
        categories = Category.query.all()
        categories_data = categories_schema.dump(categories)

        return categories_data, 200


    def post(self):
        data = request.get_json() 
        try:
            new_category = Category(name=data.get('name'), about=data.get('about'))
            db.session.add(new_category)
            db.session.commit()

            new_category_data = category_schema.dump(new_category)
            return new_category_data, 201
        except ValueError:
            db.session.rollback()
            return {'errors': ["validation errors"]}, 400

class Expenses(Resource):

    def post(self):
        data = request.get_json()
        holiday = Holiday.query.filter(Holiday.id == data.get('holiday_id')).first()
        category = Category.query.filter(Category.id == data.get('category_id')).first()

        if holiday and category and session.get("user_id"):
            try:
                new_expense = Expense(amount = data.get('amount'), date=data.get('date'), \
                                        note=data.get('note'), \
                                        user_id=session.get("user_id"), \
                                        holiday_id=data.get('holiday_id'), \
                                        category_id=data.get('category_id'))
                db.session.add(new_expense)
                db.session.commit()

                new_expense_data = expense_schema.dump(new_expense)
                return new_expense_data, 201
            except ValueError:
                db.session.rollback()
                return {'errors': ["validation errors"]}, 400
            
        return {'errors': ["validation errors"]}, 400
    
    def patch(self):
        data = request.get_json()
        expense = Expense.query.filter(Expense.id == data.get('id')).first()
        #------------------------------------------------------------------
        user_id = session.get("user_id")
        user = User.query.filter(User.id == user_id).first()
        #-----------------------------------------------------------------
        if expense and user_id and expense.user_id == user.id:  # check if user is logged in and if user owns this expense
            try:
                expense.amount = data.get('ammount')
                expense.date = data.get('date')
                expense.note = data.get('note')

                db.session.add(expense)
                db.session.commit()
                return expense_schema.dump(expense), 202
            except ValueError:
                db.session.rollback()
                return {'errors': ["validation errors"]}, 400

        return {'error': 'Expense not found'}, 404
    
    def delete(self):
        data = request.get_json()
        expense = Expense.query.filter(Expense.id == data.get('id')).first()
        # check if user is logged in and if user owns this expense
        user_id = session.get("user_id")
        user = User.query.filter(User.id == user_id).first()

        if expense and user_id and expense.user_id == user.id:
            try:
                db.session.delete(expense)
                db.session.commit()
                return {}, 204
            except Exception as e:
                db.session.rollback()
                return {'errors': [str(e)]}, 400

        return {'error': 'Expense not found'}, 404
    

       


api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Holidays, '/holidays', endpoint='holidays')
api.add_resource(Categories, '/categories', endpoint='categories')
api.add_resource(Expenses, '/expenses', endpoint='expenses')
# api.add_resource(LogByID, '/logs/<int:user_id>/<int:workout_id>', endpoint='log_by_id')
# api.add_resource(Users, '/users', endpoint='users')  # this route is only for testing !!!!!!!!!!

if __name__ == '__main__':
    app.run(port=5555, debug=True)

