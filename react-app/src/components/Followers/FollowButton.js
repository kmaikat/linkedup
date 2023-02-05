import React, { useState } from "react"
import "../../stylesheets/FollowButton.css"
const FollowButton = () => {
    const [isFollowed, setIsFollowed] = useState(false)
    

    return (
        <>
            <div className="not-followed">
                <i id="follow-plus-icon" className="fa-regular fa-plus"></i>
                Follow
            </div>
        </>
    )
}

export default FollowButton
