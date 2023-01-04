from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    body = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relationship with user
    user = db.relationship("User", back_populates="comments")
    # relationship with post
    post = db.relationship("Post", back_populates="comments")
