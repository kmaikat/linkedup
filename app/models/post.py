from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    body = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="posts")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.created_at
        }

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.created_at,
            'user': self.user.to_dict(),
        }
