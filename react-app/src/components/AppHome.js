import { useEffect } from "react"
import { useSelector } from "react-redux"
import CreatePostModal from "./CreatePostsComponents/CreatePostModal"
import NavBar from "./NavBar"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import "../stylesheets/AppHome.css"

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
                            return (<li className="app-home-post">
                                <div id="app-home-post-heading-container">
                                    <div id="app-home-heading-left-container">
                                        <div id="create-post-user-info-icon">
                                            <img id='no-pp' src={noPP} />
                                        </div>
                                        <div id="app-home-post-heading-name">
                                            <div className="app-home-post-user-heading">
                                                name HERE
                                            </div>
                                            <div className="app-home-post-user-heading">
                                                title HERE
                                            </div>
                                            <div className="app-home-post-user-heading">
                                                date posted here
                                            </div>



                                        </div>
                                    </div>
                                    <div id="app-home-heading-right-container-options">
                                        <img src={threeDots} />
                                    </div>
                                </div>
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
