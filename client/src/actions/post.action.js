import { 
    OPEN_POST_MODAL, 
    CLOSE_POST_MODAL, 
    SET_POST,
    SET_POSTS, 
    ADD_POST,
    RESET_POSTS,
    SET_POSTS_LOADING_ERROR,
    SET_POST_LOADING,
    SET_POSTS_LOADING,
    SET_POST_CREATE_LOADING,
    SET_HAS_MORE_POSTS,
    SET_PAGE_NUM,
    INC_PAGE_NUM,
    UPDATE_POST,
    DELETE_POST,
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

export const getPost = (postId) => {
    return dispatch => {
        dispatch(setPostLoading(true));
        axios.get(`/api/post/post/${postId}`).then(
            ({ data }) => {
                dispatch(setPost(data.post));
                dispatch(setPostLoading(false));
            },
            ({ response }) => {
                dispatch(openAlert({
                    status: 'error',
                    msg: !response ? 'Server error occured' : response.data.message
                }))
                dispatch(setPostLoading(false));
            }
        )
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
                    dispatch(setPostCreateLoading(true));
                    setTimeout( () => {
                        dispatch(addNewPost(data.post));
                        dispatch(setPostCreateLoading(false));
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

export const updatePost = ({ description, postId, history, setSubmitting }) => {
    return async dispatch => {
        await axios.patch(`/api/post/update/${postId}`, { description }).then(
            ({ data }) => {
                dispatch({
                    type: UPDATE_POST,
                    payload: data.post
                });
                setSubmitting(false);
                setPost(data.post);
                history.push(`/post/${data.post._id}`);
                dispatch(openAlert({
                    status: 'success',
                    msg: data.message
                }))
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

export const deletePost = (postId, history) => {
    return async dispatch => {
        await axios.delete(`/api/post/delete/${postId}`).then(
            ({ data }) => {
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                });
                history.push('/');
                dispatch(openAlert({
                    status: 'success',
                    msg: data.message
                }))
            },
            ({ response })=>{
                dispatch(openAlert({
                    status: 'error',
                    msg: !response ? 'Server error occured' : response.data.message
                }))
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

export const setPostCreateLoading = isLoading => {
    return dispatch => {
        dispatch({
            type: SET_POST_CREATE_LOADING,
            payload: isLoading
        });
    };
};

export const setPost = post => {
    return dispatch => {
        dispatch({
            type: SET_POST,
            payload: post
        });
    }
}

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