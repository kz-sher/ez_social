import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';

import NavBar from './components/NavBar';
import WelcomeGrid from './components/WelcomeGrid';
import SignUpGrid from './components/signup/SignUpGrid';
import SignInGrid from './components/signin/SignInGrid';

import { Switch, Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <NavBar />
        <Grid className="container" container justify="center" alignItems="flex-start">
          <Switch>
            <Route exact path="/" component={WelcomeGrid} />
            <Route path="/signup" component={SignUpGrid} />
            <Route path="/signin" component={SignInGrid} />
          </Switch>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
