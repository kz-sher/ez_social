import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from "query-string";
import * as actions from '../actions';
import SignIn from './SignIn';
import DashBoard from './DashBoard';

const Home = ({ isLoggedIn, location, history, signIn}) => {
    useEffect(() => {
        var query = queryString.parse(location.search);
        if (query.token) {
          signIn(query.token);
          history.push('/');
       }
    })

    return ( 
        isLoggedIn ? <DashBoard /> : <SignIn />
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
 
export default connect(mapStateToProps, actions)(Home);