import { useState } from "react";
import "../../stylesheets/CreatePost.css"
import noPP from "../../assets/no-pp.png";

function CreatePost({ setShowModal }) {
    const [body, setBody] = useState("");

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    return (
        <div id="create-post-modal-container">
            <div id="create-post-heading-exit-container">
                <div id="create-post-subtitle">
                    Create a post
                </div>
                <div id='create-post-exit-button'>
                    <i onClick={() => setShowModal(false)} className="fa-solid fa-x"></i>
                </div>
            </div>
            <div id="create-post-user-info-container">
                <div id="create-post-user-info-icon"><img src={noPP}/></div>
                <div id="create-post-user-info-name">
                    <div id="create-post-user-info-name">
                        <div className="create-post-user-name">firstn</div>
                        <div className="create-post-user-name">lastn</div>
                    </div>
                </div>
            </div>
            <form>
                <div id="create-post-textarea">
                    <textarea name='body' placeholder='What do you want to talk about?' value={body} onChange={updateBody} />
                </div>
            </form>
            <div id="create-post-footer-container">
                <button>Post</button>
            </div>
        </div>
    )
}

export default CreatePost;
