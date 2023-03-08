import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser, updateUserThunk } from "../../store/session"
import "../../stylesheets/FollowButton.css"

const FollowButton = ({ post }) => {
    const [isFollowed, setIsFollowed] = useState(false)
    const following = useSelector(state => state.session.user.following)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    // if the post's user id is not in the following list, then it should say
    // "follow". otherwise, it will have a check and "following"

    // 1. send the post's user information to the following route with a fetch request
    // 2. bring that information back and store it in our state
    // 3. let the user know whether they are following or not (button)
    const handleFollow = async(event) => {
        console.log("following... ")
        event.preventDefault();
        // fetch to the route
        const response = await fetch(`/api/users/${post.user_id}/following`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post.user_id)
        })

        if (response.ok) {
            dispatch(updateUserThunk())
        } else {
            const errors = await response.json();
            return errors;
        };

    }

    const handleUnfollow =() => {
        console.log("unfollowing...")
    }

    return (
        <div>
            {/* {post.user_id in following ? "" : */}
            {post.user_id in following ?
            <div className="followed" onClick={handleUnfollow}>
                <i id="follow-plus-icon" className="fa-solid fa-check"></i>
                Following
            </div> :
            <div className="not-followed" onClick={handleFollow}>
                <i id="follow-plus-icon" className="fa-regular fa-plus"></i>
                Follow
            </div>
            }

        </div>
    )
}

export default FollowButton
