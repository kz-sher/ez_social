import React from 'react';
import { withFormik, Form, Field, resetForm, setSubmitting, setNestedObjectValues} from 'formik';
import * as Yup from 'yup';
import '../grid.css';
import countries from '../../data/countries';
import { map, sortBy, isEqual} from 'lodash';
import axios from 'axios'

import { Grid, Button, Typography, Divider, TextField, MenuItem, CircularProgress, InputAdornment } from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckIcon from '@material-ui/icons/Check';

const InnerSignUpGrid = ({
    values,
    errors,
    touched,
    isSubmitting
}) => {
    return ( 
        <Grid className="wlc-container" container item direction="row" justify="center" alignItems="center" xs={11} sm={6} spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">Sign Up</Typography> 
                    <Typography variant="caption"> &nbsp; </Typography> 
                    <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} sm={7}>
                {(!!values.success) &&
                    <Alert severity="success" align="left">
                        <AlertTitle>Success</AlertTitle>
                        {values.success}
                    </Alert>}
                {(!!errors.internal) &&
                    <Alert severity="error" align="left">
                        <AlertTitle>Internal Error</AlertTitle>
                        {errors.internal}
                    </Alert>}
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
                                  type="password"
                                  name="password"
                                  label="Password"
                                  variant="outlined"
                                  as={TextField} 
                                  error={!!touched.password && !!errors.password}
                                  helperText={!!touched.password && !!errors.password && errors.password}
                                  fullWidth/>
                            </Grid>
                        </Grid>

                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Field
                                  type="password"
                                  name="confirmPassword"
                                  label="Password Confirmation"
                                  variant="outlined"
                                  as={TextField}
                                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                                  helperText={!!touched.confirmPassword && !!errors.confirmPassword && errors.confirmPassword} 
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

const SignUpGrid = withFormik({
    mapPropsToValues: () => {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            country: '',
            success: '',
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().min(4).required(),
        password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
        country: Yup.string().required()
    }),
    handleSubmit: async (values, {resetForm, setFieldValue, setErrors, setSubmitting}) => {
        await axios.post('http://localhost:4000/api/signup', values).then(
                ({ data }) => { 
                    console.log('asd')
                    if(data.ACC_OK){
                        resetForm();
                        setFieldValue('success', 'You have successfully created your account!');
                    } 
                    else{
                        setErrors(data.formErrors);
                    }
                },
                ({ response }) => {
                    setErrors({internal: response.data.message});
                }
            );
        setSubmitting(false);
    }
})(InnerSignUpGrid);
 
export default SignUpGrid;