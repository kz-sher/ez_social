import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import history from '../history'

import reducers from '../reducers';
import Main from './Main';

function App() {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
      <Router history={history}>
        <Main />
      </Router>
    </Provider>
  );
}

export default App;
