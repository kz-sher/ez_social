import React, { Component } from 'react';
import { connect } from 'react-redux';

const AuthGuard = (AuthDir) => (OriginalComponent) => {
    class OriginalComponentWithAuthGuard extends Component{
        
        checkAuth(){
            const { isLoggedIn, token, history } = this.props
            const authCheck = AuthDir !== 'reverse' ? !(isLoggedIn && token) : (isLoggedIn && token)
            if(authCheck){
                history.push('/')
            }
        }

        componentDidMount(){
            this.checkAuth();
        }

        componentDidUpdate(){
            this.checkAuth();
        }

        render(){
            return <OriginalComponent {...this.props} />
        }
    }
    
    const mapStateToProps = state => {
        return {
            isLoggedIn: state.auth.isLoggedIn,
            token: state.auth.token
        }
    }

    return connect(mapStateToProps ,null)(OriginalComponentWithAuthGuard);
}
 
export default AuthGuard;