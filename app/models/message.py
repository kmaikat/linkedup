from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(200), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    reciever_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    room_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
