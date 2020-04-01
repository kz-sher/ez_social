
import React from 'react';
import { connect } from 'react-redux';
import { closeAlert } from '../actions/alert.action';

import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 const GlobalAlert = ({ alertOpen, msg, status, closeAlert}) => {
    return (
        <Snackbar
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

