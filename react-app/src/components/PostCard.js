import { useDispatch } from "react-redux";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import { deletePostThunk, editPostThunk } from "../store/posts"
import "../stylesheets/AppHome.css"
import { useState } from "react";
import Comments from "./Comments";
import CreatePostModal from "./CreatePostsComponents/CreatePostModal";
import CreatePost from "./CreatePostsComponents/CreatePost";
import { Modal } from "./context/Modal";

TimeAgo.addDefaultLocale(en)

function PostCard({ post }) {
    const [showPostOptions, setShowPostOptions] = useState(false)
    const [showCommentSection, setShowCommentSection] = useState(false)
    const [showModal, setShowModal] = useState(false)

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
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePost post={post} setShowModal={setShowModal} />
                </Modal>
            )}
            <div id="app-home-post-heading-container">
                <div id="app-home-heading-left-container">
                    <div id="create-post-user-info-icon">
                        <img id='no-pp' src={post.user.profile_picture || noPP} />
                    </div>
                    <div id="app-home-post-heading-name">
                        <div className="app-home-post-user-heading">
                            {post.user.first_name} {post.user.last_name}
                        </div>
                        <div className="app-home-post-user-subheading">
                            {post.user.title}
                        </div>
                        <div className="app-home-post-user-subheading">
                            <ReactTimeAgo date={post.created_at} timeStyle="twitter" /> • <i class="fa-solid fa-earth-americas"></i>
                        </div>
                    </div>
                </div>
                <div id="app-home-heading-right-container-options" onClick={() => setShowPostOptions(true)} tabIndex={showPostOptions ? 1 : -1} onBlur={() => setShowPostOptions(false)}>
                    <img id="three-dots" src={threeDots} />
                    {showPostOptions &&
                        <ul id="app-home-heading-right-container-options-list">
                            <li onClick={() => setShowModal(true)}>
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
                <div id="comment-interaction" onClick={() => setShowCommentSection(true)}>
                    <i id="comment-icon" className="fa-regular fa-comment-dots"></i>
                    <div className="comment-text">Comment</div>
                </div>
            </div>
            <div id="comment-container">
                {showCommentSection &&
                    <div>
                        <Comments post={post} />
                    </div>
                }
            </div>
        </li>
    )
}

export default PostCard
