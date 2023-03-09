import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import "../../stylesheets/MessageRoom.css";

let socket;

const MessageRoom = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    useEffect(() => {

        // create websocket
        socket = io();

        // listen for chat events
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    // const sendChat = (e) => {
    //     e.preventDefault()
    //     // emit a message
    //     socket.emit("chat", { sender_id: user.username, room_id: 1, message: chatInput });
    //     // clear the input field after the message is sent
    //     setChatInput("")
    // }

    return (
        <div>
            <div className="heading-container">
                <p>
                    Name of User
                </p>
                <p>
                    Title of User
                </p>
            </div>
            <div className="chat-container">
                <div>
                    {messages.map((message, ind) => (
                        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </div>
            </div>
            <div className="messaging-form-container">
                <form onSubmit={sendChat} id="message-form">
                    {/* <p contentEditable={true} name="messages" onInput={updateChatInput} placeholder="Write a message..." value={chatInput}></p> */}
                    <textarea
                        name='chatInput'
                        placeholder="Write a message .."
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                </form>
                <div className="send-message-container">
                    <button form="message-form" id="send-message" type="submit">Send</button>
                    <i id="app-home-heading-right-container-options" class="fa-solid fa-ellipsis"></i>
                </div>
                {/* <form onSubmit={sendChat}>
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    <button type="submit">Send</button>
                </form> */}

            </div>
        </div>
    )
}

export default MessageRoom;
