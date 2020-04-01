import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signUp } from '../actions/auth.action';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GoogleLoginButton from '../components/GoogleLoginButton';
import FacebookLoginButton from '../components/FacebookLoginButton';
import SignUpForm from '../components/SignUpForm'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3em',
    }
}));

const SignUp = ({
    errors,
    touched,
    isSubmitting,
}) => {
    const classes = useStyles();

    return ( 
        <Grid className={classes.root} container item justify="center" alignItems="center" xs={11} sm={6} spacing={0}>
            <SignUpForm errors={errors} touched={touched} isSubmitting={isSubmitting} />
            <Grid container item justify="center" alignItems="center" xs={12}>
                <Box mt={3}>
                    <Typography variant="body2" color="textSecondary">or sign up with</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box mt={3}>
                    <GoogleLoginButton />
                </Box>
                <Box mt={3} mb={3}>
                    <FacebookLoginButton />
                </Box>
            </Grid>
        </Grid>
     );
}

const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        country: '',
}

const FormikForSignUp = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(4).required(),
        password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
        country: Yup.string().required()
    }),
    handleSubmit: (values, { props, setErrors, setSubmitting}) => {
        const { signUp } = props;
        const { history } = props;
        signUp({ userData: values, history, setErrors, setSubmitting});
    }
});
 
export default compose(
    connect(null, { signUp }),
    FormikForSignUp,
    )(SignUp);