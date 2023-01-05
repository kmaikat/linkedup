import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"
import threeDots from "../assets/three-dots.svg"
import noPP from "../assets/no-pp.png";
import "../stylesheets/Comments.css"
import CommentCard from "./CommentCard";

TimeAgo.addDefaultLocale(en)

const Comments = ({ post }) => {
    const [body, setBody] = useState('')
    const user = useSelector(state => state.session.user);
    // const post = useSelector(state => state.session.post);
    const dispatch = useDispatch()

    // div for comment text area
    // div for all comments

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    const submitComment = async (event) => {
        event.preventDefault();
        // const submission = {
        //     "body"
        // }

    }

    const comments = Object.values(post.comments)

    console.log(comments)
    return (
        <div id="comment-section-container">
            <div id="comment-input-section-container">
                {/* "THIS IS WHERE THE INPUT IS GOING" */}
                <form id="comment-body-form" onSubmit={submitComment}>
                    <div id="create-comment-user-info-icon">
                        <img id='no-pp' src={noPP} />
                    </div>
                    <div id="comment-input-and-submit">
                        <p contentEditable={true} name="body" placeholder="Add a comment..." value={body} onChange={updateBody} />
                        <button>Post</button>
                    </div>
                </form>
            </div>
            <ul id="all-comment-section-container">
                {comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} user={user}/>
                ))}
            </ul>
        </div>
    )
}

export default Comments
