import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import GlobalAlert from './GlobalAlert';
import Home from './Home';
import SignUp from './SignUp';
import NotFound from './NotFound';
import AuthGuard from './hocs/AuthGuard';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function Main({ isInitialized, initDone, loadDone, openAlert, setToken, removeToken }) {
    
    const classes = useStyles();

    // To check whether user is logged in based on sending token to server
    useEffect(() => {

        async function verifyToken(){
          await axios.post('http://localhost:4000/vtoken').then(
            () => {
                setToken(localStorage.getItem('access-token'));
            },
            ({ response }) => {
                removeToken();
                // notify user if any message received 
                if(response.data.message){
                    openAlert({
                        status: 'error',
                        msg: response.data.message
                    })
                }
            });
            loadDone();
            setTimeout(() => { initDone() }, 1000)
            console.log('[Render Process]: Initialization Done')
        }

        setTimeout(() => { verifyToken(); }, 1200)

      }, []);

    return (
        <div className="main">
            {!isInitialized ?
                <Loading />
            : <>
                <NavBar />
                <Grid className={classes.root} container justify="center" alignItems="flex-start">
                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={AuthGuard("reverse")(SignUp)} />
                    <Route component={NotFound} />
                    </Switch>
                </Grid>
                <GlobalAlert />
            </>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    isInitialized: state.init.isInitialized
})
export default connect(mapStateToProps, actions)(Main);