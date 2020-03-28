import { OPEN_ALERT, CLOSE_ALERT, SIGN_IN, SIGN_OUT } from './types'

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

export const signIn = (token) => {
    return dispatch => {
            dispatch({
                type: SIGN_IN,
                token
            })
            localStorage.setItem('access-token', token);
        }
}

export const signOut = () => {
    return dispatch => {
            dispatch({
                type: SIGN_OUT,
            })
            localStorage.removeItem('access-token')
        }
}