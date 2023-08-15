from .db import db, environment, SCHEMA, add_prefix_for_prod
from .like import likes
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

followers = db.Table("followers",
                     db.Column("following_id", db.Integer, db.ForeignKey(
                         add_prefix_for_prod("users.id"), ondelete="CASCADE")),
                     db.Column("followed_id", db.Integer, db.ForeignKey(
                         add_prefix_for_prod("users.id"), ondelete="CASCADE")),
                     db.Column("created_at", db.DateTime,
                               default=datetime.utcnow),
                     schema=SCHEMA if environment == "production" else "")

user_rooms = db.Table("user_rooms",
                         db.Column("room_id", db.Integer, db.ForeignKey(
                             add_prefix_for_prod("rooms.id"), ondelete="CASCADE")),
                         db.Column("user_id", db.Integer, db.ForeignKey(
                             add_prefix_for_prod("users.id"), ondelete="CASCADE"
                         )),
                         schema=SCHEMA if environment == "production" else "")


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(29), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String)
    title = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(300), nullable=False)
    city = db.Column(db.String(60), nullable=False)
    state = db.Column(db.String(60), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    posts = db.relationship("Post", back_populates="user",
                            cascade="all, delete-orphan")
    comments = db.relationship(
        "Comment", back_populates="user", cascade="all, delete-orphan")

    user_likes = db.relationship("Post", back_populates="liked_users", secondary=likes)

    followed_by = db.relationship(
        "User", secondary=followers, primaryjoin=id == followers.c.followed_id, secondaryjoin=id == followers.c.following_id, backref="followers"
    )

    following = db.relationship(
        "User", secondary=followers, secondaryjoin=id == followers.c.followed_id, primaryjoin=id == followers.c.following_id, overlaps="followers"
    )

    rooms = db.relationship(
        "Room", back_populates="user", secondary=user_rooms, lazy="joined"
    )

    messages = db.relationship(
        "Message", back_populates="user", cascade="all, delete"
    )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'title': self.title,
            'bio': self.bio,
            'city': self.city,
            'state': self.state,
            'followers': {follower.id: follower.to_dict_no_followers() for follower in self.followed_by},
            'following': {follower.id: follower.to_dict_no_followers() for follower in self.following},
            'user_likes': {like.id: like.to_dict() for like in self.user_likes}
        }

    def to_dict_no_followers(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'title': self.title,
            'bio': self.bio,
            'city': self.city,
            'state': self.state,
        }
