// action
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
// thunks
export function createCommentAction(comment) {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export const createPostThunk = (post) => async dispatch => {
    const response = "hello, I left off here"
}


const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state
        }

    }
}
