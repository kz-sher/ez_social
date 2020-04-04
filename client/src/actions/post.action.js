import { 
    OPEN_POST_MODAL, 
    CLOSE_POST_MODAL, 
    SET_POSTS, 
    ADD_POST,
    RESET_POSTS,
    SET_POSTS_LOADING_ERROR,
    SET_POSTS_LOADING,
    SET_POST_LOADING,
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

export const getPosts = (pageNum, postId) => {
    return dispatch => {

        dispatch(setPostsLoadingError(false));

        const params = { 
            params: { 
                pageNum, 
                nPerPage: 10,
                postId,
            }
        }

        let cancel;

        axios.get('/api/post/', params).then(
            ({ data }) => {
                if(data.posts.length > 0){
                    dispatch(setPosts(data));
                    dispatch(setHasMorePosts(true));
                }
                else{
                    dispatch(setHasMorePosts(false));
                }
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

export const createPost = ({ postData, resetForm, setErrors, setSubmitting }) => {
    return async dispatch => {
        await axios.post('/api/post/create', postData).then(
            ({ data }) => {
                if(data.POST_OK){
                    dispatch(togglePostModal());
                    resetForm();
                    dispatch(setPostLoading(true));
                    setTimeout( () => {
                        dispatch(addNewPost(data.post));
                        dispatch(setPostLoading(false));
                    }, 500);
                    setSubmitting(false);
                } 
                else{
                    setErrors(data.formErrors);
                    setSubmitting(false);
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
    return dispatch => {
        dispatch({
            type: RESET_POSTS
        });
    }
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

export const setPostLoading = isLoading => {
    return dispatch => {
        dispatch({
            type: SET_POST_LOADING,
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