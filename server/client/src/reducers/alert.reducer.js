import { OPEN_ALERT, CLOSE_ALERT } from '../actions/types';

const DEFAULT_STATE = {
    alertOpen: false,
    msg: '',
    status: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case OPEN_ALERT:
            return {...state, alertOpen: true, msg: action.msg, status: action.status}
        case CLOSE_ALERT:
            return {...state, alertOpen: false}
        default:
            return state;
    }
}