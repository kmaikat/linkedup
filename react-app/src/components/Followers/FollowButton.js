import React, { useState } from "react"
import { useSelector } from "react-redux"
import "../../stylesheets/FollowButton.css"
const FollowButton = ({ post }) => {
    const [isFollowed, setIsFollowed] = useState(false)
    const following = useSelector(state => state.session.user.following)
    console.log(post.user_id)
    // if the post's user id is not in the following list, then it should say
    // "follow". otherwise, it will have a check and "following"

    return (
        <>
            { post.user_id in following ? "" : <div className="not-followed">
                <i id="follow-plus-icon" className="fa-regular fa-plus"></i>
                Follow
            </div>
            }

        </>
    )
}

export default FollowButton
