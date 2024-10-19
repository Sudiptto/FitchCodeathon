""""
    This is the file where the API routes are
"""

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from passwords import *
import random


# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = secret
# Configure the SQLAlchemy part of the app instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'


CORS(app)  # Enable CORS for all routes
# Initialize SQLAlchemy
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
    referral_code = db.Column(db.String(6), default=lambda: str(random.randint(100000, 999999)), unique=True, nullable=False)
    points = db.Column(db.Integer, default=0, nullable=False)

    # Relationship to the Plate model
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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    meal = db.Column(db.String(100), nullable=False)
    time_out = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Plate {self.plate_id} for User {self.user_id}>'


# sample route to return "Hello World"
@app.route('/login', methods=['GET'])
def login(email, password):
    return jsonify({'message': 'Hello World'})





if __name__ == '__main__':
    # create databases
    with app.app_context():
        db.create_all()
    app.run(debug=True)