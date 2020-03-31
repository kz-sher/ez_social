import React from 'react';
import Lottie from "react-lottie";
import { connect } from 'react-redux';
import { Grid, Box, Backdrop, Typography, Fade } from '@material-ui/core';

import * as legoData from "../animations/lego-loading.json";
import * as doneData from "../animations/done-loading.json";

const legoLoadingOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const doneLoadingOptions = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
  
const Loading = ({ isLoading }) => {
    return ( 
        <Fade in={true} timeout={1200}>
            <Grid className="init-loader-container" container justify="center" alignItems="center">
                <Backdrop className="init-loader" open={true}>
                    <Grid className=" it-loader-container" item xs={10} sm={3}>
                        <Box mb={2} fontStyle="italic" fontWeight={500} textAlign="center">
                        { isLoading ? (
                            <>
                            <Lottie options={legoLoadingOptions} height={120} width={120} />
                            <Typography variant="h6">Loading...</Typography>
                            </>
                        ) : (
                            <>
                            <Lottie options={doneLoadingOptions} height={120} width={120} />
                            <Typography variant="h6">Done ^.^</Typography>
                            </>
                        )}
                        </Box>
                    </Grid>
                </Backdrop>
            </Grid>
        </Fade>
     );
}

const mapStateToProps = state => ({
    isLoading: state.init.isLoading
})

export default connect(mapStateToProps, null)(Loading);