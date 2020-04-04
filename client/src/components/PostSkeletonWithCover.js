import React from 'react';
import PostSkeleton from './PostSkeleton';
import { Backdrop, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cover: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 100,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        fontStyle: 'italic',
    },
    progress: {
        height: '10px',
        width: '60%',
        borderRadius: '4px',
    },
}));

function PostSkeletonWithCover() {
    const classes = useStyles();
    return (
            <PostSkeleton>
                <Backdrop className={classes.cover} open={true}>
                    <Typography className={classes.text} variant="h6">Uploading...</Typography>
                    <LinearProgress className={classes.progress}/>
                </Backdrop>
            </PostSkeleton>
    )
}

export default PostSkeletonWithCover;
