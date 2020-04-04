import { SIGN_IN, SIGN_OUT, SET_USERNAME } from '../actions/types';

const DEFAULT_STATE = {
    isLoggedIn: false,
    token: '',
    username: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isLoggedIn: true, token: action.token}
        case SIGN_OUT:
            return {...state, isLoggedIn: false, token: ''}
        case SET_USERNAME:
            return {...state, username: action.username}
        default:
            return state;
    }
}