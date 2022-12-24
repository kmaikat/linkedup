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

// thunks
export const getPostsThunk = () => async dispatch => {
    const response = await fetch("/api/posts")
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

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {

            return state
        }
        default: {
            return state
        }

    }
}
