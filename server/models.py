from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    age = db.Column(db.Integer)

    expenses = db.relationship(
        'Expense', back_populates='user', cascade='all, delete-orphan')
    
    holidays = db.relationship(
        'Holiday', secondary='expenses', viewonly=True, back_populates='users'
    )

    categories = db.relationship(
        'Category', secondary='expenses', viewonly=True, back_populates='users'
    )

    serialize_rules = ('-expenses', '-holidays.users', '-categories.users', '-_password_hash')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    

class Holiday(db.Model, SerializerMixin):
    __tablename__='holidays'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)

    expenses = db.relationship(
        'Expense', back_populates='holiday', cascade='all, delete-orphan')
    
    users = db.relationship(
        'User', secondary='expenses', viewonly=True, back_populates='holidays'
    )

    categories = db.relationship(
        'Category', secondary='expenses', viewonly=True, back_populates='holidays'
    )

    serialize_rules = ('-expenses','-users', '-categories') 

    @validates("name", "duration", "description")
    def validate_all_colums_for_holidays(self, key, value):
        if value is None or value == 0 or value.strip()=="":
            raise ValueError("A holiday must have a name, a length of duration and a description.")
        return value

class Category(db.Model, SerializerMixin):
    __tablename__='categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    expenses = db.relationship(
        'Expense', back_populates='category', cascade='all, delete-orphan')
    
    users = db.relationship(
        'User', secondary='expenses', viewonly=True, back_populates='categories'
    )

    holidays = db.relationship(
        'Holiday', secondary='expenses', viewonly=True, back_populates='categories'
    )

    serialize_rules = ('-expenses','-users', '-holidays') 

    @validates("name", "description")
    def validate_name_description_for_categories(self, key, value):
        if value is None or value.strip()=="":
            raise ValueError("A category must have a name and a description.")
        return value

class Expense(db.Model, SerializerMixin):
    __tablename__='expenses'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    holiday_id = db.Column(db.Integer, db.ForeignKey('holidays.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    user = db.relationship('User', back_populates='expenses')
    holiday = db.relationship('Holiday', back_populates='expenses')
    category = db.relationship('Category', back_populates='expenses')

    serialize_rules = ('-user.expenses', '-holiday.expenses', '-category.expenses')

    @validates("amount", "date", "user_id", "holiday_id", 'category_id')
    def validate_all_columns(self, key, value):
        if value is None or value == 0.0 or value.strip()=="":
            raise ValueError("An expense must have a corresponding amount, date, user id,  holiday id and category id.")
        return value