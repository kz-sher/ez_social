import React from 'react';
import { Grid, Button, Typography, Divider, Card, CardContent, CardActions } from '@material-ui/core';

const DashBoard = () => {
    const bull = <span>•</span>;
    return ( 
        <Grid container item direction="row" justify="center" alignItems="center" xs={12} sm={6} spacing={3}>
            
            <Grid item xs={12} sm={12}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                        <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
     );
}
 
export default DashBoard;