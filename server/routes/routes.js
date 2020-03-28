var express = require('express');
var router = express.Router();

var SignUpController = require('./controllers/signup.controller')
var SignInController = require('./controllers/signin.controller')

router.post('/api/signup', SignUpController.signUp)
router.post('/api/signin', SignInController.signIn)
// router.get('/api/comments', SignInController.)

module.exports = router;