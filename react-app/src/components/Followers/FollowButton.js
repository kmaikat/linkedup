import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../store/session"
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
    
    const addUserToFollowing = async (event) => {
        // const errors = await dispatch(updateUser(user))

        // setIsFollowed((isFollowed) => !isFollowed)
    }

    return (
        <div onClick={addUserToFollowing}>
            {post.user_id in following ? "" : <div className="not-followed">
                <i id="follow-plus-icon" className="fa-regular fa-plus"></i>
                Follow
            </div>
            }

        </div>
    )
}

export default FollowButton
