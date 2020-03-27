import React, { Component } from 'react'
import { Grid, Button, Typography, Divider, TextField} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import '../grid.css';

export default class SignInGrid extends Component {
    render() {
        return (
            <Grid className="wlc-container" container item direction="row" justify="center" alignItems="center" xs={11} sm={6} spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">Sign In</Typography> 
                    <Typography variant="caption"> &nbsp; </Typography> 
                    <Divider variant="middle" />
                </Grid>
                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Standard" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <Grid container spacing={1} justify="center" alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="With a grid" />
                        </Grid>
                    </Grid>
                </form>
                <Grid item xs={12}>
                    <Typography variant="caption">Lazy to create? Dummy Account</Typography> 
                </Grid>
            </Grid>
        )
    }
}
