from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route("/email-check/<string:email>")
def email_check(email):
    user = User.query.filter(User.email.ilike(email)).one_or_none();

    if user:
        return jsonify({"error": "An account with this email already exists"}), 400
    else:
        return jsonify({"message": "Good to go!"}), 200

@user_routes.route('/<int:id>/followers')
def user_followers(id):
    user = User.query.get(id).to_dict()
    # need to turn follower list item into an obj
    # return followers object
    return "stink butt"

# @user_routes.route('/<int:id>/following')
# def user_following(id):
#     # query where the following id is == to the user id
#     return "stink butt"

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
