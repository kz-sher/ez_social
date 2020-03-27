import React, { Component, isValidElement } from 'react'
import { Grid, Button, Typography, Divider, TextField, MenuItem, CircularProgress, InputAdornment } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckIcon from '@material-ui/icons/Check';
import '../grid.css';
import countries from '../../data/countries';
import { map, sortBy, isEqual} from 'lodash';
import axios from 'axios'
import {FieldCheck, validateInput} from '../../utils/signup.validation';

const initState = {
    username: '',
    password: '',
    confirmPassword: '',
    country: '',
    errors: {},
    isLoading: false,
    isFocused: false,

}

export default class SignUpGrid extends Component {

    constructor(props){
        super(props);
        this.state = initState

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    reset(){
        this.setState(initState);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFocus(e) {
        this.setState({ isFocused: true });
    }

    onBlur(e){
        console.log(e.target.name)
        let check = FieldCheck(this.state, e.target.value, e.target.name);
        let {errors, username} = this.state;
        this.setState({ 
            errors: {...this.state.errors, ...check},
            isFocused: false
        });

        // if((e.target.name === 'username') && ((typeof errors.username) === "undefined") && (username.length >= 4)){
        //     console.log((e.target.name === 'username') && ((typeof errors.username) === "undefined") && (username.length >= 4))
            
        //     axios.post('http://localhost:4000/api/users', { 'username': e.target.value }).then(
        //         (res) => { 
        //             console.log(res)
        //             this.setState({'usernameNotFound': res.data.flag })},
        //         ({response}) => { console.log(response.data.message)}
        //     );
        // }
        // else{
        //     this.setState({'usernameNotFound': undefined })
        // }
    }

    isValid(){
        const { errors, isValid } = validateInput(this.state);

        if(!isValid){
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        
        if(this.isValid()){
            console.log(true)
            this.setState({ errors: {}, isLoading: true });
            axios.post('http://localhost:4000/api/signup', this.state).then(
                () => { 
                    this.reset();
                    this.setState({ success: true });
                },
                ({ response }) => { this.setState({ errors: response.data}) }
            );
        }
    }

    render() {
        const { errors, isLoading, signInSuccess, isFocused, usernameNotFound} = this.state;
        const countryOptions = map(sortBy(countries), (val, key) =>
            <MenuItem key={key} value={val}>
                {val}
            </MenuItem>
        );
        return (
            <Grid className="wlc-container" container item direction="row" justify="center" alignItems="center" xs={11} sm={6} spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">Sign Up</Typography> 
                    <Typography variant="caption"> &nbsp; </Typography> 
                    <Divider variant="middle" />
                </Grid>
                {(signInSuccess) &&
                    <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}>
                        You have successfully created your account!
                    </Alert>}

                <Grid item xs={12}>
                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                  label="Username"
                                  error={errors.username? true: false}
                                  helperText={errors.username}
                                  name="username"
                                  value={this.state.username}
                                  onChange={this.onChange}
                                  onBlur={this.onBlur}
                                  onFocus={this.onFocus}
                                  fullWidth
                                  autoFocus
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {((!isFocused) && ((typeof errors.username) === "undefined") && ((typeof usernameNotFound) === "undefined")) && <CircularProgress size="1rem" />}
                                        {(!isFocused && usernameNotFound) && <CheckIcon />}
                                      </InputAdornment>
                                    )
                                  }} 
                                  />
                            </Grid>
                        </Grid>

                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                  label="Password"
                                  error={errors.password? true: false}
                                  helperText={errors.password}
                                  name="password"
                                  value={this.state.password}
                                  onChange={this.onChange}
                                  onBlur={this.onBlur}
                                  type="password"
                                  fullWidth />
                            </Grid>
                        </Grid>

                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                  label="Confirm Password"
                                  error={errors.confirmPassword? true: false}
                                  helperText={errors.confirmPassword}
                                  name="confirmPassword"
                                  value={this.state.confirmPassword}
                                  onChange={this.onChange}
                                  onBlur={this.onBlur}
                                  type="password"
                                  fullWidth />
                            </Grid>
                        </Grid>

                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                  label="Country"
                                  error={errors.country? true: false}
                                  helperText={errors.country}
                                  name="country"
                                  value={this.state.country}
                                  onChange={this.onChange}
                                  onBlur={this.onBlur}
                                  select
                                  fullWidth>
                                    {countryOptions}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container item justify="center" alignItems="center" spacing={3}>
                            <Grid item>
                                <Button disabled={isLoading} type="submit" variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        )
    }
}
