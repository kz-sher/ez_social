import React, { useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, incrementPageNum } from '../actions/post.action';

import { Skeleton } from '@material-ui/lab';
import { Grid, CircularProgress, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddPostModal from '../components/AddPostModal';
import ListPosts from '../components/ListPosts';
import PostSkeleton from '../components/PostSkeleton';

const useStyles = makeStyles((theme) => ({
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
}));

const DashBoard = ({ 
    posts, 
    postsLoading, 
    postsLoadingError, 
    hasMorePosts, 
    pageNum, 
    getPosts,
    incrementPageNum,
}) => {

    const classes = useStyles();

    // Get all posts by page number
    useEffect(() => {
        getPosts(pageNum);
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
        <Grid container item direction="column" justify="flex-start" alignItems="center" xs={12} sm={12}>
            { postsLoading &&
            <>
                <PostSkeleton />
                <PostSkeleton />
            </>
            }

            <ListPosts posts={ posts } ref={lastPostElementRef} /> 
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <CircularProgress className={classes.postLoading} /> 
            </Slide>
            { postsLoadingError && <div> Error Occured </div> }
            <AddPostModal />
        </Grid>
     );
} 

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        postsLoading: state.post.postsLoading,
        postsLoadingError: state.post.postsLoadingError,
        hasMorePosts: state.post.hasMorePosts,
        pageNum: state.post.pageNum,
    }
}

export default connect(mapStateToProps, { 
    getPosts,
    incrementPageNum,
})(DashBoard);