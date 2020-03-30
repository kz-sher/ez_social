import { SIGN_IN, SIGN_OUT, DATA_INITIALIZED, OAUTH_GOOGLE } from '../actions/types';

const DEFAULT_STATE = {
    isLoggedIn: false,
    isInitialized: false,
    token: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isLoggedIn: true, token: action.token}
        case SIGN_OUT:
            return {...state, isLoggedIn: false, token: ''}
        case DATA_INITIALIZED:
            return {...state, isLoggedIn: action.isLoggedIn, isInitialized: true}
        default:
            return state;
    }
}