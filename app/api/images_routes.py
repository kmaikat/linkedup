from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, User
from app.forms import PostForm, SignUpForm

image_routes = Blueprint('images', __name__)


