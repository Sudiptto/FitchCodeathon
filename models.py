from flask_sqlalchemy import SQLAlchemy
from app import app
import random

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
    email = db.Column(db.String(150), unique=True, nullable=False)
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
    meal_price = db.Column(db.Float, nullable=True)  # Allow null for meal price
    meal = db.Column(db.String(100), nullable=True)  # Allow null for meal
    time_out = db.Column(db.Float, nullable=True)

    # New fields for first and last names
    first_name = db.Column(db.String(50), nullable=True, default=None)  # Allow null for first name
    last_name = db.Column(db.String(50), nullable=True, default=None)   # Allow null for last name

    def __repr__(self):
        return f'<Plate {self.plate_id} for User {self.user_id} ({self.first_name} {self.last_name})>'

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
    

# Create the database tables
with app.app_context():
    db.create_all()