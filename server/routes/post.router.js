const express = require('express');
const passport = require('passport')
const router = express.Router();

const PostController = require('../controllers/post.controller')
const { handlePassportError } = require('../utils/error.helper');

router.get("/", passport.authenticate("jwt", { 
    session: false,
    failWithError: true
}), PostController.getAllPostsForSpecificUser, handlePassportError);

router.get("/create", passport.authenticate("jwt", { 
    session: false,
    failWithError: true
}), PostController.getNewPostForUser, handlePassportError);

router.post("/create", passport.authenticate("jwt", { 
    session: false,
    failWithError: true
}), PostController.createPost, handlePassportError);

module.exports = router;