import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';
import initReducer from './init';
import postReducer from './post';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    init: initReducer,
    post: postReducer
});