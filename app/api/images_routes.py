from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, User
from app.forms import PostForm, SignUpForm
from app.s3_help import upload_file_to_s3, allowed_file, get_unique_filename

image_routes = Blueprint('images', __name__)


@image_routes.route("/", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    return jsonify({"message": "Success! image was uploaded!", "url": url}), 200


# @image_routes.route("/user", methods=["PUT"])
# @login_required
# def user_profile():
#     if "image" not in request.files:
#         return {"errors": "image required"}, 400

#     image = request.files["image"]

#     if not allowed_file(image.filename):
#         return {"errors": "file type not permitted"}, 400

#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(image)
#     if "url" not in upload:
#         return upload, 400

#     url = upload["url"]
#     user = User.query.get(current_user.id)

#     user.profile_picture = url
#     db.session.commit()
#     return jsonify(({"message": "Success! User picture updated."})), 200


# @image_routes.route("/post/<int:postId>", methods=["PUT"])
# @login_required
# def post_image(postId):
#     if "image" not in request.files:
#         return {"errors": "image required"}, 400

#     image = request.files["image"]

#     if not allowed_file(image.filename):
#         return {"errors": "file type not permitted"}, 400

#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(image)
#     if "url" not in upload:
#         return upload, 400

#     url = upload["url"]
#     post = Post.query.get(postId)

#     post.picture = url
#     db.session.commit()
#     return jsonify(({"message": "Success! post updated."})), 200
