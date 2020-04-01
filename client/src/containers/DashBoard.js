import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/post.action';

// import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import AddPostModal from '../components/AddPostModal';
import ListPosts from '../components/ListPosts';

const DashBoard = ({ posts, getPosts }) => {

    useEffect(() => {
        // Get all posts
        getPosts();
    }, [])

    return ( 
        <Grid container item direction="column" justify="flex-start" alignItems="center" xs={12} sm={12}>
            <AddPostModal />
            <ListPosts posts={ posts } />
        </Grid>
     );
} 

const mapStateToProps = state => {
    return {
        posts: state.post.posts
    }
}

export default connect(mapStateToProps, { getPosts })(DashBoard);