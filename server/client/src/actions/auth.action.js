import { SIGN_IN, SIGN_OUT, SET_USERNAME } from './types';
import { openAlert } from './alert.action';
import { resetPosts } from './post.action';
import { endInitLoading, setAuthHeader, extractTokenFromURL } from '../utils';
import axios from 'axios';

export const getUserInitType = () => {
    
    const token = localStorage.getItem('access-token') || extractTokenFromURL();
    setAuthHeader(token);

    return dispatch => {
        setTimeout(() => {
            axios.post('http://localhost:4000/api/auth/vtoken').then(
                ({ data }) => {
                    dispatch(setToken(token));
                    dispatch(setUsername(data.username))
                    endInitLoading(dispatch);
                },
                ({ response }) => {
                    // notify user if any message received 
                    if(response && response.data.message){
                        dispatch(openAlert({
                            status: 'error',
                            msg: response.data.message
                        }))
                    }
                    dispatch(removeToken());
                    endInitLoading(dispatch);
                });
        }, 1200);
    }
}

export const signUp = ({ userData, history, setErrors, setSubmitting }) => {
    return dispatch => {
        axios.post('http://localhost:4000/api/auth/signup', userData).then(
            ({ data }) => { 
                if(data.ACC_OK){
                    history.push('/');
                    dispatch(openAlert({
                        status: 'success',
                        msg: data.message
                    }))
                } 
                else{
                    setErrors(data.formErrors);
                    setSubmitting(false);
                }
            },
            ({ response }) => {
                dispatch(openAlert({
                    status: 'error',
                    msg: !response ? 'Server error occured' : response.data.message
                }))
                setSubmitting(false)
            }
        );
    }
}

export const signIn = ({ userData, setSubmitting }) => {
    return dispatch => {
        axios.post('http://localhost:4000/api/auth/signin', userData).then(
            ({ data }) => {
                dispatch(setToken(data.token));
                dispatch(setUsername(data.username));
            },
            ({ response })=>{
                dispatch(openAlert({
                    status: 'error',
                    msg: !response ? 'Server error occured' : response.data.message
                }));
                setSubmitting(false);
            }
        );
    }
}

export const signOut = history => {
    return dispatch => {
        dispatch(removeToken());
        history.push('/');
        dispatch(resetPosts());
    }
}

export const setToken = token => {
    return dispatch => {
            setAuthHeader(token);
            dispatch({
                type: SIGN_IN,
                token
            })
            localStorage.setItem('access-token', token);
        }
}

export const removeToken = () => {
    return dispatch => {
            setAuthHeader(false);
            dispatch({
                type: SIGN_OUT
            })
            localStorage.removeItem('access-token');
        }
}

export const setUsername = username => {
    return dispatch => {
            dispatch({
                type: SET_USERNAME,
                username
            })
        }
}