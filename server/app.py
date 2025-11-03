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
category_schema = CategorySchema()
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



# class Workouts(Resource):
#     def get(self):
#         user_id = session.get("user_id")
#         if not user_id:
#             return {'errors': 'please log in first'}, 422
        
#         workouts = [workout.to_dict() for workout in Workout.query.all()]

#         return workouts, 200


#     def post(self):
#         data = request.get_json() 
#         try:
#             new_workout = Workout(name=data.get('name'), difficulty=data.get('difficulty'), \
#                                   description=data.get("description"))
#             db.session.add(new_workout)
#             db.session.commit()
#             return make_response(new_workout.to_dict(), 201)
#         except ValueError:
#             db.session.rollback()
#             return {'errors': ["validation errors"]}, 400


# class Logs(Resource):

#     def post(self):
#         data = request.get_json()
#         # user = User.query.filter(User.id == data.get('user_id')).first()
#         workout = Workout.query.filter(Workout.id == data.get('workout_id')).first()

#         if workout and session.get("user_id"):
#             try:
#                 new_log = Log(note=data.get('note'), date=data.get('date'), \
#                                 user_id=session.get("user_id"), \
#                                 workout_id=data.get('workout_id'))
#                 db.session.add(new_log)
#                 db.session.commit()
#                 return make_response(new_log.to_dict(), 201)
#             except ValueError:
#                 db.session.rollback()
#                 return {'errors': ["validation errors"]}, 400
            
#         return {'errors': ["validation errors"]}, 400
    
#     def patch(self):
#         data = request.get_json()
#         log = Log.query.filter(Log.id == data.get('id')).first()
#         #------------------------------------------------------------------
#         user_id = session.get("user_id")
#         user = User.query.filter(User.id == user_id).first()
#         #-----------------------------------------------------------------
#         if log and user_id and log.user_id == user.id:  # check if user is logged in and if user owns this log
#             try:
#                 log.date = data.get('date')
#                 log.note = data.get('note')

#                 db.session.add(log)
#                 db.session.commit()
#                 return make_response(log.to_dict(), 202)
#             except ValueError:
#                 db.session.rollback()
#                 return {'errors': ["validation errors"]}, 400

#         return {'error': 'Log not found'}, 404
    
#     def delete(self):
#         data = request.get_json()
#         log = Log.query.filter(Log.id == data.get('id')).first()
#         # check if user is logged in and if user owns this log
#         user_id = session.get("user_id")
#         user = User.query.filter(User.id == user_id).first()

#         if log and user_id and log.user_id == user.id:
#             try:
#                 db.session.delete(log)
#                 db.session.commit()
#                 return {}, 204
#             except Exception as e:
#                 db.session.rollback()
#                 return {'errors': [str(e)]}, 400

#         return {'error': 'Log not found'}, 404
    

       


api.add_resource(CheckSession, '/check_session', endpoint='check_session')
# api.add_resource(Login, '/login', endpoint='login')
# api.add_resource(Logout, '/logout', endpoint='logout')
# api.add_resource(Signup, '/signup', endpoint='signup')
# api.add_resource(Workouts, '/workouts', endpoint='workouts')
# api.add_resource(Logs, '/logs', endpoint='logs')
# api.add_resource(LogByID, '/logs/<int:user_id>/<int:workout_id>', endpoint='log_by_id')
# api.add_resource(Users, '/users', endpoint='users')  # this route is only for testing !!!!!!!!!!

if __name__ == '__main__':
    app.run(port=5555, debug=True)

