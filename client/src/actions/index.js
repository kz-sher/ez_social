import { 
    OPEN_ALERT, 
    CLOSE_ALERT, 
    SIGN_IN, 
    SIGN_OUT, 
    DATA_INITIALIZED,
    DONE_LOADING,
    OPEN_POST_MODAL,
    CLOSE_POST_MODAL,
    GET_POSTS,
    ADD_NEW_POST
 } from './types'

/**
 * Action Creator -> Actions -> Dispatch -> Middlewares -> Reducers
 */
export const openAlert = (payload) => {
    return dispatch => {
            dispatch({
                type: OPEN_ALERT,
                ...payload
            })
        }
}

export const closeAlert = () => {
    return dispatch => {
            dispatch({
                type: CLOSE_ALERT
            })
        }
}

export const setToken = token => {
    return dispatch => {
            dispatch({
                type: SIGN_IN,
                token
            })
            localStorage.setItem('access-token', token);
        }
}

export const removeToken = () => {
    return dispatch => {
            dispatch({
                type: SIGN_OUT
            })
            localStorage.removeItem('access-token')
        }
}

export const initDone = () => {
    return dispatch => {
            dispatch({
                type: DATA_INITIALIZED
            })
        }
}

export const loadDone = () => {
    return dispatch => {
            dispatch({
                type: DONE_LOADING
            })
        }
}

export const setPostModalDisplay = (open=false) => {
    return dispatch => {
            dispatch({
                type: open ? OPEN_POST_MODAL : CLOSE_POST_MODAL
            })
        }
}

export const getPosts = posts => {
    return dispatch => {
            dispatch({
                type: GET_POSTS,
                posts
            })
        }
}

export const addNewPost = post => {
    return dispatch => {
            dispatch({
                type: ADD_NEW_POST,
                post
            })
        }
}