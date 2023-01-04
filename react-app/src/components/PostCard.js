import { useDispatch } from "react-redux";
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import { deletePostThunk, editPostThunk } from "../store/posts"
import "../stylesheets/AppHome.css"
import { useState } from "react";

function PostCard({ post }) {
    const [showPostOptions, setShowPostOptions] = useState(false)

    const dispatch = useDispatch();

    const dayPosted = (createdAtDate) => {
        const today = new Date().getUTCDay();
        const posted = new Date(createdAtDate).getUTCDay()
        const duration = today - posted
        return duration + "d"
    }


    const handleDeleteToggle = async (post) => {
        const errors = dispatch(deletePostThunk(post))
    }


    return (
        <li className="app-home-post">
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
                <div id="app-home-heading-right-container-options" onClick={() => setShowPostOptions(true)} tabIndex={showPostOptions ? 1 : -1} onBlur={() => setShowPostOptions(false)}>
                    <img id="three-dots" src={threeDots} />
                    {showPostOptions &&
                        <ul id="app-home-heading-right-container-options-list">
                            <li>
                                Edit
                            </li>
                            <li onClick={() => handleDeleteToggle(post)}>Delete</li>
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
        </li>
    )
}

export default PostCard