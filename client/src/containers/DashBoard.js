import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import axios from 'axios'

import { Skeleton } from '@material-ui/lab';
import { Grid, Fade } from '@material-ui/core';
import AddPostModal from '../components/AddPostModal';
import ListPosts from '../components/ListPosts';
import Post from '../components/Post';


const getPostsWithAct = async (setStorePosts) => {
    await axios.get('http://localhost:4000/api/post/').then(
        ({ data }) => {
            setStorePosts(data)
        },
        ({ response }) => {
            console.log("response from 400 getposts");
            console.log(response)
        });
}

const DashBoard = ({ postsData, getPosts }) => {
    useEffect(() => {
        getPostsWithAct(getPosts);
    }, [])
    return ( 
        <Grid container item direction="column" justify="flex-start" alignItems="center" xs={12} sm={12}>
            <AddPostModal open={true}/>
            <ListPosts postsData={ postsData } />
        </Grid>
     );
} 

const mapStateToProps = state => {
    return {
        postsData: state.post.posts
    }
}

export default connect(mapStateToProps, actions)(DashBoard);