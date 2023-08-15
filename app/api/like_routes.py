from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, likes, Post, User

like_routes = Blueprint("likes", __name__)

@like_routes.route("/<int:post_id>", methods=["POST"])
@login_required
def like_post(post_id):
    user = User.query.get(current_user.get_id())
    post = Post.query.get(post_id)

    post.liked_users.append(user)
    db.session.commit()

    return post.to_dict()

@like_routes.route("/<int:post_id>", methods=["DELETE"])
@login_required
def unlike_post(post_id):
    user = User.query.get(current_user.get_id())
    post = Post.query.get(post_id)

    post.liked_users.remove(user)
    db.session.commit()

    return post.to_dict()
