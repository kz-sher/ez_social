import { 
    OPEN_POST_MODAL, 
    CLOSE_POST_MODAL, 
    NEW_POST, 
    GET_POSTS,
    RESET_POSTS,
} from '../actions/types';

const DEFAULT_STATE = {
    modalOpen: false,
    post: {},
    posts: [],
    postLoading: false,
    postsLoading: false,
    isNewPost: false
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case OPEN_POST_MODAL:
            return {...state, modalOpen: true}
        case CLOSE_POST_MODAL:
            return {...state, modalOpen: false}
        case GET_POSTS:
            return {...state, posts: [...action.posts]}
        case NEW_POST:
            return {...state, posts: [...state.posts, action.post]}
        case RESET_POSTS:
            return DEFAULT_STATE;
        default:
            return state;
    }
}