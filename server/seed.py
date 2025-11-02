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
        c1 = Category()

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

        # # Add logs:
        # print("Seeding logs...")
        # l1 = Log(note=fake.sentence(), date=fake.date() , user=u1, workout=w7)
        # l2 = Log(note=fake.sentence(), date=fake.date(), user=u1, workout=w5)
        # l3 = Log(note=fake.sentence(), date=fake.date(), user=u1, workout=w6)
        # l4 = Log(note=fake.sentence(), date=fake.date(), user=u1, workout=w2)
        # l5 = Log(note=fake.sentence(), date=fake.date(), user=u2, workout=w2)
        # l6 = Log(note=fake.sentence(), date=fake.date(), user=u2, workout=w3)
        # l7 = Log(note=fake.sentence(), date=fake.date(), user=u2, workout=w6)
        # l8 = Log(note=fake.sentence(), date=fake.date(), user=u3, workout=w8)
        # db.session.add_all([l1, l2, l3, l4, l5, l6, l7, l8])
        db.session.commit()

        print("Done seeding!")