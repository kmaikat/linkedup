import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import "../stylesheets/Comments.css"
import "../stylesheets/Comments.css"
import { deleteCommentThunk, editCommentThunk } from "../store/comment";

function CommentCard({ comment, user }) {
    const [showCommentOptions, setShowCommentOptions] = useState(false);
    const [body, setBody] = useState("")
    const [showEdit, setShowEdit] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const postContent = useRef(null)

    const onDelete = async (event) => {
        event.stopPropagation()
        event.preventDefault()
        const errors = await dispatch(deleteCommentThunk(comment.id))

        if (errors) {
            console.log(errors)
        } else {

        }
    }

    const updateBody = (e) => {
        setBody(e.target.textContent);
    };

    const submitComment = async (event) => {
        event.preventDefault();
        const submission = {
            body
        }

        const errors = await dispatch(editCommentThunk(submission, comment.id))

        if (errors) {

        } else {
            postContent.current.textContent = ""
            setBody("")
            setShowEdit(false);
        }
    }

    useEffect(() => {
        if (!showEdit) return
        postContent.current.textContent = comment.body;
        postContent.current.focus()

        const selection = window.getSelection()
        selection.removeAllRanges()
        const range = document.createRange()
        range.selectNodeContents(postContent.current)
        range.collapse(false)

        selection.addRange(range)
    }, [showEdit])

    useEffect(() => {
        const errors = {}
        if (body.trim().length < 1 || body.length > 1500) errors.body = true;

        setErrors(errors)
    }, [body])

    return (
        <li key={comment.id} className="all-comment-section-comment-container">
            <div id="create-comment-user-info-icon">
                <img src={comment.user.profile_picture || noPP} alt="Commentor Profile Image" />
            </div>
            <div className="all-comment-section-comment-content">
                <p className="all-comment-section-user-name">{comment.user.first_name} {comment.user.last_name}</p>
                <p className="all-comment-section-user-title">{comment.user.title}</p>
                {showEdit === false ?
                    <p className="all-comment-section-comment-body">{comment.body}</p> :
                    <div className="all-comment-section-edit-comment">
                        <p contentEditable={true} name="body" placeholder="Add a comment..." onInput={updateBody} ref={postContent} />
                        <div className="all-comment-section-edit-comment-buttons">
                            <button id="comment-section-save-changes-button" onClick={submitComment} disabled={errors.body}>Save Changes</button>
                            <button id="comment-section-cancel-button" onClick={() => setShowEdit(false)}>Cancel</button>
                            {body.trim().length > 0 && errors.body && <label style={{ marginLeft: "1.4rem", color: "#d11124" }}>{body.length}/1500</label>}
                        </div>
                    </div>

                }
            </div>

            <div className="all-comment-section-top-right">
                {user?.id === comment.user_id &&
                    <div style={{ backgroundColor: "transparent" }} id="app-home-heading-right-container-options" onClick={() => setShowCommentOptions(true)} tabIndex={showCommentOptions ? 1 : -1} onBlur={() => setShowCommentOptions(false)}>
                        <img src={threeDots} id="three-dots" />
                        {showCommentOptions &&
                            <ul className="all-comments-sections-comment-options">
                                <li onClick={(event) => {
                                    event.stopPropagation()
                                    event.preventDefault()
                                    setShowCommentOptions(false)
                                    setShowEdit(true)
                                }} id="comment-edit-button">
                                    <i class="fa-solid fa-pencil"></i>Edit</li>
                                <li onClick={onDelete}
                                ><i class="fa-solid fa-trash"></i>Delete</li>
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
