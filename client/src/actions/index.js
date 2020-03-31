import { 
    OPEN_ALERT, 
    CLOSE_ALERT, 
    SIGN_IN, 
    SIGN_OUT, 
    DATA_INITIALIZED,
    DONE_LOADING
 } from './types'

/**
 * Action Creator -> Actions -> Dispatch -> Middlewares -> Reducers
 */
export const openAlert = ({msg, status}) => {
    return dispatch => {
            dispatch({
                type: OPEN_ALERT,
                msg,
                status
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