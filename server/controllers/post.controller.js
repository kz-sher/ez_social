const Post = require('../models/post.model')
const { postValidator } = require('../services/post.service');
const { formatYupError } = require('../utils/error.helper');
const { orderBy } = require('lodash')

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
    console.log(pageNum, nPerPage)
    setTimeout(() => {
    Post.find()
        .sort({ date: -1 })
        .limit(10)
        .skip( pageNum > 0 ? ( ( pageNum - 1 ) * nPerPage ) : 0 )
        .then(posts => res.status(200).json(posts))
        .catch(err =>
            res.status(400).json({ message: "['A11']: Error fetching posts" })
        )}, 1000)
}

async function createPost(req, res){
    console.log(req.user)
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
    newPost.save()
       .then(() => res.status(200).json({ post: newPost, message: 'Post created successfully!', POST_OK: true }))
       .catch(err => res.status(400).json({ message: err.message }));
}

module.exports = { getPostsForUser, createPost, getAllPosts }