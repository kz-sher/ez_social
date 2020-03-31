import { DATA_INITIALIZED, DONE_LOADING } from '../actions/types';

const DEFAULT_STATE = {
    isInitialized: false,
    isLoading: true
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case DATA_INITIALIZED:
            return {...state, isInitialized: true}
        case DONE_LOADING:
            return {...state, isLoading: false}
        default:
            return state;
    }
}