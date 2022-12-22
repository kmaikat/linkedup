from flask import Blueprint, jsonify, request
# from flask_login import login_required
from app.models import Post

post_routes = Blueprint('posts', __name__)


# get all post
@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


# get post by id ()
@post_routes.route('/<int:postId>')
def post(postId):
    posts = Post.query.get(id)
    return post.to_dict()


# post a new post

# update a post


# delete a post
@post_routes("/<int:postId>", methods=["DELETE"])
def delete_post_by_id(postId):
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    delete_post = Post.query.get(postId)
    if delete_post:
        if delete_post.user_id == current_user_id:
            db.session.delete(delete_post)
            db.session.commit()
            return {'message': 'Post deleted'}
        else:
            return {'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403
    else:
        return {'error': {
            'message': 'Cannot find post you were looking for',
            'statusCode': 404
        }}, 404
