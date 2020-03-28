import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../styles/NavBar.css';

import { AppBar, Toolbar, Typography, Box, IconButton} from '@material-ui/core';
import { AccountCircle, ExitToApp, AddComment } from '@material-ui/icons';

const NavBar = ({ isLoggedIn, signOut}) => {
    let history = useHistory();
    
    const handleSignOut = () => {
        signOut();
        history.push('/');
    }

    return ( 
        <div className="navbar-container">
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        className="navbar-title"
                        variant="h6"
                        component={Link}
                        to="/">
                        <Box fontWeight={900}>
                            EZ FORUM
                        </Box>
                    </Typography>
                    {isLoggedIn && 
                        [<div className="navbar-icon" key="posts">
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleSignOut}>
                                <AddComment />
                            </IconButton>
                        </div>,
                        <div className="navbar-icon" key="account">
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleSignOut}>
                                <AccountCircle />
                            </IconButton>
                        </div>,
                        <div className="navbar-icon" key="logout">
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleSignOut}>
                                <ExitToApp />
                            </IconButton>
                        </div>]}
                </Toolbar>
            </AppBar>
        </div>
     );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
 
export default connect(mapStateToProps, actions)(NavBar);