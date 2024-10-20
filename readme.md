This is our project

HOW TO RUN SERVER THIS AT HOME -> DOCUMENTATION FOR MAHIN, EVAN, AARON AND SAMIN (WHEN WE ARE NOT AT HUNTER)

Step #1 Install the requirements.txt, simply run pip install -r requirements.txt, for the people on mac do pip3 install -r requirements.txt (Typically in mac, you do pip3 for python instead of pip)

Step #2 After everything has been installed than go to main.py, find this piece of code here (at the very bottom): 

if __name__ == '__main__':
    app.run(host="10.170.35.244", port=5500, debug=True)
    #app.run(debug=True)

Get this code above ^ too look like this:

if __name__ == '__main__':
    #app.run(host="10.170.35.244", port=5500, debug=True)
    app.run(debug=True)

Essentially what this will do is run on your local machine so you're link will most likely look like this: http://127.0.0.1:5000 -> It will run on this port, what you are doing is commeting out the app.run(host="10.170.35.244", port=5500, debug=True), but what is host="10.170.35.244"? Essentially what this is running on the hunter ip address. 

Step #3 Go to main.py, find this route:

@app.route('/EcoCycle/getQRCode/<email>', methods=['GET'])
def getQRCodeEco(email):
    responseUser = ""
    userData = getUserInfo(email)
    responseUser = getQRCode(email) + f"http://10.170.35.244:5500/EcoCycle/assignPlate/{userData['email']}"

    return jsonify({'message': responseUser})

Modify this:
responseUser = getQRCode(email) + f"http://10.170.35.244:5500/EcoCycle/assignPlate/{userData['email']}"
to instead be this
responseUser = getQRCode(email) + f"http://127.0.0.1:5000/EcoCycle/assignPlate/{userData['email']}" 

What are we doing? We are replacing where we are hosting it, to local 

Step #4 
go to main.py at the top find this:
with app.app_context():
    #signUp("Sudiptto", "Biswas", "biswassudiptto@gmail.com", "Sbiswas", "123112", "964996")
    #signUp("Mahin", "Evan", "mahinEvan@gmail.com", "MahIN", "bds21", "964996")
    #signUp("Sam", "Evan", "sam@gmail.com", "samCrew", "bds21", "087206")
    #signUp("Aaaron", "Miang", "aaronM@gmail.com", "AaronCrew", "123112", "087206")
    #addVendor("Fauzias", "Chicken", "fauziasStore@gmail.com", "123112", "Fauzias")
    #checkReferall("964996")
    create_default_plates()  # Create default plates only if none exist"""

check the database.db (you can use the sqlite viewer extension on vscode) , check if vendor has been added if the vendor has been added than comment addVendor out (can get issue) AND sometimes it may not load on database.db, so close the tab out on VsCode (at the top click the 'x') and click on it again

Step #5: By now this should be able to run 

NOTE WANT TO HOST ON PHONE/Want other devices on network to access?

To host on phone do this, type ipconfig on terminal find the IPv4 Address, can look like this:  10.170.35.244, copy and paste your ipv4 address and do this at the bottom of main.py -> set host equal to whatever you just copied in ipv4

if __name__ == '__main__':
    app.run(host=yourSelectedHost, port=5500, debug=True)
    #app.run(debug=True)

Step #6: Try this can use thunder client (it's like postman) and than follow the steps up above to set up the rest of the app -> remember to modify the routes on main.py but with this new IP address you got from ipv4

Essentially you're replacing the host on the QR code and on the local host on flask, personally my local host is (http://127.0.0.1:5000), for yall it might be different

