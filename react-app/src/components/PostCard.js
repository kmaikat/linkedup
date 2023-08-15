import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import { deletePostThunk } from "../store/posts"
import "../stylesheets/AppHome.css"
import { useState } from "react";
import Comments from "./Comments";
import CreatePost from "./CreatePostsComponents/CreatePost";
import { Modal } from "./context/Modal";
import FollowButton from "./Network/FollowButton";

TimeAgo.addDefaultLocale(en)

function PostCard({ post }) {
    const [showPostOptions, setShowPostOptions] = useState(false)
    const [showCommentSection, setShowCommentSection] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const user = useSelector(state => state.session.user)
    const following = user.following;

    const dispatch = useDispatch();

    const dayPosted = (createdAtDate) => {
        const today = new Date().getUTCDay();
        const posted = new Date(createdAtDate).getUTCDay()
        const duration = today - posted
        return duration + "d"
    }


    const handleDeleteToggle = async (post) => {
        const errors = dispatch(deletePostThunk(post))
        setShowCommentSection(false)
        setShowPostOptions(false)
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
                            {following && post.user_id in following ? <div className="following-tag"> • Following </div> : ""}
                        </div>
                        <div className="app-home-post-user-subheading">
                            {post.user.title}
                        </div>
                        <div className="app-home-post-user-subheading">
                            <ReactTimeAgo date={post.created_at} timeStyle="twitter" /> • <i className="fa-solid fa-earth-americas"></i>
                        </div>
                    </div>
                </div>
                {user?.id !== post.user_id &&
                    <div><FollowButton post={post} /></div>
                }
                {user?.id === post.user_id &&
                    <div id="app-home-heading-right-container-options" onClick={() => setShowPostOptions(true)} tabIndex={showPostOptions ? 1 : -1} onBlur={() => setShowPostOptions(false)}>
                        <img id="three-dots" src={threeDots} />
                        {showPostOptions &&
                            <ul id="app-home-heading-right-container-options-list">
                                <li onClick={() => setShowModal(true)}>
                                    <i class="fa-solid fa-pencil" id="post-edit-icon"></i>Edit
                                </li>
                                <li onClick={() => handleDeleteToggle(post)}><i class="fa-solid fa-trash-can" id="post-delete-icon"></i>Delete</li>
                            </ul>
                        }
                    </div>
                }
            </div>
            <div id="post-body-container">
                {post.body}
            </div>
            <div id="post-body-image">
                <img src={post.picture} />
            </div>
            <div id="post-spacer">{Object.keys(post.comments).length ? (<div id="comment-number-button" onClick={() => setShowCommentSection(true)}>{Object.keys(post.comments).length} comments </div>) : ''}</div>
            <div id="interaction-container">
                <div id="comment-interaction">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="like-creation-medium" data-supported-dps="24x24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12.69 9.5H5.06a1.8 1.8 0 00-1.56 2A1.62 1.62 0 005.15 13h.29a1.38 1.38 0 00-1.34 1.39 1.43 1.43 0 001.31 1.42A1.42 1.42 0 006 18.35a1.45 1.45 0 00-.15 1 1.51 1.51 0 001.51 1.12h4.08a6.3 6.3 0 001.56-.2l2.56-.75h3.38c1.78-.07 2.26-8.26 0-8.26h-1c-.17 0-.27-.34-.71-.82-.65-.71-1.39-1.62-1.91-2.13a12.62 12.62 0 01-3-3.92C11.9 3.42 11.85 3 11 3a1.38 1.38 0 00-1.21 1.45c0 .25.13 1.12.18 1.43a10.6 10.6 0 001.76 3.62" fill={user.id in post.post_likes ? "#378fe9": "none"} fill-rule="evenodd" />
                            <path d="M5.06 10a1.42 1.42 0 00-1.56 1.5A1.6 1.6 0 005.15 13h.29a1.37 1.37 0 00-1.34 1.41 1.43 1.43 0 001.31 1.42A1.42 1.42 0 006 18.37a1.45 1.45 0 00-.15 1 1.53 1.53 0 001.52 1.13h4.08a6.8 6.8 0 001.55-.21l2.56-.75h3.38c1.78-.07 2.26-8.26 0-8.26h-1c-.17 0-.27-.34-.71-.82-.65-.71-1.39-1.62-1.91-2.13a12.62 12.62 0 01-3-3.92C11.9 3.44 11.85 3 11 3a1.29 1.29 0 00-.91.48 1.32 1.32 0 00-.3 1c0 .25.13 1.12.18 1.43A15.82 15.82 0 0011.73 10z" fill="none" stroke="#004182" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </svg>
                    <div className="like-text">Like</div>
                </div>
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
