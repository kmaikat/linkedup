// action types
const GET_POSTS = 'posts/GET_POSTS'
const GET_POST_BY_USER_ID = 'posts/GET_POST'
const CREATE_POST = 'posts/CREATE_POSTS'
const EDIT_POST = 'posts/EDIT_POST'
const DELETE_POST = 'posts/DELETE_POST'

// actions
export function getPostsAction(posts) {
    return {
        type: GET_POSTS,
        posts
    }
}

export function getPostsByIdAction(posts) {
    return {
        type: GET_POST_BY_USER_ID,
        posts
    }
}

export function createPostAction(post) {
    return {
        type: CREATE_POST,
        post
    }
}

export function editPostAction(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function deletePostAction(post) {
    return {
        type: DELETE_POST,
        post
    }
}

// thunks
export const getPostsThunk = () => async dispatch => {
    const response = await fetch("/api/posts/")

    if (response.ok) {
        const data = await response.json()
        dispatch(getPostsAction(data))
    }

}


export const getPostsByUserThunk = () => async dispatch => {
    const response = await fetch("/api/posts/recent-activity")

    if (response.ok) {
        const data = await response.json()
        dispatch(getPostsByIdAction(data))
    }

}

export const createPostThunk = (post) => async dispatch => {
    const response = await fetch("/api/posts/", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const post = await response.json();
        dispatch(createPostAction(post));
    } else {
        const errors = await response.json();
        return errors;
    };
}

export const deletePostThunk = (post) => async dispatch => {
    const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    });

    if (response.ok) {
        dispatch(deletePostAction(post));
    };
}

export const editPostThunk = (post, postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    });

    if (response.ok) {
        const post = await response.json();
        dispatch(editPostAction(post));
    } else {
        const errors = await response.json();
        return errors;
    };
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {
            return action.posts
        }

        case CREATE_POST: {
            const newState = { ...state }
            newState[action.post.id] = action.post
            return newState
        }

        case DELETE_POST: {
            const newState = { ...state }
            delete newState[action.post.id]
            return newState
        }

        case EDIT_POST: {
            const newState = { ...state }
            const editedPost = action.post
            console.log(newState, editedPost)
            newState[action.post.id] = editedPost
            return newState
        }

        default: {
            return state
        }

    }
}
