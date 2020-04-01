import { 
    OPEN_POST_MODAL, 
    CLOSE_POST_MODAL, 
    SET_POSTS, 
    ADD_POST,
    RESET_POSTS,
    SET_POSTS_LOADING_ERROR,
    SET_POSTS_LOADING,
    SET_HAS_MORE_POSTS,
    SET_PAGE_NUM,
    INC_PAGE_NUM,
} from './types';
import { openAlert } from './alert.action';
import axios from 'axios';

export const togglePostModal = (open=false) => {
    return dispatch => {
            dispatch({
                type: open ? OPEN_POST_MODAL : CLOSE_POST_MODAL
            })
        }
}

export const getPosts = (pageNum) => {
    return dispatch => {

        dispatch(setPostsLoading(true));
        dispatch(setPostsLoadingError(false));

        const params = { 
            params: { 
                pageNum, 
                nPerPage: 10 
            }
        }

        let cancel;

        axios.get('http://localhost:4000/api/post/', params).then(
            ({ data }) => {
                dispatch(setPosts(data));
                dispatch(setHasMorePosts(data.length > 0));
                dispatch(setPostsLoading(false));
            },
            ({ response }) => {
                if(axios.isCancel(response)) return
                dispatch(setPostsLoadingError(true));
                dispatch(setPostsLoading(false));
            });
        return () => cancel();
    }
}

export const createPost = ({ postData, setErrors, setSubmitting }) => {
    return dispatch => {
        axios.post('http://localhost:4000/api/post/create', postData).then(
            ({ data }) => {
                if(data.POST_OK){
                    dispatch(togglePostModal());
                    setTimeout( () => {
                        dispatch(openAlert({
                            status: 'success',
                            msg: data.message
                        }));
                    }, 100);
                    addNewPost(data.post);
                } 
                else{
                    setErrors(data.formErrors);
                }
            },
            ({ response })=>{
                dispatch(openAlert({
                    status: 'error',
                    msg: !response ? 'Server error occured' : response.data.message
                }))  
                setSubmitting(false);
            });
    }
}

export const resetPosts = () => {
    return {
       type: RESET_POSTS
    };
};

export const setPostsLoadingError = isError => {
    return dispatch => {
        dispatch({
            type: SET_POSTS_LOADING_ERROR,
            payload: isError
        });
    };
};

export const setPostsLoading = isLoading => {
    return dispatch => {
        dispatch({
            type: SET_POSTS_LOADING,
            payload: isLoading
        });
    };
};

export const setPosts = posts => {
    return dispatch => {
        dispatch({
            type: SET_POSTS,
            payload: posts
        });
    }
}

export const addNewPost = post => {
    return dispatch => {
        dispatch({
            type: ADD_POST,
            payload: post
        });
    }
}

export const setHasMorePosts = hasMorePosts => {
    return dispatch => {
        dispatch({
            type: SET_HAS_MORE_POSTS,
            payload: hasMorePosts
        });
    }
}

export const setPageNum = pageNum => {
    return dispatch => {
        dispatch({
            type: SET_PAGE_NUM,
            payload: pageNum
        });
    }
}

export const incrementPageNum = () => {
    return dispatch => {
        dispatch({
            type: INC_PAGE_NUM,
        });
    }
}