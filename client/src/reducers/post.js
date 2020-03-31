import { OPEN_POST_MODAL, CLOSE_POST_MODAL, ADD_NEW_POST, GET_POSTS } from '../actions/types';

const DEFAULT_STATE = {
    open: false,
    post: {},
    posts: [],
    postLoading: false,
    postsLoading: false,
    isNewPost: false
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case OPEN_POST_MODAL:
            return {...state, open: true}
        case CLOSE_POST_MODAL:
            return {...state, open: false}
        case GET_POSTS:
            return {...state, posts: [...action.posts]}
        case ADD_NEW_POST:
            return {...state, posts: [...state.posts, action.post]}
        default:
            return state;
    }
}