import Footer from "../Footer"
import NavBar from "../NavBar"
import "../../stylesheets/AppMessagesIndex.css"
import MessagesPreviews from "./MessagesPreviews"

const AppMessagesIndex = () => {
    return (
        <div className='app-home-outer-container'>
            <NavBar />
            <div className="app-home-main-container" >
                <div id="app-messages-main-container">

                    <div className="app-messages-conversations-section">
                        <MessagesPreviews/>
                    </div>
                    <div className="app-messages-chat-section">
                        convo here
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
