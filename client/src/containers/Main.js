import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { getUserInitType } from '../actions/auth.action';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import NavBar from '../components/NavBar';
import GlobalAlert from '../components/GlobalAlert';
import Home from './Home';
import SignUp from './SignUp';
import NotFound from './NotFound';
import AuthGuard from '../components/hocs/AuthGuard';
import Loading from '../components/Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function Main({ isInitialized, getUserInitType }) {
    
    useEffect(() => {
        // To check whether user is logged in or not
        getUserInitType();
    }, [])
    const classes = useStyles();

    return (
        <div className="main">
            {!isInitialized ?
                <Loading />
            : <>
                <NavBar />
                <Grid className={classes.root} container justify="center" alignItems="flex-start">
                    <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/test" component={NotFound} />
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
export default connect(mapStateToProps, { getUserInitType })(Main);