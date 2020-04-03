import { 
    OPEN_POST_MODAL, 
    CLOSE_POST_MODAL, 
    ADD_POST, 
    SET_POSTS,
    RESET_POSTS,
    SET_POSTS_LOADING_ERROR,
    SET_POSTS_LOADING,
    SET_POST_LOADING,
    SET_HAS_MORE_POSTS,
    SET_PAGE_NUM,
    INC_PAGE_NUM,
} from '../actions/types';

const DEFAULT_STATE = {
    modalOpen: false,
    post: {},
    posts: [],
    postLoading: false,
    postsLoading: true,
    isNewPost: false,
    pageNum:1,
    postsLoadingError: false,
    hasMorePosts: false
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case OPEN_POST_MODAL:
            return {...state, modalOpen: true}
        case CLOSE_POST_MODAL:
            return {...state, modalOpen: false}
        case SET_POSTS:
            return {...state, posts: [...state.posts, ...action.payload]}
        case ADD_POST:
            return {...state, posts: [action.payload, ...state.posts]}
        case RESET_POSTS:
            return DEFAULT_STATE;
        case SET_POSTS_LOADING_ERROR:
            return {...state, postsLoadingError: action.payload}
        case SET_POST_LOADING:
            return {...state, postLoading: action.payload}
        case SET_POSTS_LOADING:
            return {...state, postsLoading: action.payload}
        case SET_HAS_MORE_POSTS:
            return {...state, hasMorePosts: action.payload};
        case SET_PAGE_NUM:
            return {...state, pageNum: action.payload};
        case INC_PAGE_NUM:
            return {...state, pageNum: state.pageNum + 1};
        default:
            return state;
    }
}