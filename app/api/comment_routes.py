from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment, User
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

