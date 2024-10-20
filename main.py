"""
    This is the file where the API routes are defined.
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from passwords import *  # Make sure this imports your 'secret'
import random
from models import *
from features import *
from app import *

CORS(app)  # Enable CORS for all routes

#-> One time functions
# Function to create default plates
def create_default_plates():
    # Check if plates already exist to avoid duplicates
    if Plate.query.count() == 0:
        for i in range(1, 26):
            plate = Plate(
                plate_id=str(i),
                qr_code=f"https://127.0.0.1/QrCode/{i}",
                is_used=False,
                user_id=None,  # No user assigned initially
                meal=None,     # No meal assigned initially
                time_out=0.0,   # Default timeout set to 0,
                first_name=None,
                meal_price=None,
                last_name=None
            )
            db.session.add(plate)
        
        db.session.commit()
        print("Default plates created.")
    else:
        print("Default plates already exist. Skipping creation.")

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

with app.app_context():
    #signUp("Sudiptto", "Biswas", "biswassudiptto@gmail.com", "Sbiswas", "123112", "964996")
    #signUp("Mahin", "Evan", "mahinEvan@gmail.com", "MahIN", "bds21", "964996")
    #signUp("Sam", "Evan", "sam@gmail.com", "samCrew", "bds21", "087206")
    #signUp("Aaaron", "Miang", "aaronM@gmail.com", "AaronCrew", "123112", "087206")
    #addVendor("Fauzias", "Chicken", "fauziasStore@gmail.com", "123112", "Fauzias")
    #checkReferall("964996")
    create_default_plates()  # Create default plates only if none exist"""

# Route to sign up
"""
sample response:
{
  "message": "Sign up successful"
}
"""
@app.route('/EcoCycle/signUp/<firstName>/<lastName>/<userName>/<email>/<password>/<referallCode>', methods=['GET'])
def signUpEco(firstName, lastName, userName, email, password, referallCode):
    print(firstName, lastName, userName, email, password, referallCode)
    responseUser = ""
   
    responseUser = signUp(firstName, lastName, userName, email, password, referallCode)


    return jsonify({'message': responseUser})

# Route to log in user side
"""
sample: response
{
  "message": "Login successful"
}
"""
@app.route('/EcoCycle/logIn/<email>/<password>', methods=['GET'])
def logInEco(email, password):
    responseUser = ""
    responseUser = checkLogin(email, password)

    return jsonify({'message': responseUser})




# Route to get user info by email (not for QR code)
"""
{
  "email": "biswassudiptto@gmail.com",
  "first_name": "Sudiptto",
  "last_name": "Biswas",
  "number_of_orders": 0,
  "number_of_strikes": 0,
  "points": 0,
  "qrCode": "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=",
  "referral_code": "994293",
  "referral_count": 0,
  "username": "Sbiswas"
}
"""
@app.route('/EcoCycle/getUserInfo/<email>', methods=['GET'])
def getUserInfoEco(email):
    print("ACTIVATED VIA QR CODE")
    responseUser = ""
    responseUser = getUserInfo(email)

    return jsonify(responseUser)

# Route to get the QR code of the user based off email
"""
response:
{
  "message": "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://10.170.35.244:5500/EcoCycle/assignPlate/biswassudiptto@gmail.com"
}
^ link to QR code

"""
@app.route('/EcoCycle/getQRCode/<email>', methods=['GET'])
def getQRCodeEco(email):
    responseUser = ""
    userData = getUserInfo(email)
    responseUser = getQRCode(email) + f"http://10.170.35.244:5500/EcoCycle/assignPlate/{userData['email']}"

    return jsonify({'message': responseUser})

# Route to assign a plate to User from qr code, sample response: -> due to time less error bounds error bound later
"""
good response:
{
  "Meal": "Grilled Lamb and Steamed Cabbage",
  "first_name": "Sudiptto",
  "last_name": "Biswas",
  "plate_number": "16",
  "price": 20.0
}
bad response:
{
  "Error": "User not found"
}
"""
@app.route('/EcoCycle/assignPlate/<email>', methods=['GET'])
def assignPlateEco(email):
    responseUser = ""
    #responseUser = assignPlate(email)

    responseUser = assignPlate(email)

    return responseUser

# route to de-assign a plate from a user
"""
sample response:
{
  "Meal": null,
  "Message": "Plate de-assigned successfully",
  "first_name": null,
  "last_name": null,
  "plate_number": "25",
  "price": 10.0
}

bad response:
{
  "Error": "Plate not found for this user"
}
""" 
@app.route('/EcoCycle/deAssignPlate/<email>', methods=['GET'])
def deAssignPlateEco(email):
    responseUser = deAssignPlate(email)

    return responseUser


# NOTE: EVERYTHING DOWN HERE IS FOR THE VENDOR SIDE 

# route to login vendor side
# username = email
"""
{
  "message": "Login successful"
}
"""
@app.route('/EcoCycle/logInVendor/<username>/<password>', methods=['GET'])
def logInVendorEco(username, password):
    responseVendor = ""
    responseVendor = checkVendorLogin(username, password)

    return jsonify({'message': responseVendor})


# route to get all the current orders from the plate class on vendor side
@app.route('/EcoCycle/getCurrentOrders', methods=['GET'])
def getCurrentOrders():
    responseVendor = ""
    responseVendor = fetchCurrentOrders()
    
    
    return responseVendor


if __name__ == '__main__':
    app.run(host="10.170.35.244", port=5500, debug=True)
    #app.run(debug=True)