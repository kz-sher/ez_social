if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Yup = require('yup');
const User = require('../models/user.model');

const registerValidator = Yup.object().shape({
    username: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(4).required(),
    password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    country: Yup.string().required()
})

const generateAccessToken = (data) => {
    // Create token for the user
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFETIME });
}

async function addNewUser(userData){

    // Hash password with salt
    try{
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
    } catch (err) {
        throw Error('Failed to secure credentials');
    }

    // Create user and save to database
    let user = new User({
        method: "local",
        local: {
            username: userData.username,
            displayName: userData.username,
            password: userData.password,
            country: userData.country
        }
    });
    await user.save()
        .then(() => {})
        .catch(err => {
            throw Error('Failed to add user');
        });
}

module.exports = { registerValidator, addNewUser, generateAccessToken }