import { 
    OPEN_POST_MODAL, 
    CLOSE_POST_MODAL, 
    GET_POSTS, 
    NEW_POST,
    RESET_POSTS,
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

export const getPosts = () => {
    return dispatch => {
        axios.get('http://localhost:4000/api/post/').then(
            ({ data }) => {
                dispatch({
                    type: GET_POSTS,
                    posts: data
                })
            },
            ({ response }) => {
                console.log("response from 400 getposts");
                console.log(response)
            });
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
                    dispatch({
                        type: NEW_POST,
                        post: data.post
                    })
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