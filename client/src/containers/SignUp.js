import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
    handleSubmit: async (values, {props, resetForm, setErrors, setSubmitting}) => {
        const openAlert = props.openAlert;
        await axios.post('http://localhost:4000/api/auth/signup', values).then(
                ({ data }) => { 
                    if(data.ACC_OK){
                        resetForm();
                        openAlert({
                            status: 'success',
                            msg: data.message
                        })
                    } 
                    else{
                        setErrors(data.formErrors);
                    }
                },
                ({ response }) => {
                    openAlert({
                        status: 'error',
                        msg: !response ? 'Server error occured' : response.data.message
                    })   
                }
            );
        setSubmitting(false)
    }
});
 
export default compose(
    connect(null, actions),
    FormikForSignUp,
    )(SignUp);