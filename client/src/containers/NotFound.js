import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Emoji from '../images/emoji.png';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 400,
        fontSize: '70px',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'left',
        }
    },
    bull: {
        fontSize: '50px'
    },
    body: {
        margin: theme.spacing(0.5, 0, 2),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'left',
        }
    },
  }));

const NotFound = () => {
    const classes = useStyles();
    const bull = <span className={classes.bull}> • </span>;
    return ( 
        <Grid container item direction="row-reverse" justify="space-between" alignItems="center" xs={11} sm={6} spacing={3}>
            
            <Grid container item justify="center" sm={6}>
                <img src={Emoji} width='90%' height='90%'/>
            </Grid>

            <Grid container item justify="center" sm={6}>
                <Grid item xs={8} sm={12}>
                    <Typography className={classes.title} variant="h3"> 
                            4{bull}0{bull}4
                    </Typography> 
                    <Typography variant="caption"> Page Not Found </Typography> 
                    <Divider variant="fullWidth" />
                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.body} variant="body1">
                        Sorry, this content isn't available right now.
                    </Typography>
                </Grid>

                <Grid item sm={12}>
                    <Button component={Link} to="/" size="large" variant="contained">Back</Button>
                </Grid>
            </Grid>

        </Grid>
     );
}
 
export default NotFound;