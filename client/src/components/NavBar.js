import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { togglePostModal } from '../actions/post.action';
import { signOut } from '../actions/auth.action';

import { AppBar, Toolbar, Typography, Box, IconButton } from '@material-ui/core';
import { Language, AccountCircle, ExitToApp, AddComment } from '@material-ui/icons';

const NavBar = ({ isLoggedIn, signOut, togglePostModal}) => {
    const history = useHistory();
    const handleSignOut = () => {
        signOut(history)
    }

    const handleTogglePostModal = () => {
        togglePostModal(true)
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
                                onClick={handleTogglePostModal}>
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
 
export default connect(mapStateToProps, { 
    togglePostModal, signOut
})(NavBar);