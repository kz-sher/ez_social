
import React from 'react';
import { connect } from 'react-redux';
import { closeAlert } from '../actions/alert.action';

import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      zIndex: 1000
    }
}));

const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 const GlobalAlert = ({ alertOpen, msg, status, closeAlert}) => {
    const classes = useStyles();
    return (
        <Snackbar
            className={classes.alert}
            open={alertOpen}
            autoHideDuration={6000}
            onClose={closeAlert}>
            <Alert variant="filled" onClose={closeAlert} severity={status}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

const mapStateToProps = state => {
    return {
        alertOpen: state.alert.alertOpen,
        msg: state.alert.msg,
        status: state.alert.status
    }
}

export default connect(mapStateToProps, { closeAlert })(GlobalAlert);

