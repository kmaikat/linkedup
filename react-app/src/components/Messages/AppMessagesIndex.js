import Footer from "../Footer"
import NavBar from "../NavBar"
import "../../stylesheets/AppMessagesIndex.css"
import MessagesPreviews from "./MessagesPreviews"
import MessageRoom from "./MessageRoom"
import { useState } from "react"

const AppMessagesIndex = () => {
    const [newRoom, setNewRoom] = useState(false);

    const createNewRoom = () => {
        console.log("hello this is patrick")
        setNewRoom(true)
        console.log("new room being created.. ")
    }
    return (
        <div className='app-home-outer-container'>
            <NavBar />
            <div className="app-home-main-container" >
                <div id="app-messages-main-container">

                    <div className="app-messages-conversations-section">
                        <div className="messages-preview-outer-container">
                            <div className="messages-preview-heading-outer">
                                <div className="messages-preview-heading">
                                    <div>Messaging</div>
                                    <p onClick={createNewRoom}>
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </p>
                                </div>
                            </div>
                            {/* message rooms/card will go here */}
                        </div>
                    </div>
                    <div className="app-messages-chat-section">
                        <MessageRoom />
                    </div>
                </div>
                <div className="app-home-right">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default AppMessagesIndex
