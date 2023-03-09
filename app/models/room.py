from .db import environment, db, SCHEMA, add_prefix_for_prod
from .user import user_rooms
from datetime import datetime

class Room(db.Model):
    __tablename__ = "rooms"

    if environment == "production":
        __table_args__ = { "schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    messages = db.relationship("Message", back_populates="room", cascade="all, delete")
    user = db.relationship("User", back_populates="rooms", secondary=user_rooms, lazy="joined")
    # user has many rooms, rooms have many users
