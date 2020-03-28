import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography, Divider, Box } from '@material-ui/core';

const NotFound = () => {
    const bull = <span> • </span>;
    return ( 
        <Grid className="wlc-container" container item direction="row" justify="center" alignItems="center" xs={11} sm={6} spacing={3}>
            
            <Grid item xs={12} sm={12}>
                <Typography variant="h3"> 
                    <Box fontWeight={400}>
                        &lt; 4{bull}0{bull}4 &gt; 
                    </Box>
                </Typography> 
                <Typography variant="caption"> Page Not Found </Typography> 
                <Divider variant="middle" />
            </Grid>

            <Grid container item justify="center" alignItems="center" spacing={3}>
                <Grid item>
                    <Typography variant="body1">
                        Sorry, this content isn't available right now.
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Button component={Link} to="/" size="large" variant="contained">Back</Button>
            </Grid>

        </Grid>
     );
}
 
export default NotFound;