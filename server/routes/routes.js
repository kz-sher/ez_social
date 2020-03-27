var express = require('express');
var router = express.Router();

var SignUpController = require('./controllers/signup.controller')

router.post('/api/signup', SignUpController.signUp)

module.exports = router;