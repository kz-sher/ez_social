import React from 'react';
import { withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import '../grid.css';
import countries from '../../data/countries';
import { map, sortBy} from 'lodash';
import axios from 'axios'

import { Grid, Button, Typography, Divider, TextField, MenuItem, Snackbar, Icon, IconButton, InputAdornment, LinearProgress} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const InnerSignUpGrid = ({
    values,
    errors,
    touched,
    isSubmitting,
}) => {

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return ( 
        <>  
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
                                    endIcon={<Icon>send</Icon>}
                                    disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Grid>
                </Grid>
                <Snackbar
                  open={values.alert.open}
                  autoHideDuration={6000}
                  onClose={values.alert.handleClose}
                  >
                    <Alert onClose={values.alert.handleClose} severity={values.alert.type}>
                        {values.alert.msg}
                    </Alert>
                </Snackbar>
            </>
     );
}
const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        country: '',
        alert: {
            open: false,
            type: '',
            msg: '',
            handleClose: () => {}
        }
}

const SignUpGrid = withFormik({
    mapPropsToValues: () => {
        return initialValues
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().min(4).required(),
        password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
        country: Yup.string().required()
    }),
    handleSubmit: async (values, {resetForm, setFieldValue, setValues, setErrors, setSubmitting}) => {
        await axios.post('http://localhost:4000/api/signup', values).then(
                ({ data }) => { 
                    if(data.ACC_OK){
                        resetForm();
                        setValues({
                            ...initialValues,
                            alert: {
                                open: true,
                                type: 'success',
                                msg: 'Account created successfully!',
                                handleClose: () => {setFieldValue('alert.open', false)}
                            }
                        })
                    } 
                    else{
                        setErrors(data.formErrors);
                    }
                },
                ({ response }) => {
                    setValues({
                        ...values,
                        alert: {
                            open: true,
                            type: 'error',
                            msg: response.data.message,
                            handleClose: () => {setFieldValue('alert.open', false)}
                        }
                    })
                }
            );
        setSubmitting(false)
    }
})(InnerSignUpGrid);
 
export default SignUpGrid;