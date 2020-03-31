import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import '../styles/App.css';

import reducers from '../reducers';
import Main from '../components/Main';

const history = createBrowserHistory();
const token = localStorage.getItem('access-token');
axios.defaults.headers.common['Authorization'] = "Bearer " + (!token ? '' : token);

function App() {
  return (
    <Provider store={createStore(reducers, {
      auth:{
        isInitialized: false,
        token: token
      }  
    }, applyMiddleware(reduxThunk))}>
      <Router history={history}>
        <Main />
      </Router>
    </Provider>
  );
}

export default App;
