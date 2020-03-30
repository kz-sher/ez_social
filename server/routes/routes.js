const express = require('express');
const passport = require('passport')
const router = express.Router();

const AuthController = require('../controllers/auth.controller')
const { handlePassportError } = require('../utils/error.helper');

router.post('/vtoken', AuthController.authenticateToken, (_, res)=> res.sendStatus(200));
router.post('/api/signup', AuthController.signUpByLocal)
router.post('/api/signin', passport.authenticate('local', { 
    session: false,
    failWithError: true
}), AuthController.signInByLocal, handlePassportError)
router.get('/api/oauth/google',
      passport.authenticate('google', { 
        scope: ['https://www.googleapis.com/auth/userinfo.profile'] 
      }));
router.get('/api/oauth/google/callback', 
      passport.authenticate('google', { 
        failureRedirect: '/',
        session: false
      }), AuthController.oauthGoogle);

module.exports = router;