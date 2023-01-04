from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, User
from app.forms import PostForm
post_routes = Blueprint('posts', __name__)


# get all post - for the feed
@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return jsonify({post.id: post.to_dict_with_user() for post in posts}), 200


# get posts by user id ()
@post_routes.route('/recent-activity')
def post_by_user():
    current_user_info = User.query.get(current_user.id).to_dict()
    current_user_id = current_user_info['id']

    posts = Post.query.filter(Post.user_id == current_user_id).all()
    return {'posts': [post.to_dict() for post in posts]}


# post a new post
@post_routes.route("/", methods=["POST"])
def make_post():
    current_user_info = User.query.get(current_user.id).to_dict()
    current_user_id = current_user_info['id']

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        try:
            new_post = Post(
                body=form.data['body'],
                user_id=current_user_id
            )
            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict_with_user(), 201
        except Exception:
            return {'error': 'cannot submit at this time, try again later'}
    if form.errors:
        return {'error': form.errors}

# update a post


@post_routes.route("/<int:postId>", methods=["PUT"])
def update_post(postId):
    current_user_info = User.query.get(current_user.id).to_dict()
    current_user_id = current_user_info['id']

    # get the post by id
    update_this_post = Post.query.get(postId)

    if update_this_post:
        if update_this_post.user_id == current_user_id:
            #  i left off here
            existing_post_data = request.get_json()
            update_this_post.body = existing_post_data["body"]
            db.session.commit()
            return update_this_post.to_dict(), 200
        else:
            return {'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403
    else:
        return {
            'error': {
                'message': 'Cannot find post. Please try again.',
                'statusCode': 403
            }
        }, 404


# delete a post
@post_routes.route("/<int:postId>", methods=["DELETE"])
def delete_post_by_id(postId):
    current_user_info = User.query.get(current_user.id).to_dict()
    current_user_id = current_user_info['id']
    delete_post = Post.query.get(postId)
    if delete_post:
        if delete_post.user_id == current_user_id:
            db.session.delete(delete_post)
            db.session.commit()
            return {'message': 'Post successfully deleted.'}
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
