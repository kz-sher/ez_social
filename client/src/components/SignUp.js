import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';

import countries from '../data/countries';

import { withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { map, sortBy} from 'lodash';
import axios from 'axios';

import { Grid, Button, Typography, Divider, TextField, MenuItem, Icon, IconButton, InputAdornment, LinearProgress} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

const SignUp = ({
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
                    <Typography variant="h5">Sign Up</Typography> 
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
                            <Grid item xs={12} sm={7}>
                                <Field
                                type={showPassword ? "text" : "password" }
                                name="confirmPassword"
                                label="Password Confirmation"
                                variant="outlined"
                                as={TextField}
                                error={!!touched.confirmPassword && !!errors.confirmPassword}
                                helperText={!!touched.confirmPassword && !!errors.confirmPassword && errors.confirmPassword} 
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
                            <Grid item xs={12} sm={7}>
                                <Field
                                select
                                name="country"
                                label="Country"
                                variant="outlined"
                                as={TextField}    
                                error={!!touched.country && !!errors.country}
                                helperText={!!touched.country && !!errors.country && errors.country}                 
                                fullWidth>
                                    <MenuItem value='' disabled selected>
                                        Choose your country
                                    </MenuItem>
                                    {map(sortBy(countries), (val, key) =>
                                        <MenuItem key={key} value={val}>
                                            {val}
                                        </MenuItem>)}
                                </Field>
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
                                    Submit
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
        await axios.post('http://localhost:4000/api/signup', values).then(
                ({ data }) => { 
                    if(data.ACC_OK){
                        resetForm();
                        openAlert({
                            status: 'success',
                            msg: 'Account created successfully!'
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