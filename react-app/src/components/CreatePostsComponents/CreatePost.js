import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import "../../stylesheets/CreatePost.css";
import noPP from "../../assets/no-pp.png";
import { createPostThunk, editPostThunk } from "../../store/posts";

function CreatePost({ setShowModal, post }) {
    const [body, setBody] = useState(post?.body || "");
    const [picture, setPicture] = useState(post?.picture || "")
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    const submitPost = async (event) => {
        event.preventDefault();
        const submission = {
            "body": body,
            "user": user.id,
            "picture": picture,
        }
        const reponseErrors = post ? await dispatch(editPostThunk(submission, post.id)) : await dispatch(createPostThunk(submission))
        if (reponseErrors) {
            return;
        } else {
            setShowModal(false)
        }
    }

    const updateProfilePicture = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const res = await fetch("/api/images/", {
            method: "POST",
            body: formData
        })

        if (res.ok) {
            const data = await res.json();
            setPicture(data.url);
        } else {
            const errors = await res.json();
            console.log(errors)
            errors.image = "Image failed to upload;"
        }
    };

    useEffect(() => {
        const errors = {}
        if (body.length < 1 || body.length > 3000) errors.body = true;

        setErrors(errors)
    }, [body])

    return (
        <div id="create-post-modal-container">
            <div id="create-post-heading-exit-container">
                <div id="create-post-heading-exit-content">

                    <div id="create-post-subtitle">
                        {`${post ? "Edit" : "Create a"} post`}
                    </div>
                    <div onClick={() => setShowModal(false)} id='create-post-exit-button'>
                        <i className="fa-solid fa-x"></i>
                    </div>
                </div>
            </div>
            <div id="create-post-user-info-container">
                <div id="create-post-user-info-icon">
                    <img id='no-pp' src={user.profile_picture || noPP} />
                </div>
                <div id="create-post-user-info-name">
                    {user.first_name} {user.last_name}
                </div>
            </div>
            <div id="form-container">
                <form id="body-form" onSubmit={submitPost}>
                    <div id="create-post-textarea">
                        <textarea name='body' placeholder='What do you want to talk about?' value={body} onChange={updateBody} />
                    </div>
                </form>
                {body.length > 3000 && <p>{body.length}/3000</p>}
            </div>
            <div id="create-post-footer-container">
                <div id="empty-div">
                </div>
                <div id="post-container">
                    <label id="postImageContainer">
                        <i className="fa-regular fa-image" />
                        <p>Image</p>
                        {picture && <div id="postImage">
                            <img src={picture} alt="preview" />
                        </div>}
                        <input style={{ visibility: "hidden", width: "0" }} type="file" accept='image/png, image/jpg, image/jpeg, image/gif' onChange={updateProfilePicture} /></label>
                    <button id="create-post-form-can-submit" form="body-form" type="submit" disabled={errors.body}>{`${post ? "Save Changes" : "Post"}`}</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;
