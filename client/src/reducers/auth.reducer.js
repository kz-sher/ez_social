import { SIGN_IN, SIGN_OUT } from '../actions/types';

const DEFAULT_STATE = {
    isLoggedIn: false,
    token: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isLoggedIn: true, token: action.token}
        case SIGN_OUT:
            return {...state, isLoggedIn: false, token: ''}
        default:
            return state;
    }
}