import React from 'react'
import { Link } from 'react-router-dom';

import { Form, Field } from 'formik';
import { Grid, Button, Typography, TextField, IconButton, InputAdornment, Box} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
    },
}));

function SignInForm({ errors, touched, isSubmitting }) {
    
    const classes = useStyles();
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Grid className={classes.root} container item direction="row" justify="center" alignItems="center" xs={12} sm={12} spacing={0}>
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
                                    <Typography className="create-account-now-link" component={Link} to="signup" variant="caption" color="primary">
                                        Create Account Now
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </Grid>
            </Box>
        </Grid>
    )
}

export default SignInForm
