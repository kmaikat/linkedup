import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noPP from "../assets/no-pp.png";

const CommentCard = () => {
    const [body, setBody] = useState('')
    const user = useSelector(state => state.session.user);
    // const post = useSelector(state => state.session.post);
    const dispatch = useDispatch()

    const updateBody = (e) => {
        setBody(e.target.value)
    }

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
                <div id="create-post-user-info-icon">
                    <img id='no-pp' src={noPP} />
                </div>
                <div id="comment-form-container">
                    <form id="comment-body-form">
                        <div id="comment-input-text-area"></div>
                        <textarea name="body" placeholder="Add a comment..." value={body} onChange={updateBody}/>
                    </form>
                </div>
            </div>
            <div id="all-comment-section-container">
                "THIS IS WHERE ALL THE COMMENTS ARE GOING"
            </div>

        </div>
    )
}

export default CommentCard
