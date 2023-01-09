from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(max=29, message="Username must be less than 29 characters")])
    email = StringField('email', validators=[DataRequired(), user_exists, Length(max=128, message="Email must be between 3 to 128 characters")])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired(), Length(max=50, message="First name can not exceed 50 characters.")])
    last_name = StringField('last_name', validators=[DataRequired(), Length(max=50, message="Last name can not exceed 50 characters.")])
    profile_picture = StringField('profile_picture')
    title = StringField('title', validators=[DataRequired(), Length(max=100, message="Title cannot exceed 100 characters")])
    bio = StringField('bio', validators=[DataRequired(), Length(max=300, message="Exceeded maximum character length of 300")])
    city = StringField('city', validators=[DataRequired(), Length(max=60, message="City must be less than 60 characters")])
    state = StringField('state', validators=[DataRequired(), Length(max=60, message="State must be less than 60 characters")])
