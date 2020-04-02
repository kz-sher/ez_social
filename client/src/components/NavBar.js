import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { togglePostModal } from '../actions/post.action';
import { signOut } from '../actions/auth.action';

import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Language, AccountCircle, ExitToApp, AddComment } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        textDecoration: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
    },
    spacer: {
        flexGrow: 1,
    },
    icon: {
        marginLeft: '0.5em',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '1em',    
        }
    }
}));

const NavBar = ({ isLoggedIn, signOut, togglePostModal}) => {
    const classes = useStyles();
    const history = useHistory();
    const handleSignOut = () => {
        signOut(history)
    }

    const handleTogglePostModal = () => {
        togglePostModal(true)
    }

    return ( 
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        component={Link}
                        to="/">
                            <Language />
                            <span> &nbsp;&nbsp; </span>
                            EZ SOCIAL
                    </Typography>
                    <div className={classes.spacer}></div>
                    {isLoggedIn &&
                        [<div className={classes.icon} key="posts">
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleTogglePostModal}>
                                <AddComment />
                            </IconButton>
                        </div>,
                        <div className={classes.icon} key="account">
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleSignOut}>
                                <AccountCircle />
                            </IconButton>
                        </div>,
                        <div className={classes.icon} key="logout">
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