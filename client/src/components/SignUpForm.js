import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'formik';
import countries from '../data/countries.json';

import { Grid, Button, Typography, Divider, TextField, IconButton, InputAdornment, LinearProgress} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        paddingBottom: theme.spacing(2),
    },
    title:{
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: theme.spacing(1),
        textAlign: 'justify',
        [theme.breakpoints.up('sm')]:{
            textAlign: 'center',
        }
    },
    loading: {
        width: '100%',
        borderRadius: '3px 3px 0 0',
        overflow: 'hidden',
    },
    form: {
        paddingTop: theme.spacing(2),
        width: '100%',
    },
    loginLink: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
}));

function SignUpForm({ errors, touched, isSubmitting, setFieldValue}) {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [country, setCountry] = useState(null)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleCountryChange = (e, newCountry) => {
        setCountry(newCountry);
        setFieldValue('country', newCountry?newCountry.name:'');
    }

    return (
        <Grid className={classes.root} container item direction="row" justify="center" alignItems="center" xs={12} sm={12} spacing={3}>
            
            <div className={classes.loading}>{isSubmitting && <LinearProgress />}</div>
            
            <Grid className={classes.titleSection} item xs={11}>
                <div className={classes.title}>
                    <Typography variant="h5">Account Creation Form</Typography>
                </div>
                <div className={classes.subtitle}>
                    <Typography variant="caption">Please enter the following details based on the instruction</Typography>
                </div>
                <Divider variant="fullWidth" />
            </Grid>
            
            <Form className={classes.form}>
                <Grid container item justify="center" alignItems="center" spacing={2}>
                    <Grid item xs={11} sm={7}>
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

                    <Grid item xs={11} sm={7}>
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
            
                    <Grid item xs={11} sm={7}>
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
                
                    <Grid item xs={11} sm={7}>
                        <Autocomplete
                            id="country-select-demo"
                            style={{ width: '100%' }}
                            options={countries}
                            getOptionLabel={(option) => option.name}
                            classes={{ option: classes.option }}
                            value={country}
                            onChange={handleCountryChange}
                            autoHighlight
                            autoSelect
                            openOnFocus
                            renderInput={(params) => (
                                <Field  
                                {...params}
                                name='country'
                                label='Country'
                                variant="outlined" 
                                onChange={()=>{}}
                                onBlur={()=>{}}
                                error={!!touched.country && !!errors.country}
                                helperText={!!touched.country && !!errors.country && errors.country}
                                as={TextField}
                                />)}
                            />
                    </Grid>

                    <Grid container item justify="space-between" alignItems="center" xs={11} sm={7}>
                        <Grid item>
                            <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Grid>

                        <Grid item>
                            <Typography variant="caption">
                                Already Registered? 
                            </Typography> 
                            <span>&nbsp;</span>
                            <Typography className={classes.loginLink} component={Link} to="/" variant="caption" color="primary">
                                Log In Now
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        </Grid>
    )
}

export default SignUpForm
