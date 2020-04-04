import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signUp } from '../actions/auth.action';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GoogleLoginButton from '../components/GoogleLoginButton';
import FacebookLoginButton from '../components/FacebookLoginButton';
import SignUpForm from '../components/SignUpForm'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3em',
    },
    text: {
        marginTop: theme.spacing(3),
        textAlign: 'center',
    },
    socialBtnContainer: {
        marginTop: theme.spacing(3),
        width: '100%',
        '&:last-child': {
            marginBottom: theme.spacing(3)
        },
    }
}));

const SignUp = ({
    errors,
    touched,
    isSubmitting,
    setFieldValue
}) => {
    const classes = useStyles();

    return ( 
        <Grid className={classes.root} container item direction="column" justify="center" alignItems="center" xs={11} sm={6}>
            <SignUpForm errors={errors} touched={touched} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />
            <Grid item xs={12}>
                <Typography className={classes.text} variant="body2" color="textSecondary">or sign in with</Typography>
            </Grid>
            <Grid item className={classes.socialBtnContainer} xs={12} sm={6}>
                <GoogleLoginButton />
            </Grid>

            <Grid item className={classes.socialBtnContainer} xs={12} sm={6}>
                <FacebookLoginButton />
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