import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import CreatePostModal from "./CreatePostsComponents/CreatePostModal"
import NavBar from "./NavBar"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import "../stylesheets/AppHome.css"

const AppHome = () => {
    const posts = useSelector(state => state.posts?.posts);

    const [showPostOptions, setShowPostOptions] = useState(-1);

    const dayPosted = (createdAtDate) => {
        const today = new Date().getUTCDay();
        const posted = new Date(createdAtDate).getUTCDay()
        const duration = today - posted
        return duration + "d"
    }

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
                        {posts?.map((post, idx) => {
                            return (<li className="app-home-post">
                                <div id="app-home-post-heading-container">
                                    <div id="app-home-heading-left-container">
                                        <div id="create-post-user-info-icon">
                                            <img id='no-pp' src={noPP} />
                                        </div>
                                        <div id="app-home-post-heading-name">
                                            <div className="app-home-post-user-heading">
                                                {post.user.first_name} {post.user.last_name}
                                            </div>
                                            <div className="app-home-post-user-subheading">
                                                {post.user.title}
                                            </div>
                                            <div className="app-home-post-user-subheading">
                                                {dayPosted(post.created_at)} • <i class="fa-solid fa-earth-americas"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="app-home-heading-right-container-options" onClick={() => setShowPostOptions(idx)} tabIndex={idx === showPostOptions ? 1 : -1} onBlur={() => setShowPostOptions(-1)}>
                                        <img id="three-dots" src={threeDots} />
                                        {showPostOptions === idx &&
                                            <ul id="app-home-heading-right-container-options-list">
                                                <li>Edit</li>
                                                <li>Delete</li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                                <div id="post-body-container">
                                    {post.body}
                                </div>
                                <div id="post-spacer"></div>
                                <div id="interaction-container">
                                    <div id="comment-interaction">
                                        <i id="comment-icon" className="fa-regular fa-comment-dots"></i>
                                        <div className="comment-text">Comment</div>
                                    </div>
                                </div>
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
