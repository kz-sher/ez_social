import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signIn } from '../actions/auth.action';

import { withFormik} from 'formik';
import * as Yup from 'yup';
import { Grid,  Typography, LinearProgress, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GoogleLoginButton from '../components/GoogleLoginButton';
import FacebookLoginButton from '../components/FacebookLoginButton';
import SignInForm from '../components/SignInForm';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3em',
    },
}));

const SignIn = ({
    errors,
    touched,
    isSubmitting,
}) => {

    const classes = useStyles();

    return ( 
        <Grid className={classes.root} container item justify="center" alignItems="center" xs={11} sm={6} spacing={0}>
            <Grid item xs={10}>
                <Box textAlign="center" mb={3} fontWeight={600}>
                    <Typography variant="h4">Share Thoughts, Stay Connected!</Typography> 
                </Box>
            </Grid>
            
            <Grid item xs={12}>
                <Box textAlign="center" mb={5}>
                    <Typography variant="body1">join us now to meet people around the world without stepping out from your house</Typography> 
                </Box>
                <Box mb={0}>
                    {isSubmitting && <LinearProgress />}
                </Box>
            </Grid>

            <SignInForm errors={errors} touched={touched} isSubmitting={isSubmitting} />

            <Grid container item justify="center" alignItems="center" xs={12}>
                <Box mt={3}>
                    <Typography variant="body2" color="textSecondary">or log in with</Typography>
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
        password: ''
}

const FormikForSignIn = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
    }),
    handleSubmit: (values, {props, setSubmitting  }) => {
        const { signIn } = props;
        signIn({ userData: values, setSubmitting });
    }
});

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
 
export default compose(
    connect(mapStateToProps, { signIn }),
    FormikForSignIn
    )(SignIn);