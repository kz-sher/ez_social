const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const AuthService = require('../../services/auth.service')    
const User = require('../../db/models/user.model')   

function validateInput({username, password, confirmPassword, country}){
    let errors = {}

    if (!username){
        errors.username = "This field is required."
    }
    if (!password){
        errors.password = "This field is required."
    }
    if (!confirmPassword){
        errors.confirmPassword = "This field is required."
    }
    if (!Validator.equals(password, confirmPassword)){
        errors.confirmPassword = "Passwords must match."
    }
    if (!country){
        errors.country = "This field is required."
    }
    
    return errors;
}

async function isUsernameTaken (usernameQuery) {
    try {
        var user = await AuthService.getUserByUsername(usernameQuery);
        if(user.length > 0)
            return true;
        else
            return false;
    } catch (e) {
        throw Error(e.message);
    }
}

exports.signUp = async function (req, res) {
    
    // Validate fields
    const errors = validateInput(req.body);

    // Check if username is taken when username field passed pre-input validation
    try{
        if(!errors.username){
            let isUsernameTakenFlag = await isUsernameTaken({ 'username': req.body.username });
            if(isUsernameTakenFlag){
                errors.username = 'Username is taken'
            }
        }
    } catch (e){
        console.warn(e.message);
        res.status(400).json({message: "Failed to retrieve user"});
    }

    // Alert if any error exists
    if (!isEmpty(errors)){
        res.status(200).json({message: "Form error exists", formErrors: errors, ACC_OK: false});
        return;
    }

    // Add User
    let user = new User(req.body);
    await user.save()
        .then(user => {
            res.status(200).json({message: 'User added successfully', ACC_OK: true});
        })
        .catch(err => {
            res.status(400).json({message: 'Failed to add user'});
        });
}