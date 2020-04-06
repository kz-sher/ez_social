import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/auth.action';
import SignIn from './SignIn';
import DashBoard from './DashBoard';

const Home = ({ isLoggedIn }) => {
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