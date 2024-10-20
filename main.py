"""
    This is the file where the API routes are defined.
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from passwords import *  # Make sure this imports your 'secret'
from models import *
from features import *
from app import *
from fillData import * 


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



with app.app_context():
    #signUp("Sudiptto", "Biswas", "biswassudiptto@gmail.com", "Sbiswas", "123112", "964996")
    #signUp("Mahin", "Evan", "mahinEvan@gmail.com", "MahIN", "bds21", "964996")
    #signUp("Sam", "Evan", "sam@gmail.com", "samCrew", "bds21", "087206")
    #signUp("Aaaron", "Miang", "aaronM@gmail.com", "AaronCrew", "123112", "087206")
    #addVendor("Fauzias", "Chicken", "fauziasStore@gmail.com", "123112", "Fauzias")
    #checkReferall("964996")
    #fillSignUpData()

    emails = [
    "biswassudiptto@gmail.com",
    "mahinEvan@gmail.com",
    "sam@gmail.com",
    "aaronM@gmail.com",
    "jess.williams@gmail.com",
    "daniel.smith01@gmail.com",
    "emily.jones@outlook.com",
    "michael.brown@gmail.com",
    "sophia.garcia@yahoo.com"
    ]
    # modify referall code count
    #modifyReferallCodeCount("biswassudiptto@gmail.com")
    #modifyReferallCodeCount("emily.jones@outlook.com")
    #modifyReferallCodeCount("sophia.garcia@yahoo.com")
    #modifyReferallCodeCount("mahinEvan@gmail.com")
    #modifyReferallCodeCount("daniel.smith01@gmail.com")

    # modify orders (mocking)
    """for email in emails:
        modifyNumberOfOrders(email)                          
    """
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
    responseUser = getQRCode(email) + f"http://127.0.0.1:5000/EcoCycle/assignPlate/{userData['email']}"

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

# route to redeem a reward for a user 
"""
sample response (note the pointsInReward is an integer)
{
  "Message": "Reward redeemed successfully",
  "email": "mahinEvan@gmail.com",
  "firstName": "Mahin",
  "lastName": "Evan",
  "point_previous": 5100,
  "points_current": 4900,
  "points_subtracted": 200
}
"""
@app.route('/EcoCycle/redeemReward/<pointsInReward>/<email>', methods=['GET'])
def redeemRewardEco(pointsInReward, email):
    responseUser = ""
    responseUser = redeemRewards(pointsInReward, email)

    return responseUser

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

# for leaderboard rank top to bottom
"""
sample response:
[
  {
    "firstName": "Sudiptto",
    "lastName": "Biswas",
    "points": 900,
    "rank": 1,
    "username": "Sbiswas"
  },
  {
    "firstName": "Mahin",
    "lastName": "Evan",
    "points": 500,
    "rank": 2,
    "username": "MahIN"
  },
  {
    "firstName": "Sam",
    "lastName": "Evan",
    "points": 0,
    "rank": 3,
    "username": "samCrew"
  },
  {
    "firstName": "Samin",
    "lastName": "Sarwar",
    "points": 0,
    "rank": 4,
    "username": "samin!"
  },
  {
    "firstName": "Aaaron",
    "lastName": "Miang",
    "points": 0,
    "rank": 5,
    "username": "AaronCrew"
  }
]
"""
def fetchLeaderboard():
    # Query all users and order them by points in descending order
    users = User.query.order_by(User.points.desc()).all()

    # Create a list to store the formatted leaderboard
    leaderboard = []

    # Iterate over each user and format the response
    for i, user in enumerate(users, start=1):
        user_data = {
            "rank": i,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "username": user.username,
            "points": user.points
        }
        leaderboard.append(user_data)

    return leaderboard        

# route to get the leaderboard of the top users based off points
@app.route('/EcoCycle/getLeaderboard', methods=['GET'])
def getLeaderboard():
    responseVendor = ""
    responseVendor = fetchLeaderboard()

    return responseVendor

"""
    {
        {
            order: "Order 25',
            time: "2024-10-20 00:40:01.773988"
            price: 12
        },
        {
            order: "Order 25',
            time: "2024-10-20 00:40:01.773988"
            price: 12
        }
        ....
    }

"""
"""
sample response:
[
  {
    "firstName": "Sudiptto",
    "lastName": "Biswas",
    "meal": "Fauzia's Jerk Chicken Gyro",
    "order": "Order 22",
    "price": 10.0,
    "time": "2024-10-19 20:40:01.773988"
  },
  {
    "firstName": "Sudiptto",
    "lastName": "Biswas",
    "meal": "Pot of Rice and Beans Cooking",
    "order": "Order 23",
    "price": 8.0,
    "time": "2024-10-19 20:40:01.773988"
  },
  {
    "firstName": "Sudiptto",
    "lastName": "Biswas",
    "meal": "Curry Chicken",
    "order": "Order 24",
    "price": 15.0,
    "time": "2024-10-19 20:40:01.773988"
  },
  {
    "firstName": "Sudiptto",
    "lastName": "Biswas",
    "meal": "Pot of Rice and Beans Cooking",
    "order": "Order 25",
    "price": 8.0,
    "time": "2024-10-19 20:40:01.773988"
  }
]

or

[]

"""
# route to get all the current orders from the plate class on vendor side
@app.route('/EcoCycle/getCurrentOrders', methods=['GET'])
def getCurrentOrders():
    responseVendor = ""
    responseVendor = fetchCurrentOrders()
    
    
    return responseVendor


if __name__ == '__main__':
    #app.run(host="10.170.35.244", port=5500, debug=True)
    app.run(debug=True)