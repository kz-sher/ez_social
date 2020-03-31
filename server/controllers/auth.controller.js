if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const { isUserExist } = require('../services/user.service');
const { formatYupError } = require('../utils/error.helper');
const { registerValidator, generateAccessToken, addNewUser } = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');

const signUpByLocal = async function (req, res) {

    let errors = {}
    let userData = req.body

    try {
        await registerValidator.validate(userData, { abortEarly: false });
      } catch (err) {
        errors = formatYupError(err);
      }

    // Check if username is taken when username field passed pre-input validation
    try{
        if(!errors.username){
            const { answer } = await isUserExist({ "local.username": userData.username });
            if(answer){
                errors.username = 'Username is taken'
            }
        }
    } catch (err){
        console.log("****************\n[From auth.controller]:\n" + err.message);
        return res.status(400).json({message: "Failed to retrieve user"});
    }

    // Alert if any error exists
    if (!isEmpty(errors)){
        return res.status(200).json({message: "Form error exists", formErrors: errors, ACC_OK: false});
    }

    // Add new user
    try{
        await addNewUser(userData);
        return res.status(200).json({message: 'Account created successfully!', ACC_OK: true});
    } catch(err){
        return res.status(400).json({message: err.message});
    }
}

const signInByLocal = (req, res) => {
    const token = generateAccessToken({ id: req.body.username });
    res.status(200).json({ token });
}

const oauthGoogle = (req, res) => {
    console.log(req.user)
    console.log("a" + req.body)
    const token = generateAccessToken({ id: req.user.id})
    res.redirect('/?token=' + token);
}


const authenticateToken = async (req, res, next) => {
    console.log("****************\n[From auth.controller]:\n" + "authenticateToken is called!")
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // No token provided
    if(!token) return res.sendStatus(400);

    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(400).json({ message: 'Token expired/invalidated' });
        req.user = user;
        next();
    });
}

module.exports = { signUpByLocal, signInByLocal, oauthGoogle, authenticateToken }