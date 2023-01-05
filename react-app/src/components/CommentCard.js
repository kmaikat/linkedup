import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import "../stylesheets/Comments.css"
import "../stylesheets/Comments.css"

function CommentCard({ comment, user }) {
    const [showCommentOptions, setShowCommentOptions] = useState(false);
    const [body, setBody] = useState('')
    const dispatch = useDispatch()


    return (
        <li key={comment.id} className="all-comment-section-comment-container">
            <div id="create-comment-user-info-icon">
                <img src={comment.user.profile_picture || noPP} alt="Commentor Profile Image" />
            </div>
            <div className="all-comment-section-comment-content">
                <p className="all-comment-section-user-name">{comment.user.first_name} {comment.user.last_name}</p>
                <p className="all-comment-section-user-title">{comment.user.title}</p>
                <p className="all-comment-section-comment-body">{comment.body}</p>
            </div>

            <div className="all-comment-section-top-right">
                {user?.id === comment.user_id &&
                    <div style={{ backgroundColor: "transparent" }} id="app-home-heading-right-container-options" onClick={() => setShowCommentOptions(true)} tabIndex={showCommentOptions ? 1 : -1} onBlur={() => setShowCommentOptions(false)}>
                        <img src={threeDots} id="three-dots" />
                        {showCommentOptions &&
                            <ul className="all-comments-sections-comment-options">
                                <li>Edit</li>
                                <li>Delete</li>
                            </ul>
                        }
                    </div>}
                <div className="all-comment-section-top-right-time">
                    <ReactTimeAgo date={comment.created_at} timeStyle={"twitter"} />
                </div>
            </div>
        </li>
    )
}

export default CommentCard
