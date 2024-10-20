from models import *
from flask import jsonify
from datetime import datetime
from pytz import timezone, utc

#Check if a login attempt is succesful
#@param: String representing given email from field
#@param: String representing given password from field
def checkLogin(email,password):
    if not emailExists(email):
        return "No email"
    elif not correctPassword(email, password):
        return "Wrong Password"
    else: 
        return "Login successful"

# check if user referral exists 
def checkReferall(referralCode):
    # check if referral code is in the database
    referral_user = User.query.filter_by(referral_code=referralCode).first()

    # if referral code is in the database
    if referral_user:
        # add 200 points to the user who has the referral code + update referral count
        referral_user.points += 200
        referral_user.referral_count += 1
        db.session.commit()  # Make sure to commit the changes to the database

    return referral_user


#Check if a signup attempt is succesful
#@param: String representing representing user's first name from field
#@param: String representing representing user's last name from field
#@param: String representing given email from field
#@param: String representing given username from field
#@param: String representing given password from field
#@param: referallCode
def signUp(firstname, lastname, email, username, password, referallCode):

    if emailExists(email):
        return "Email Exists"
    
    elif userExists(username):
        return "Account exists"
    
    # check if referal code is in database
    elif checkReferall(referallCode) == False:
        return "Referral code does exists"
    
    else:
        print("Sign up successful!")
        # Call to query to add to db with email, password, username
        newUser = User(first_name =firstname, last_name = lastname, username=username, email=email, password=password, qr_link = generateQR(), number_of_strikes=0, number_of_orders=0, referral_count =0, referral_code = generateReferral(), points=0)
        db.session.add(newUser)
        db.session.commit()
        return "Sign up successful"

# if an account with username exists in database
# @param: A string that represents username, to check if it exists 
def userExists(username):
    user = User.query.filter_by(username=username).first()
    # check if username exists in database 
    return user 

# if an account with email exists in database
#@param: A string representing email of user 
def emailExists(email):
    # check if email exists in database
    email = User.query.filter_by(email=email).first()
    return email

#check if given email is of the valid email type
#@param: A string representing a user's email
def validEmail(email):
    emailList = ["@gmail.com","@outlook.com"]
    for i in emailList:
        if email.find(i):
            return True
    return False

#check if given password matches the password in database of given email
#@param: String representing email of user
#@param: String representing password to be checked,(this was the password entered by user)
def correctPassword(email,password):
    user = User.query.filter_by(email=email).first()
    return password == user.password

#generate a unique QR link, marked by the unique id of user 
#@param: unique id of user 
def generateQR():
    return "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" 

#generate a unique referral code (6 digit stored as a string) that doesn't already exist in database
def generateReferral():
    # Generate a random six-digit integer between 100000 and 999999
    #six_digit_int = random.randint(0, 999999)
    six_digit_int = random.randint(0, 999999)
    result = str(six_digit_int)
    while (len(result)!=6):
        result = "0" + result
    return result 


# check if user is a vendor
def checkVendorLogin(email, password):
    vendor = Vendor.query.filter_by(email=email).first()
    if not vendor:
        return "No vendor"
    elif vendor.password != password:
        return "Wrong Password"
    else:
        return "Login successful"

# get user info based of email return first name / last name / username / email / number of strikes / number of orders / referall count / referall code / points / qrCode as a dictionary
def getUserInfo(email):
    user = User.query.filter_by(email=email).first()
    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "username": user.username,
        "email": user.email,
        "number_of_strikes": user.number_of_strikes,
        "number_of_orders": user.number_of_orders,
        "referral_count": user.referral_count,
        "referral_code": user.referral_code,
        "points": user.points
    }

# get QR code
def getQRCode(email):
    user = User.query.filter_by(email=email).first()
    return user.qr_link

