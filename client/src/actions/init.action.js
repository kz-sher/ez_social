import { DATA_INITIALIZED, DONE_LOADING } from './types';

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