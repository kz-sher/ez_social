import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';

import { withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { Grid, Button, Typography, Divider, TextField, Icon, IconButton, InputAdornment, LinearProgress} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

const SignIn = ({
    errors,
    touched,
    isSubmitting,
}) => {

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return ( 
            <Grid className="wlc-container" container item direction="row" justify="center" alignItems="center" xs={11} sm={6} spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">Sign In</Typography> 
                    <Typography variant="caption"> &nbsp; </Typography> 
                    <Divider variant="middle" />
                    {isSubmitting && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                    <Form>
                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} sm={7}>
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
                            <Grid item xs={12} sm={7}>
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

                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item>
                                <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                endIcon={<Icon>send</Icon>}
                                disabled={isSubmitting}>
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
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
    handleSubmit: async (values, {props, setErrors, setSubmitting}) => {
        const { signIn, openAlert, history } = props;
        await axios.post('http://localhost:4000/api/signin', values).then(
            ({ data }) => {
                signIn(data.token);
                history.push('/');
            },
            ({ response })=>{
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