import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid } from '@material-ui/core';

import NavBar from '../components/NavBar';
import GlobalAlert from '../components/GlobalAlert';
import Home from '../components/Home';
import SignUp from '../components/SignUp';
import NotFound from '../components/NotFound';
import AuthGuard from '../components/hocs/AuthGuard';

function Main({ isInitialized, setInitUserType, openAlert }) {
    
    // To check whether user is logged in based on sending token to server
    useEffect(() => {
        async function verifyToken(){
          await axios.post('http://localhost:4000/vtoken').then(
            () => {
                setInitUserType(true);
            },
            ({ response }) => {
                setInitUserType(false);

                // notify user if any message received 
                if(response.data.message){
                    openAlert({
                        status: 'error',
                        msg: response.data.message
                    })
                }
            }
          );
          console.log('[Render Process]: Initialization Done')
        }
        verifyToken();
      }, []);

    return (
        <>
            {isInitialized &&
                <>
                    <NavBar />
                    <Grid className="container" container justify="center" alignItems="flex-start">
                        <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={AuthGuard("reverse")(SignUp)} />
                        <Route component={NotFound} />
                        </Switch>
                    </Grid>
                    <GlobalAlert />
                </>
            }
        </>
    )
}

const mapStateToProps = state => ({
    isInitialized: state.auth.isInitialized
})
export default connect(mapStateToProps, actions)(Main);