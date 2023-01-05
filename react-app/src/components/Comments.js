import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noPP from "../assets/no-pp.png";
import "../stylesheets/Comments.css"

const Comments = () => {
    const [body, setBody] = useState('')
    const user = useSelector(state => state.session.user);
    // const post = useSelector(state => state.session.post);
    const dispatch = useDispatch()

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    const submitPost = async (event) => {
        event.preventDefault();
        // const submission = {
        //     "body"
        // }

    }

    // div for comment text area
    // div for all comments
    return (
        <div id="comment-section-container">
            <div id="comment-input-section-container">
                {/* "THIS IS WHERE THE INPUT IS GOING" */}
                <form id="comment-body-form">
                    <div id="create-comment-user-info-icon">
                        <img id='no-pp' src={noPP} />
                    </div>
                    <div id="comment-input-text-area">
                        <p contentEditable={true} name="body" placeholder="Add a comment..." value={body} onChange={updateBody} />
                    </div>
                </form>
            </div>
            <div id="all-comment-section-container">
                "THIS IS WHERE ALL THE COMMENTS ARE GOING"
            </div>
        </div>
    )
}

export default Comments
