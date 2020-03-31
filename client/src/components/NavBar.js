import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { AppBar, Toolbar, Typography, Box, IconButton } from '@material-ui/core';
import { Language, AccountCircle, ExitToApp, AddComment } from '@material-ui/icons';

const NavBar = ({ isLoggedIn, removeToken, setPostModalDisplay}) => {
    let history = useHistory();
    const handleSignOut = () => {
        removeToken();
        history.push('/');
    }

    return ( 
        <div className="navbar-container">
            <AppBar position="static">
                <Toolbar>
                    <Language />
                    <span> &nbsp;&nbsp; </span>
                    <Typography
                        className="navbar-title"
                        variant="h6"
                        component={Link}
                        to="/">
                        <Box fontWeight={900}>
                            EZ SOCIAL
                        </Box>
                    </Typography>
                    {isLoggedIn &&
                        [<div className="navbar-icon" key="posts">
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={setPostModalDisplay}>
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
                        </div>]
                    }
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