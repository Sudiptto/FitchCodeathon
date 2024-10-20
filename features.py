from models import *
from flask import jsonify

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
        # add 200 points to the user who has the referral code
        referral_user.points += 200
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
        "points": user.points,
        "qrCode": user.qr_link
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

    