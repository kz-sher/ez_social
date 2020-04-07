import React from 'react'

import {
    Grid, Card,
    CardHeader, CardContent,
    CardActions,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: '3em',
      [theme.breakpoints.down('sm')]: {
        marginTop: '0.5em',
      },
      '&:last-child':{
        marginBottom: '3em',
        [theme.breakpoints.down('sm')]: {
          marginBottom: '0.5em',
        }
      },
    },
    moreVert:{
        marginTop: '8px',
        marginRight: '10px'
    },
    moreVertDot:{
        marginTop: '2px'
    },
    actionButton: {
        marginRight: '10px'
    },
    expand: {
        marginLeft: 'auto',
    },
    card: {
        maxWidth: '100%',
        border: "none",
        overflow: 'hidden',
        position: 'relative',
    },
    media: {
        height: 0,
        paddingTop: '75%',
    },
  }));
  
function PostSkeleton(props) {
    const classes = useStyles();
    return (
        <Grid className={classes.root} item xs={12}>
            <Card className={classes.card} variant="outlined">
                {props.children? props.children:''}
                <CardHeader
                title={<Skeleton animation="wave" height={20} width="20%" />}
                />
                <Skeleton animation="wave" className={classes.media} variant="rect" width="100%" height="100%" />
                <CardActions>
                    <Skeleton animation="wave" height={20} width="20%" />
                </CardActions>
                <CardContent>
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={90} width="25%" />
                </CardContent>
            </Card>
          </Grid>
            
    )
}

export default PostSkeleton
