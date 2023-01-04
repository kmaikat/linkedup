import { useState } from "react";

function EditPostModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Edit
            </button>
            
        </>
    )
}
