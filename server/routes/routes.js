var express = require('express');
var router = express.Router();

var AuthController = require('./controllers/auth.controller')
var UserController = require('./controllers/user.controller')

router.post('/api/signup', AuthController.signUp)
router.post('/api/users', UserController.findUser)

module.exports = router;