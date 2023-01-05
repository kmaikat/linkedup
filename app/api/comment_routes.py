from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment, Post, User
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

# get all comments by the post id: I realized I don't need this because post brings in an object with all comments for each post


# @comment_routes.route('/<int:post_id>')
# def get_comments(post_id):
#     post = Post.query.get(post_id)
#     if post is None:
#         return {"Error": "Post not found"}, 404

#     return jsonify({comment.id: comment.to_dict() for comment in post.comments}), 200
# create comment

# edit comments
@comment_routes.route('/<int:comment_id>', methods=["PUT"])
def update_comment(comment_id):
    current_user_info = User.query.get(current_user.id).to_dict()
    current_user_id = current_user_info["id"]

    update_comment = Comment.query.get(comment_id)

    if update_comment:
        if update_comment.user_id == current_user_id:
            edited_comment = request.get_json()
            update_comment.body = edited_comment['body']
            db.session.commit()
            return update_comment.to_dict(), 200
        else:
            return {'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403
    else:
        return {
            'error': {
                'message': 'Cannot find comment. Please try again.',
                'statusCode': 403
            }
        }, 404


# delete comment
@comment_routes.route('/<int:comment_id>/', methods=["DELETE"])
def delete_comment(comment_id):
    current_user_info = User.query.get(current_user.id).to_dict()
    current_user_id = current_user_info['id']

    delete_comment = Comment.query.get(comment_id)

    if delete_comment:
        if delete_comment.user_id == current_user_id:
            db.session.delete(delete_comment)
            db.session.commit()
            return {'message': 'Comment successfully deleted.'}
        else:
            return {'error': {
                'message': 'Forbidden',
                'statusCode': 403
            }}, 403

    else:
        return {'error': {
            'message': 'Cannot find comment you were looking for',
            'statusCode': 404
        }}, 404
