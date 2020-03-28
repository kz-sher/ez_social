import { OPEN_ALERT, CLOSE_ALERT } from '../actions/types';

const DEFAULT_STATE = {
    open: false,
    msg: '',
    status: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case OPEN_ALERT:
            return {...state, open: true, msg: action.msg, status: action.status}
        case CLOSE_ALERT:
            return {...state, open: false}
        default:
            return state;
    }
}