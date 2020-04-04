import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';
import initReducer from './init.reducer';
import postReducer from './post.reducer';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    init: initReducer,
    post: postReducer
});