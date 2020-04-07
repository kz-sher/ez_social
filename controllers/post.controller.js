const Post = require('../models/post.model')
const { postValidator } = require('../services/post.service');
const { formatYupError } = require('../utils/error.helper');
const { isEmpty } = require('lodash');
const { cloudinary } = require('../middleware/cloudinary');

const getPost = (req, res) => {
    Post.findOne({ _id: req.params.id })
       .then(post => res.status(200).json({ post }))
       .catch(err => res.status(400).json({ message: "['S1']: Error fetching post" }));
};

const getAllPosts = (req, res) => {
    const pageNum = parseInt(req.query.pageNum);
    const nPerPage = parseInt(req.query.nPerPage);
    const postId = req.query.postId;

    setTimeout(() => {
        if(postId == -1){
            // To get latest posts
            Post.find()
                .sort({ 'post_id': -1 })
                .limit(nPerPage)
                .skip(  ( pageNum - 1 ) * nPerPage )
                .then(posts => {
                    // get the last post which is the earliest post out of all
                    const postId = !isEmpty(posts) ? posts[posts.length - 1].post_id: 0
                    res.status(200).json({ posts, postId: postId })
                })
                .catch(err => res.status(400).json({ message: "['A11']: Error fetching posts" }))
        } 
        else{
            // To continue getting older posts from the last recent post he/she read
            if(postId > 0){
                Post.find({ 'post_id':{'$lt': postId}})
                    .sort({ 'post_id': -1 })
                    .limit(nPerPage)
                    .then(posts => {
                        const postId = !isEmpty(posts) ? posts[posts.length - 1].post_id: 0
                        res.status(200).json({ posts, postId: postId })
                    })
                    .catch(err => res.status(400).json({ message: "['A12']: Error fetching posts" }))
            }
            else{
                res.status(200).json({ posts: [] });
            }
        }
    }, 1000)
}

const createPost = async (req, res) => {
    
    const name = req.user[req.user.method].displayName
    const author = name;
    const description = req.body.description
    
    // Validate fields using Yup
    // except image as it is already checked by multer 
    try {
        await postValidator.validate({ description }, { abortEarly: false });
      } catch (err) {
        return res.status(200).json({ message: "Form error exists", formErrors: formatYupError(err), POST_OK: false });
    }

    if(process.env.NODE_ENV === "production"){
        // Upload to cloudinary
        cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
            // Upload failure
            if(err) return res.status(400).json({ message: err.message });

            // Create new post
            const newPost = new Post({
                author,
                description,
                image: {
                    filename: req.file.filename,
                    url: result.secure_url,
                    imageId: result.public_id
                }
            });

            newPost.save()
            .then(() => res.status(200).json({ post: newPost, message: 'Post created successfully!', POST_OK: true }))
            .catch(err => res.status(400).json({ message: err.message }));
        });
    }
    else{
        const newPost = new Post({
            author,
            description,
            image: {
                filename: req.file.filename,
                url: '/static/' + req.file.filename,
                imageId: Date.now()
            }
        });

        newPost.save()
        .then(() => res.status(200).json({ post: newPost, message: 'Post created successfully!', POST_OK: true }))
        .catch(err => res.status(400).json({ message: err.message }));
    }
}

const updatePost = async (req, res) => {
    
    const name = req.user[req.user.method].displayName
    const author = name;
    const description = req.body.description
    console.log(req.body)

    try {
        await postValidator.validate({ description }, { abortEarly: false });
      } catch (err) {
        return res.status(200).json({ message: "Form error exists", formErrors: formatYupError(err), POST_OK: false });
    }

    Post.findOneAndUpdate({ author, _id: req.params.id }, { $set:{ description } }, { new: true })
        .then(post => {
            if(isEmpty(post)){
                res.status(400).json({ message: "['U1']: Unauthorized action" })
            }
            res.status(200).json({ post, message: "Post successfully updated" })
        }).catch(err => res.status(400).json({ message: "['U2']: Error updating existing post" }))
}

const deletePost = (req, res) => {
    
    const name = req.user[req.user.method].displayName
    const author = name;

    Post.findOneAndDelete({ author, _id: req.params.id })
        .then(post => {
            if(isEmpty(post)){
                res.status(400).json({ message: "['D1']: Unauthorized action" })
            }
            res.status(200).json({ post, message: "Post successfully deleted" })
        }).catch(err => res.status(400).json({ message: "['D2']: Error deleting existing post" }))

}

module.exports = { getPost, createPost, getAllPosts, updatePost, deletePost }