import { useState } from "react";

function CreatePost({ setShowModal }) {
    const [body, setBody] = useState("");

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    return (
        <div>
            <div>
                <div>
                    Create a post
                </div>
                <div>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>
            <form>
                <div>
                    <textarea name='body' placeholder='What do you want to talk about?' value={body} onChange={updateBody} />
                </div>
            </form>
            <div>
                <button>Post</button>
            </div>
        </div>
    )
}

export default CreatePost;
