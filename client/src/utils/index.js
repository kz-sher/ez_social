import { initDone, loadDone } from '../actions/init.action';
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

export const getFormattedDate = (date) => {
   const datetimeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
   return new Date(Date.parse(date)).toLocaleDateString('en-US', datetimeOptions)
 }