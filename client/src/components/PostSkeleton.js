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
      [theme.breakpoints.down('')]: {
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
        marginTop: '8px'
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
                avatar={
                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                }
                title={<Skeleton animation="wave" height={20} width="40%" />}
                subheader={<Skeleton animation="wave" height={20} width="60%" />}
                // action={
                //     <div className={classes.moreVert}>
                //         <Skeleton className={classes.moreVertDot} animation="wave" variant="circle" width={10} height={10} />
                //         <Skeleton className={classes.moreVertDot} animation="wave" variant="circle" width={10} height={10} />
                //         <Skeleton className={classes.moreVertDot} animation="wave" variant="circle" width={10} height={10} />
                //     </div>
                // }
                />
                <Skeleton animation="wave" className={classes.media} variant="rect" width="100%" height="100%" />
                <CardActions disableSpacing>
                    <Skeleton animation="wave" className={classes.actionButton} variant="circle" width={40} height={40} />
                    {/* <Skeleton animation="wave" className={classes.actionButton} variant="circle" width={40} height={40} /> */}
                    <Skeleton animation="wave" className={classes.expand} variant="circle" width={40} height={40} />
                </CardActions>
                <CardContent>  
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={20} width="80%" />
                </CardContent>
            </Card>
          </Grid>
            
    )
}

export default PostSkeleton
