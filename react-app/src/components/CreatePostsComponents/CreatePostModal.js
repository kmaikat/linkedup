import { useState } from "react";
import { Modal } from "../context/Modal";
import CreatePost from "./CreatePost";

function CreatePostModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Create Post
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePost setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default CreatePostModal
