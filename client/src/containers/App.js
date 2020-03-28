import React from 'react';
import { Switch, Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';
import axios from 'axios';

import '../styles/App.css';
import '../styles/grid.css';
import { Grid } from '@material-ui/core';

import NavBar from '../components/NavBar';
import GlobalAlert from '../components/GlobalAlert';
import Home from '../components/Home';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import NotFound from '../components/NotFound';
import AuthGuard from '../components/hocs/AuthGuard';

const history = createBrowserHistory();
const token = localStorage.getItem('access-token');
axios.defaults.headers.common['Authorization'] = token;

function App() {
  return (
    <Provider store={createStore(reducers, {
      auth:{
        isLoggedIn: token ? true : false,
        token: token
      }  
    }, applyMiddleware(reduxThunk))}>
      <Router history={history}>
        <div className="App">
          <NavBar />
          <Grid className="container" container justify="center" alignItems="flex-start">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={AuthGuard(true)(SignUp)} />
              <Route path="/signin" component={AuthGuard(true)(SignIn)} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
          <GlobalAlert />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
