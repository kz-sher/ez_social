import { OPEN_ALERT, CLOSE_ALERT } from './types';

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