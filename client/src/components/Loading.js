import React from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

const Loading = ({ isInitialized }) => {
    return ( 
        <>  
            {!isInitialized && 
                <Grid className="init-loader-container" container justify="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            }
        </>
     );
}
 
const mapStateToProps = state => ({
    isInitialized: state.auth.isInitialized
})
export default connect(mapStateToProps, null)(Loading);