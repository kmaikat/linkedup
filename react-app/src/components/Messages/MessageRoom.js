import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "../../stylesheets/MessageRoom.css"



const MessageRoom = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)



    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()

        setChatInput("")
    }

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
