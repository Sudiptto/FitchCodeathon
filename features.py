from main import * 

#
def checkLogin(email,password):
    if not emailExists(email):
        print("No account with this email exists")
    elif not correctPassword(email, password):
        print("This is the wrong password.")
    else: 
        print("Login successful!")

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
        newUser = User(first_name =firstname, last_name = lastname, username=username, email=email, password=password, qr_link = generateQR(), number_of_strikes=0, number_of_orders=0, referral_count =0, referral_code = generateReferral(), points=0)


# if an account with username exists in database
# @param: A string that represents username, to check if it exists 
def userExists(username):
    user = User.query.filter_by(username=username).first()
    # check if username exists in database 
    return user 

# if an account with email exists in database
def emailExists(email):
    # check if email exists in database
    email = User.query.filter_by(email=email).first()
    return email

def validEmail(email):
    emailList = ["@gmail.com","@outlook.com"]
    for i in emailList:
        if email.find(i):
            return True
    return False

def correctPassword(email,password):
    user = User.query.filter_by(email=email).first()
    return password == user.password

#generate a unique QR link that doesn't already exist in database
def generateQR():
    
#generate a unique referral code (6 digit stored as a string) that doesn't already exist in database
def generateReferral():
    