# this function is used to fill in the data in the database (mock data) -> FOR TESTING PURPISES
from models import * 
from features import signUp
import random


def fillSignUpData():
    signUp("Sudiptto", "Biswas", "biswassudiptto@gmail.com", "Sbiswas", "123112", "964996")
    signUp("Mahin", "Evan", "mahinEvan@gmail.com", "MahIN", "bds21", "964996")
    signUp("Sam", "Evan", "sam@gmail.com", "samCrew", "bds21", "087206")
    signUp("Aaaron", "Miang", "aaronM@gmail.com", "AaronCrew", "123112", "087206")
    signUp("Jessica", "Williams", "jess.williams@gmail.com", "JessieW", "passJess", "342611")
    signUp("Daniel", "Smith", "daniel.smith01@gmail.com", "DannyS", "safePass1", "549872")
    signUp("Emily", "Jones", "emily.jones@outlook.com", "EmilyJ", "secure123", "735890")
    signUp("Michael", "Brown", "michael.brown@gmail.com", "MikeB", "brownie12", "198764")
    signUp("Sophia", "Garcia", "sophia.garcia@yahoo.com", "SophieG", "gPass2024", "623451")

    
# function to add a vendor
def addVendor(first_name, last_name, email, password, store_name):
    vendor = Vendor(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        store_name=store_name
    )
    db.session.add(vendor)
    db.session.commit()


# function to modify referall codes count (mock data)
def modifyReferallCodeCount(email):
    # generate random integer from 1 - 10 (number of referalls)
    referall_count = random.randint(1, 10)

    user = User.query.filter_by(email=email).first()
    user.referral_count += referall_count

    # modify points
    user.points += (referall_count * 200)

    db.session.commit()

# function to modify number of orders (mock data)
def modifyNumberOfOrders(email):
    # generate random integer from 1 - 10 (number of orders)
    number_of_orders = random.randint(1, 10)

    user = User.query.filter_by(email=email).first()
    user.number_of_orders += number_of_orders

    # modify points
    user.points += (number_of_orders * 500)

    db.session.commit()

