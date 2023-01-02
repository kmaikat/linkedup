import { useEffect } from "react"
import { useSelector } from "react-redux"
import "../stylesheets/AppHome.css"
import CreatePostModal from "./CreatePostsComponents/CreatePostModal"
import NavBar from "./NavBar"

const AppHome = () => {
    const posts = useSelector(state => state.posts?.posts);
    return (
        <div className="app-home-outer-container">
            <NavBar />
            <div className="app-home-main-container" >
                <div className="app-home-profile-section">
                    "PROFILE SECTION WILL GO HERE"
                </div>
                <div className="app-home-feed">
                    <CreatePostModal />
                    <ul>
                        {posts?.map(post => {
                            return (<li>
                                {post.body}
                            </li>)
                        }).reverse()}
                    </ul>
                </div>
                <div className="app-home-right">

                </div>
            </div>
        </div>
    )
}

export default AppHome
