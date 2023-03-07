from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import conversations_table

class Conversation(db.Model):
    __tablename__ = 'conversations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # when messages are made, add one to many relationship with the model
    users = db.relationship("User", secondary=conversations_table, back_populates="conversations")
