from models import * 

#
def checkLogin(email,password):
    if #if email not in db:
        print("No account with this email exists")
    elif #if password doesn't match :
        print("This is the wrong password.")
    else: 
        print("Login successful!")

def signUp(email, username, password):
    if not validEmail(email):
        print("Please choose one of the supported email types!")
    elif emailExists(email):
        print("An account with this email exists!")
    elif userExists(username):
        print("An account with username exists!")
    else:
        print("Sign up successful!")
        # Call to query to add to db with email, password, username


# if an account with username exists in database
def userExists(username):
    # check if username exists in database 
    return True

# if an account with email exists in database
def emailExists(email):
    # check if email exists in database
    return True

def validEmail(email):
    emailList = ["@gmail.com","@outlook.com"]
    for i in emailList:
        if email.find(i):
            return True
    return False
