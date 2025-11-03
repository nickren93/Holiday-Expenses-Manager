#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Holiday, Category, Expense

fake=Faker()


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        # Delete all rows in tabels
        print("Clearing db...")
        User.query.delete()
        Holiday.query.delete()
        Category.query.delete()
        Expense.query.delete()

        # Add holidays:
        print("Seeding holidays...")
        h1 = Holiday(name="4th of July",  description="Independence Day, known colloquially as \
                     the Fourth of July, is a federal holiday in the United States which commemorates \
                     the adoption of the Declaration of Independence on July 4, 1776, establishing the \
                     United States of America.")
        h2 = Holiday(name="Memorial Day", description="Memorial Day is a federal holiday in\
                      the United States for mourning the U.S. military personnel who died while serving \
                     in the United States Armed Forces. It is observed on the last Monday of May. It is \
                     the unofficial beginning of summer in the United States.")
        h3 = Holiday(name="Labor Day", description="Labor Day is a federal holiday in the \
                     United States celebrated on the first Monday of September to honor and recognize \
                     the American labor movement and the works and contributions of laborers to the \
                     development and achievements in the United States.")
        h4 = Holiday(name="New Year's Day", description="In the Gregorian calendar, New \
                     Year's Day is the first day of the calendar year, 1 January. Most solar calendars, \
                     such as the Gregorian and Julian calendars, begin the year regularly at or near \
                     the northern winter solstice.")
        h5 = Holiday(name="Christmas Day", description="Christmas is an annual festival \
                     commemorating the birth of Jesus Christ, observed primarily on December 25 \
                     as a religious and cultural celebration among billions of people around the world.")
        h6 = Holiday(name="Thanksgiving", description="Thanksgiving is a federal holiday in the \
                     United States celebrated on the fourth Thursday of November. The earliest \
                     Thanksgiving can occur is November 22; the latest is November 28.")
        
        db.session.add_all([h1, h2, h3, h4, h5, h6])
        db.session.commit()


        # Add categories:
        print("Seeding categories...")
        c1 = Category(name="Transportation", about="Expenses that user has spent on the way from \
                      one location to another through various of ways")
        c2 = Category(name="Dining", about="Expenses that user has spent on food")
        c3 = Category(name="Entertainment", about="Expenses that user has spent on amusement or enjoyment.")
        c4 = Category(name="Gift", about="Expenses that user has spent on gifts.")
        c5 = Category(name="Medical", about="Expenses that user has spent on medical assistance.")
        db.session.add_all([c1, c2, c3, c4, c5])
        db.session.commit()


        # Add users:
        print("Seeding users...")
        u1 = User(username = 'sren', name="Nick", age='32')
        u1.password_hash = 'mimashi'
        u2 = User(username = 'innasevas', name="Inna", age='35')
        u2.password_hash = '1234'
        u3 = User(username = 'Bob', name="Bobby", age='7')
        u3.password_hash = '6666'
        db.session.add_all([u1, u2, u3])
        db.session.commit()
        
        # Add expenses:
        print("Seeding expenses...")
        e1 = Expense(amount=20.50, date=fake.date(), note="Cost for Uber to/from friends house", \
                     user=u1, holiday=h6, category=c1)
        e2 = Expense(amount=150.00, date=fake.date(), note="Cost for Dinner", user=u1, holiday=h4, category=c2)
        e3 = Expense(amount=300.00, date=fake.date(),  note="Cost for UFC event tickets", user=u1, \
                     holiday=h3, category=c3)
        e4 = Expense(amount=70.00, date=fake.date(), note="Cost for Uber to/from NYC", \
                     user=u1, holiday=h6, category=c1)
        e5 = Expense(amount=200.00, date=fake.date(), note="Cost for Christmas gifts", user=u2, \
                     holiday=h5, category=c4)
        e6 = Expense(amount=60.00, date=fake.date(), note="Cost for movie tickets", user=u2, \
                     holiday=h2, category=c3)
        e7 = Expense(amount=20.00, date=fake.date(), note="Cost for ice-cream", user=u2, holiday=h4, category=c2)
        e8 = Expense(amount=20.50, date=fake.date(), user=u3, holiday=h1, category=c3)
        db.session.add_all([e1, e2, e3, e4, e5, e6, e7, e8])
        db.session.commit()

        print("Done seeding!")