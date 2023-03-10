import { useState } from "react"
import "../../stylesheets/MessagePreviews.css"

// this is currently commented out 
const MessagesPreviews = () => {
    const [newRoom, setNewRoom] = useState(false)

    const createRoom = () => {
        setNewRoom(newRoom)
    }

    return (
        <div className="messages-preview-outer-container">
            <div className="messages-preview-heading-outer">
                <div className="messages-preview-heading">
                    <div>Messaging</div>
                    <p onClick={createRoom}>
                        <i class="fa-regular fa-pen-to-square"></i>
                    </p>
                </div>
            </div>
            {/* message rooms/card will go here */}
        </div>
    )
}

export default MessagesPreviews
