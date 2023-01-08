from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import Post


class PostForm(FlaskForm):
    body = StringField('Body', validators=[
                       DataRequired("There's nothing to post here.."), Length(max=3000, message="Total length cannot exceed 3000 characters")])
    picture = StringField(('Profile Picture'))
