import React, { useState } from "react"

const FollowButton = () => {
    const [isFollowed, setIsFollowed] = useState(false)

    
    return (
        <div>
            <div>
                <i className="fa-regular fa-plus"></i>
                Follow
            </div>
        </div>
    )
}

export default FollowButton
