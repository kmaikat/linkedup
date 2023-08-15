import { getPostsThunk } from "./posts"

export const likePostThunk = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        dispatch(getPostsThunk())
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const unlikePostThunk = (postId) => async dispatch => {
    const response = await fetch(`/api/likes/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        dispatch(getPostsThunk())
    } else {
        const errors = await response.json();
        return errors;
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state
        }

    }
}
