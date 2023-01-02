import "../stylesheets/AppHome.css"
import CreatePostModal from "./CreatePostsComponents/CreatePostModal"

const AppHome = () => {
    return (
        <div className="app-home-outer-container">
            "NAVBAR GOES HERE"
            <div className="app-home-main-container" >
                <div className="app-home-profile-section">
                    "PROFILE SECTION WILL GO HERE"
                </div>
                <div className="app-home-feed">
                    <CreatePostModal/>
                </div>
                <div className="app-home-right">

                </div>
            </div>
        </div>
    )
}

export default AppHome
