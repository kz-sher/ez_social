if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const { isUserExist } = require('../services/user.service');
const { formatYupError } = require('../utils/error.helper');
const { registerValidator, generateAccessToken, addNewUser } = require('../services/auth.service');
const { isEmpty } = require('lodash');

const getUserData = (req, res) => {
    return res.status(200).json({ username: req.user[req.user.method].displayName });
}

const signUpByLocal = async function (req, res) {

    let errors = {}
    let userData = req.body
    console.log(req.body)

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
    const token = generateAccessToken({ id: req.user._id });
    res.status(200).json({ token, username: req.user[req.user.method].displayName });
}

const oauthGoogle = (req, res) => {
    const token = generateAccessToken({ id: req.user.id})
    res.redirect('/?token=' + token + '&?username=' + req.user.displayName);
}

module.exports = { getUserData, signUpByLocal, signInByLocal, oauthGoogle }