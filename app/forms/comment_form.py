from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import Comment

class CommentForm(FlaskForm):
    body = StringField('Body', validators=[DataRequired("There is nothing to comment here.."), Length(max=1500, message="Total length cannot exceed 1500 characters")])
