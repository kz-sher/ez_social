
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 const GlobalAlert = ({ open, msg, status, closeAlert}) => {
    return (
        <Snackbar
            open={open}
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
        open: state.alert.open,
        msg: state.alert.msg,
        status: state.alert.status
    }
}

export default connect(mapStateToProps, actions)(GlobalAlert);

