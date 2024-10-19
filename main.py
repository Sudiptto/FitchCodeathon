"""
    This is the file where the API routes are defined.
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from passwords import *  # Make sure this imports your 'secret'
import random

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = secret
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

CORS(app)  # Enable CORS for all routes
db = SQLAlchemy(app)

# Create a User model
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    qr_link = db.Column(db.String(255), nullable=True)
    number_of_strikes = db.Column(db.Integer, default=0, nullable=False)
    number_of_orders = db.Column(db.Integer, default=0, nullable=False)
    referral_count = db.Column(db.Integer, default=0, nullable=False)
    referral_code = db.Column(db.String(6), default=lambda: str(random.randint(100000, 999999)), unique=True, nullable=True)
    points = db.Column(db.Integer, default=0, nullable=False)

    plates = db.relationship('Plate', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'


# Create a Vendor model
class Vendor(db.Model):
    __tablename__ = 'vendors'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    store_name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Vendor {self.store_name}>'


# Create a Plate model
class Plate(db.Model):
    __tablename__ = 'plates'
    
    id = db.Column(db.Integer, primary_key=True)
    plate_id = db.Column(db.String(20), unique=True, nullable=False)
    qr_code = db.Column(db.String(255), nullable=True)
    is_used = db.Column(db.Boolean, default=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Allow null for user_id
    meal = db.Column(db.String(100), nullable=True)  # Allow null for meal
    time_out = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f'<Plate {self.plate_id} for User {self.user_id}>'
    
# Create a BannedUser model
class BannedUser(db.Model):
    __tablename__ = 'banned_users'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Allow null for user_id
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    number_of_strikes = db.Column(db.Integer, default=0, nullable=False)
    plate_broken = db.Column(db.Integer, default=0, nullable=False)  # Number of plates broken
    plate_missing = db.Column(db.Integer, default=0, nullable=False)  # Number of plates missing

    # Relationship to the User model (for easier access if needed)
    user = db.relationship('User', backref=db.backref('banned_record', uselist=False))

    def __repr__(self):
        return f'<BannedUser {self.username} (User ID: {self.user_id})>'

# Create an InactivePlate model
class InactivePlate(db.Model):
    __tablename__ = 'inactive_plates'
    
    id = db.Column(db.Integer, primary_key=True)
    plate_id = db.Column(db.String(20), nullable=False)  # Plate ID is not unique; represents the plate number
    qr_code = db.Column(db.String(255), nullable=False)  # Store the QR code for reference
    user_who_broke = db.Column(db.String(50), nullable=False)  # Name or username of the user responsible
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)  # Allow null for user_id to link with User model
    date_inactive = db.Column(db.Date, nullable=False)  # Date when the plate became inactive
    reason = db.Column(db.String(255), nullable=False)  # Reason for the plate being inactive (e.g., "Broken", "Lost")

    # Relationship to the User model (for easier access if needed)
    user = db.relationship('User', backref=db.backref('inactive_plates', lazy=True))

    def __repr__(self):
        return f'<InactivePlate {self.plate_id} by User {self.user_id}>'



#-> One time functions
# Function to create default plates
"""def create_default_plates():
    # Check if plates already exist to avoid duplicates
    if Plate.query.count() == 0:
        for i in range(1, 26):
            plate = Plate(
                plate_id=str(i),
                qr_code=f"https://127.0.0.1/QrCode/{i}",
                is_used=False,
                user_id=None,  # No user assigned initially
                meal=None,     # No meal assigned initially
                time_out=0.0   # Default timeout set to 0
            )
            db.session.add(plate)
        
        db.session.commit()
        print("Default plates created.")
    else:
        print("Default plates already exist. Skipping creation.")


with app.app_context():
    create_default_plates()  # Create default plates only if none exist"""

# Sample route to return "Hello World"
@app.route('/signUp/<firstName>/<lastName>/<userName>/<email>/<password>/<referallCode>', methods=['GET'])
def signUp():
    return jsonify({'message': 'Hello World'})



if __name__ == '__main__':
    # Create databases
    with app.app_context():

        db.create_all()  # Create all tables if they don't exist
        #create_default_plates()  # Create default plates only if none exist
    
    app.run(debug=True)
