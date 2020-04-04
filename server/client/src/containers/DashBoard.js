import React, { useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, incrementPageNum, togglePostModal } from '../actions/post.action';

import { Grid, CircularProgress, Slide, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
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
    },
    fab: {
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        [theme.breakpoints.down('sm')]:{
            bottom: '16px',
            right: '16px',
        }
    }
}));

const DashBoard = ({ 
    posts, 
    postLoading,
    postsLoading, 
    postsLoadingError, 
    hasMorePosts, 
    pageNum, 
    lastPostId,
    getPosts,
    incrementPageNum,
    togglePostModal
}) => {

    const classes = useStyles();

    const handleTogglePostModal = () => {
        togglePostModal(true)
    }

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
        <Grid className={classes.root} container item direction="column" justify="flex-start" alignItems="center" xs={12} sm={6} wrap="nowrap">
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
            <Fab className={classes.fab} color="primary" onClick={handleTogglePostModal}>
                <Add />
            </Fab>
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
    togglePostModal,
})(DashBoard);