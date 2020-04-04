const express = require('express');
const passport = require('passport')
const router = express.Router();

const AuthController = require('../controllers/auth.controller')
const { handlePassportError } = require('../utils/error.helper');

router.post('/vtoken', passport.authenticate('jwt', { 
  session: false,
  failWithError: true
}), AuthController.getUserData, handlePassportError('jwt'))
router.post('/signup', AuthController.signUpByLocal)
router.post('/signin', passport.authenticate('local', { 
    session: false,
    failWithError: true
}), AuthController.signInByLocal, handlePassportError())
router.get('/oauth/google',
      passport.authenticate('google', { 
        scope: ['https://www.googleapis.com/auth/userinfo.profile'] 
      }));
router.get('/oauth/google/callback', 
      passport.authenticate('google', { 
        failureRedirect: '/',
        session: false
      }), AuthController.oauthGoogle);
router.get('/oauth/facebook', passport.authenticate('facebook'));
router.get('/oauth/facebook/callback', 
      passport.authenticate('facebook', { 
        failureRedirect: '/',
        session: false
      }), AuthController.oauthGoogle);

module.exports = router;