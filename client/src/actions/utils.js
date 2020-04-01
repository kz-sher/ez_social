import { initDone, loadDone } from './init.action';
import axios from "axios";
import queryString from 'query-string';

// End initial loading animation effect 
export const endInitLoading = (dispatch) => {
    dispatch(loadDone());
    setTimeout(() => { dispatch(initDone()) }, 1000)
    console.log('[Render Process]: Initialization Done')
}

export const setAuthHeader = token => {
   if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
   } else {
      delete axios.defaults.headers.common["Authorization"];
   }
};

export const extractTokenFromURL = () => {
    var { query } = queryString.parseUrl(window.location.href);
    return query.token ? query.token : '';
}