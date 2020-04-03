import React, { useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, incrementPageNum } from '../actions/post.action';

import { Grid, CircularProgress, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AddPostModal from '../components/AddPostModal';
import ListPosts from '../components/ListPosts';
import PostSkeleton from '../components/PostSkeleton';
import PostSkeletonWithCover from '../components/PostSkeletonWithCover';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    postLoading: {
        marginTop: '1.5em',
        marginBottom: '1.5em',
        [theme.breakpoints.down('md')]: {
            marginTop: '0.5em',
            marginBottom: '1em',
            width: '20px !important',
            height: '20px !important',
        },
    },
    alert: {
        margin: theme.spacing(2, 0)
    }
}));

const DashBoard = ({ 
    posts, 
    postLoading,
    postsLoading, 
    postsLoadingError, 
    hasMorePosts, 
    pageNum, 
    getPosts,
    incrementPageNum,
    lastPostId
}) => {

    const classes = useStyles();

    // Get all posts by page number
    useEffect(() => {
        getPosts(pageNum, lastPostId);
    }, [pageNum])

    // Set observer for viewing last post so that more posts will be loaded when it appears on screen
    // IntersectionObserver is used for checking whether the element is visible or not (on screen)
    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if(postsLoading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMorePosts){
                incrementPageNum()
            }
        });
        if(node) observer.current.observe(node)
    }, [postsLoading, hasMorePosts]);

    return ( 
        <Grid className={classes.root} container item direction="column" justify="flex-start" alignItems="center" xs={12} sm={12} wrap="nowrap">
            { postLoading &&
                <PostSkeletonWithCover />
            }
            { postsLoading &&
            <>
                <PostSkeleton key='postSke1' />
                <PostSkeleton key='postSke2' />
            </>
            }

            <ListPosts posts={ posts } ref={lastPostElementRef} /> 
            {hasMorePosts &&
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <CircularProgress className={classes.postLoading} /> 
                </Slide>
            }
            { !postsLoading && !hasMorePosts && !postsLoadingError &&
                <Alert className={classes.alert} variant="filled" severity="info">
                    No More Posts
                </Alert>
            }
            { postsLoadingError && 
                <Alert className={classes.alert} variant="filled" severity="error">
                    Server Error Occured
                </Alert> }
            <AddPostModal />
        </Grid>
     );
} 

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        postLoading: state.post.postLoading,
        postsLoading: state.post.postsLoading,
        postsLoadingError: state.post.postsLoadingError,
        hasMorePosts: state.post.hasMorePosts,
        pageNum: state.post.pageNum,
        lastPostId: state.post.lastPostId
    }
}

export default connect(mapStateToProps, { 
    getPosts,
    incrementPageNum,
})(DashBoard);