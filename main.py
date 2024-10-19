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
    signUp("Sudiptto", "Biswas", "biswassudiptto@gmail.com", "Sbiswas", "123112", "964996")
    signUp("Mahin", "Evan", "mahinEvan@gmail.com", "MahIN", "bds21", "964996")
    #addVendor("Fauzias", "Chicken", "fauziasStore@gmail.com", "123112", "Fauzias")
    #checkReferall("964996")
    create_default_plates()  # Create default plates only if none exist"""

# Route to sign up
@app.route('/EcoCycle/signUp/<firstName>/<lastName>/<userName>/<email>/<password>/<referallCode>', methods=['GET'])
def signUpEco(firstName, lastName, userName, email, password, referallCode):
    print(firstName, lastName, userName, email, password, referallCode)
    responseUser = ""
   
    responseUser = signUp(firstName, lastName, userName, email, password, referallCode)


    return jsonify({'message': responseUser})

# Route to log in user side
@app.route('/EcoCycle/logIn/<email>/<password>', methods=['GET'])
def logInEco(email, password):
    responseUser = ""
    responseUser = checkLogin(email, password)

    return jsonify({'message': responseUser})

# route to login vendor side
@app.route('/EcoCycle/logInVendor/<username>/<password>', methods=['GET'])
def logInVendorEco(username, password):
    responseVendor = ""
    responseVendor = checkVendorLogin(username, password)

    return jsonify({'message': responseVendor})

# Route to get user info by email (not for QR code)
@app.route('/EcoCycle/getUserInfo/<email>', methods=['GET'])
def getUserInfoEco(email):
    print("ACTIVATED VIA QR CODE")
    responseUser = ""
    responseUser = getUserInfo(email)

    return jsonify(responseUser)

# Route to get the QR code of the user based off email
@app.route('/EcoCycle/getQRCode/<email>', methods=['GET'])
def getQRCodeEco(email):
    responseUser = ""
    userData = getUserInfo(email)
    responseUser = getQRCode(email) + f"http://10.170.35.244:5500/EcoCycle/assignPlate/{userData['email']}"

    return jsonify({'message': responseUser})

# Route to assign a plate to User from qr code
@app.route('/EcoCycle/assignPlate/<email>', methods=['GET'])
def assignPlateEco(email):
    responseUser = ""
    #responseUser = assignPlate(email)

    responseUser = assignPlate(email)

    return responseUser

# route to de-assign a plate from a user 
@app.route('/EcoCycle/deAssignPlate/<email>', methods=['GET'])
def deAssignPlateEco(email):
    responseUser = deAssignPlate(email)

    return responseUser

if __name__ == '__main__':
    app.run(host="10.170.35.244", port=5500, debug=True)
    #app.run(debug=True)