import React from 'react';
import { Grid, Button, Typography, Divider } from '@material-ui/core';
import './grid.css';

import { Link } from 'react-router-dom';


const WelcomeGrid = () => {
    return ( 
        <Grid className="wlc-container" container item direction="row" justify="center" alignItems="center" xs={11} sm={6} spacing={3}>
            
            <Grid item xs={12} sm={12}>
                <Typography variant="h5">Share Thoughts, Know More!</Typography> 
                <Typography variant="caption">join us now to meet people around the world</Typography> 
                <Divider variant="middle" />
            </Grid>
            
            <Grid container item justify="center" alignItems="center" spacing={3}>
                <Grid item xs={10} sm={6}>
                    <Button component={Link} to="/signup" variant="contained" fullWidth>Sign Up</Button>
                </Grid>
            </Grid>

            <Grid container item justify="center" alignItems="center" spacing={3}>
                <Grid item xs={10} sm={6}>
                    <Button component={Link} to="/signin" variant="contained" fullWidth>Sign In</Button>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="caption">Lazy to create? Dummy Account</Typography> 
            </Grid>

        </Grid>
     );
}
 
export default WelcomeGrid;