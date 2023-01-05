import { getPostsThunk } from "./posts"

// action
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
// thunks
export function createCommentAction(comment) {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export const createCommentThunk = (comment, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })


    if (response.ok) {
        dispatch(getPostsThunk());
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}/`, {
        method: "DELETE"
    })

    console.log(response)

    if (response.ok) {
        dispatch(getPostsThunk());
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const editCommentThunk = (comment, commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })


    if (response.ok) {
        dispatch(getPostsThunk());
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
