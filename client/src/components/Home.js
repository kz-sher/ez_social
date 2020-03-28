import React from 'react';
import { connect } from 'react-redux';
import Welcome from './Welcome';
import DashBoard from './DashBoard';

const Home = ({ isLoggedIn }) => {
    return ( 
        isLoggedIn ? <DashBoard /> : <Welcome />
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
 
export default connect(mapStateToProps, null)(Home);