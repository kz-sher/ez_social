const Post = require('../models/post.model')
const { postValidator } = require('../services/post.service');
const { formatYupError } = require('../utils/error.helper');
const { orderBy } = require('lodash')

async function getAllPostsForSpecificUser(req, res){
    const name = req.user[req.user.method].displayName
    await Post.find({ author: name })
        .then(posts => res.status(200).json(posts))
        .catch(err =>
            returnres.status(400).json({ user: "Error fetching posts of logged in user" })
        );
}

async function getNewPostForUser(req, res){
    const name = req.user[req.user.method].displayName
    await Post.find({ author: name })
        .then(posts => {
            const post = orderBy(posts, 'date', 'desc')[0]
            return res.status(200).json(post)
        })
        .catch(err =>
            res.status(400).json({ user: "Error fetching posts of logged in user" })
        );
}

async function createPost(req, res){
    let errors = {}
    const name = req.user[req.user.method].displayName
    const author = name;
    const post = req.body; // all fields except author
    post.author = author;

    // Validate fields using Yup
    try {
        await postValidator.validate(post, { abortEarly: false });
      } catch (err) {
          console.log(err)
        return res.status(200).json({ message: "Form error exists", formErrors: formatYupError(err), POST_OK: false });
    }

    // Create new post
    const newPost = new Post(post);
    await newPost.save()
       .then(() => res.status(200).json({message: 'Post created successfully!', POST_OK: true }))
       .catch(err => res.status(400).json({message: err.message}));
}

module.exports = { getAllPostsForSpecificUser, createPost, getNewPostForUser }