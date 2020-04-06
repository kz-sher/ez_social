import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { signIn } from '../actions/auth.action';

import { withFormik} from 'formik';
import * as Yup from 'yup';
import { Grid,  Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GoogleLoginButton from '../components/GoogleLoginButton';
import FacebookLoginButton from '../components/FacebookLoginButton';
import SignInForm from '../components/SignInForm';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 0,
        paddingTop: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            marginTop: 'auto',
            paddingTop: theme.spacing(3),
        }
    },
    title: {
        marginBottom: theme.spacing(3),  
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: theme.spacing(5),
        textAlign: 'center',
    },
    text: {
        marginTop: theme.spacing(2),
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

const SignIn = ({
    errors,
    touched,
    isSubmitting,
}) => {

    const classes = useStyles();

    return ( 
        <Grid className={classes.root} container item direction="column" justify="center" alignItems="center" xs={11} sm={6}>
            <Grid item xs={10} sm={12}>
                <Typography className={classes.title} variant="h4">Share Thoughts, Stay Connected!</Typography> 
            </Grid>

            <Grid item xs={12}>
                <Typography className={classes.subtitle} variant="body1">join us now to meet people around the world without stepping out from your house</Typography>
                {/* {!isSubmitting && <LinearProgress />} */}
            </Grid>

            <SignInForm errors={errors} touched={touched} isSubmitting={isSubmitting} />

            <Grid item xs={12}>
                <Typography className={classes.text} variant="body2" color="textSecondary">or log in with</Typography>
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