# Assign a plate for a user
def assignPlate(email):
    # Fetch the user based on the provided email
    user = User.query.filter_by(email=email).first()

    # Check if the user exists
    if not user:
        return jsonify({'Error': 'User not found'}), 404
    
    # Find the most recent unused plate
    plate = Plate.query.filter_by(is_used=False).order_by(Plate.id.desc()).first()
    
    # Randomly select a meal from the provided list
    meals = ["Fauzia's Jerk Chicken Gyro", "Plate of Fauzia's Jerk Chicken", "Pot of Rice and Beans Cooking", "Curry Chicken", "Beef Patties", "Grilled Lamb and Steamed Cabbage"]
    mealPrice = [10, 12, 8, 15, 5, 20]

    # randomly select meals with it's corresponding mealprice
    random_meal = random.choice(meals)
    meal_price = mealPrice[meals.index(random_meal)]



    # Update the plate information
    plate.is_used = True
    plate.user_id = user.id
    plate.first_name = user.first_name
    plate.last_name = user.last_name
    plate.meal = random_meal
    plate.meal_price = meal_price


    # update the user's number of orders
    user.number_of_orders += 1
    
    # Commit the changes to the database
    db.session.commit()

    # Return a JSON response
    return jsonify({
        'plate_number': plate.plate_id,
        "Meal": plate.meal,
        'first_name': plate.first_name,
        'last_name': plate.last_name,
        "price": plate.meal_price,

    })


# De-assign a plate for a user
def deAssignPlate(email):
    # Fetch the user based on the provided email
    user = User.query.filter_by(email=email).first()

    # Check if the user exists
    if not user:
        return jsonify({'Error': 'User not found'}), 404  # Return 404 if user does not exist

    # Find the most recent used plate assigned to the user
    plate = Plate.query.filter_by(user_id=user.id, is_used=True).order_by(Plate.id.desc()).first()

    # Check if the plate exists
    if not plate:
        return jsonify({'Error': 'Plate not found for this user'}), 404  # Return 404 if plate does not exist

    # Update the plate information
    plate.is_used = False
    plate.user_id = None
    plate.first_name = None
    plate.last_name = None
    plate.meal = None
    plate.meal_price = None
    
    # add some points
    user.points += 500

    # Commit the changes to the database
    db.session.commit()

    # Return a JSON response
    return jsonify({
        "Meal": plate.meal,
        'plate_number': plate.plate_id,
        'first_name': plate.first_name,
        'last_name': plate.last_name,
        "price": plate.meal_price,
        'Message': 'Plate de-assigned successfully'
    })

# get an object of objects of all current orders
# sample response:
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
def fetchCurrentOrders():
    # Define the EST timezone
    est = timezone('US/Eastern')

    # Query all plates that are currently in use (active orders)
    active_plates = Plate.query.filter_by(is_used=True).all()

    # Create a list to store the formatted orders
    orders = []

    # Iterate over each active plate and format the response
    for plate in active_plates:
        # If the timestamp is naive (has no timezone info), assign it UTC before converting
        if plate.timestamp.tzinfo is None:
            timestamp_utc = utc.localize(plate.timestamp)
        else:
            timestamp_utc = plate.timestamp

        # Convert the timestamp to EST
        timestamp_est = timestamp_utc.astimezone(est)
        time_est_str = timestamp_est.strftime("%Y-%m-%d %H:%M:%S.%f")

        order = {
            "order": f"Order {plate.id}",
            "time": time_est_str,  # Use the EST-formatted timestamp
            "firstName": plate.first_name or "",
            "lastName": plate.last_name or "",
            "meal": plate.meal or "",
            "price": plate.meal_price or 0.0
        }
        orders.append(order)
    print("These are the orders: ", orders)
    return orders
    

# for leaderboard rank top to bottom
"""
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



# redeem rewards section

def redeemRewards(pointsInReward, email):
    pointsInReward = int(pointsInReward)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'Error': 'User not found'}), 404  # Return 404 if user does not exist

    # Check if the user has enough points to redeem the reward
    if user.points < pointsInReward:
        return jsonify({'Error': 'Insufficient points to redeem the reward'}), 400  # Return 400 if user has insufficient points

    # number of points before
    pointBeforePurchase = user.points

    # Deduct the points from the user
    user.points -= pointsInReward

    # Commit the changes to the database
    db.session.commit()

    # Return a JSON response
    return jsonify({
        'firstName': user.first_name,
        'lastName': user.last_name,
        'email': user.email,
        'point_previous': pointBeforePurchase,
        'points_current': user.points,
        'points_subtracted': pointsInReward,
        'Message': 'Reward redeemed successfully'
    })    