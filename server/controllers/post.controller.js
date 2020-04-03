const Post = require('../models/post.model')
const { postValidator } = require('../services/post.service');
const { formatYupError } = require('../utils/error.helper');
const { isEmpty } = require('lodash');

function getPostsForUser(req, res){
    const name = req.user[req.user.method].displayName
    Post.find({ author: name })
        .then(posts => res.status(200).json(posts))
        .catch(err =>
            res.status(400).json({ message: "['S1']: Error fetching posts" })
        );
}

function getAllPosts(req, res){
    const pageNum = req.query.pageNum;
    const nPerPage = req.query.nPerPage;
    const postId = req.query.postId;
    
    setTimeout(() => {
        if(postId == -1){
            // To get latest posts
            Post.find()
                .limit(10)
                .sort({ '$natural': -1 })
                .skip(  ( pageNum - 1 ) * nPerPage )
                .then(posts => {
                    // get the 10th post which is the earliest post out of all
                    const postId = !isEmpty(posts) ? posts[posts.length - 1].post_id: 0
                    res.status(200).json({ posts, postId: 0 })
                })
                .catch(err => res.status(400).json({ message: "['A11']: Error fetching posts" }))
        } 
        else{
            // To continue getting older posts from the last recent post he/she read
            if(postId > 0){
                Post.find({ 'post_id':{'$lt': postId, '$gte': postId - 10 }})
                    .sort({ '$natural': -1 })
                    .then(posts => res.status(200).json({ posts, postId: postId - 10 }))
                    .catch(err => res.status(400).json({ message: "['A12']: Error fetching posts" }))
            }
            else{
                res.status(200).json({ posts: [] });
            }
        }
    }, 1000)
}

async function createPost(req, res){
    console.log(req)
    const name = req.user[req.user.method].displayName
    const author = name;
    const description = req.body.description
    
    // Validate fields using Yup
    // except image as it is already checked by multer 
    try {
        await postValidator.validate({ description }, { abortEarly: false });
      } catch (err) {
        console.log(err)
        return res.status(200).json({ message: "Form error exists", formErrors: formatYupError(err), POST_OK: false });
    }

    // Create new post
    const newPost = new Post({
        author,
        description,
        image: {
            filename: req.file.filename,
            url: req.file.path
        }
    });

    newPost.save()
       .then(() => res.status(200).json({ post: newPost, message: 'Post created successfully!', POST_OK: true }))
       .catch(err => res.status(400).json({ message: err.message }));
}

module.exports = { getPostsForUser, createPost, getAllPosts }