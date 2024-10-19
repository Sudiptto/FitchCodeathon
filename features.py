from main import * 

#Check if a login attempt is succesful
#@param: String representing given email from field
#@param: String representing given password from field
def checkLogin(email,password):
    if not emailExists(email):
        print("No account with this email exists")
    elif not correctPassword(email, password):
        print("This is the wrong password.")
    else: 
        print("Login successful!")


#Check if a signup attempt is succesful
#@param: String representing representing user's first name from field
#@param: String representing representing user's last name from field
#@param: String representing given email from field
#@param: String representing given username from field
#@param: String representing given password from field
def signUp(firstname, lastname, email, username, password):
    if not validEmail(email):
        print("Please choose one of the supported email types!")
    elif emailExists(email):
        print("An account with this email exists!")
    elif userExists(username):
        print("An account with username exists!")
    else:
        print("Sign up successful!")
        # Call to query to add to db with email, password, username
        newUser = User(first_name =firstname, last_name = lastname, username=username, email=email, password=password, qr_link = generateQR(1), number_of_strikes=0, number_of_orders=0, referral_count =0, referral_code = generateReferral(), points=0)
        db.session.add(newUser)
        db.session.commit()
        # call addUser(function here)!!!

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
def generateQR(id):
    return "https://127.0.0.1/QrCode/" + str(id)

#generate a unique referral code (6 digit stored as a string) that doesn't already exist in database
def generateReferral():
    # Generate a random six-digit integer between 100000 and 999999
    #six_digit_int = random.randint(0, 999999)
    six_digit_int = random.randint(0, 999999)
    result = str(six_digit_int)
    while (len(result)!=6):
        result = "0" + result
    return result 

'''
with app.app_context():
    signUp("Dip","Biswas","saw@gmail.com","samnssssss","hihihi")
'''