from flask_socketio import SocketIO, emit, join_room, leave_room
from .models.message import Message
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://linkedup.onrender.com",
        "https://linkedup.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
# @socketio.on("chat")
# def handle_chat(data):
#     message = Message(
#         id=data['id'],
#         sender_id=data['sender_id'],
#         reciever_id=data['reciever_id'],
#         room_id=data['room_id'],
#         body=data['message']
#     )
#     db.session.add(message)
#     db.session.commit()

#     if data['room_id']:
#         room = data['room_id']
#         emit("chat", data, broadcast=True, to=room)


# join a room
@socketio.on("join")
def on_join(data):
    username = data['username']
    room = data['room']

    join_room(room)

    send(username + "has entered the room")


# leave a room
@socketio.on("leave")
def on_leave(data):
    username = data['username']
    room = data['room']

    leave_room(room)

    send(username + "has left the room", to=room)
