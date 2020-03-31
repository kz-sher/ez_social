import React from 'react';
import { Link as RRDLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';

import { withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { Grid, Button, Typography, TextField, IconButton, InputAdornment, LinearProgress,Box} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

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
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

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
        
            <Grid className="main-container" container item direction="row" justify="center" alignItems="center" xs={12} sm={12} spacing={0}>
                <Box pt={6} pb={3}>
                    <Grid item xs={12} sm={12}>
                        <Form>
                            <Grid container item justify="center" alignItems="center" spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <Field
                                    type="input"
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    as={TextField} 
                                    error={!!touched.username && !!errors.username}
                                    helperText={!!touched.username && !!errors.username && errors.username}
                                    fullWidth/>
                                </Grid>
                            </Grid>
                            
                            <Grid container item justify="center" alignItems="center" spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <Field
                                    type={showPassword ? "text" : "password" }
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    as={TextField} 
                                    error={!!touched.password && !!errors.password}
                                    helperText={!!touched.password && !!errors.password && errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth/>
                                </Grid>
                            </Grid>

                            <Box pt={3}>
                                <Grid container item justify="center" alignItems="center" spacing={3}>
                                    <Grid item>
                                        <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={isSubmitting}>
                                            Log In
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">
                                            New User? 
                                        </Typography> 
                                        <span>&nbsp;</span>
                                        <Typography className="create-account-now-link" component={RRDLink} to="signup" variant="caption" color="primary">
                                            Create Account Now
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    </Grid>
                </Box>
            </Grid>
            <Grid container item justify="center" alignItems="center" xs={12}>
                <Box mt={3}>
                    <Typography variant="body2" color="textSecondary">or log in with</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box mt={3}>
                    <a className="social-media-link" href="/api/oauth/google">
                        <Button
                            size="large"
                            variant="contained"
                            fullWidth
                            color="secondary"
                            startIcon={<FontAwesomeIcon icon={faGoogle}/>}>
                                Google
                        </Button>
                    </a>
                </Box>
                <Box mt={3} mb={3}>
                    <Button
                        size="large"
                        variant="contained"
                        fullWidth
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faFacebook}/>}>
                            Facebook
                    </Button>
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
    handleSubmit: async (values, {props, setSubmitting}) => {
        const { setToken, openAlert } = props;
        await axios.post('http://localhost:4000/api/signin', values).then(
            ({ data }) => {
                setToken(data.token);
            },
            ({ response })=>{
                console.log(response)
                openAlert({
                    status: 'error',
                    msg: !response ? 'Server error occured' : response.data.message
                }) 
                setSubmitting(false)
            }
        );
    }
});

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        token: state.auth.token
    }
}
 
export default compose(
    connect(mapStateToProps, actions),
    FormikForSignIn
    )(SignIn);