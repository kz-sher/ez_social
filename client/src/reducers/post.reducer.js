import { 
    OPEN_POST_MODAL, 
    CLOSE_POST_MODAL, 
    ADD_POST,
    SET_POST, 
    SET_POSTS,
    RESET_POSTS,
    SET_POSTS_LOADING_ERROR,
    SET_POST_LOADING,
    SET_POSTS_LOADING,
    SET_POST_CREATE_LOADING,
    SET_HAS_MORE_POSTS,
    SET_PAGE_NUM,
    INC_PAGE_NUM,
    UPDATE_POST,
    DELETE_POST
} from '../actions/types';

const DEFAULT_STATE = {
    modalOpen: false,
    post: {},
    posts: [],
    postLoading: true,
    postsLoading: true,
    postCreateLoading: false,
    isNewPost: false,
    pageNum:1,
    postsLoadingError: false,
    hasMorePosts: false,
    lastPostId: -1,
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case OPEN_POST_MODAL:
            return {...state, modalOpen: true}
        case CLOSE_POST_MODAL:
            return {...state, modalOpen: false}
        case SET_POST:
            return {...state, post: action.payload }
        case SET_POSTS:
            return {...state, posts: [...state.posts, ...action.payload.posts], lastPostId: action.payload.postId}
        case ADD_POST:
            return {...state, posts: [action.payload, ...state.posts]}
        case RESET_POSTS:
            return DEFAULT_STATE;
        case SET_POSTS_LOADING_ERROR:
            return {...state, postsLoadingError: action.payload}
        case SET_POST_CREATE_LOADING:
            return {...state, postCreateLoading: action.payload}
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
        case UPDATE_POST:
            const posts = state.posts.filter(
                post => post._id !== action.payload._id
             );
             return {
                ...state,
                posts: [action.payload, ...posts]
             };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
             };
        default:
            return state;
    }
}