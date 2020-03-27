const isEmpty = require('lodash/isEmpty');
const AuthService = require('../../services/auth.service')    
const User = require('../../db/models/user.model')   
const Yup = require('yup')

const formatYupError = err => {
    const errors = {}
    err.inner.forEach(e => {
      errors[e.path] = e.message;
    })
    return errors
}
  
const validator = Yup.object().shape({
    username: Yup.string().min(4).required(),
    password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    country: Yup.string().required()
})

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

    let errors = {}

    try {
        await validator.validate(req.body, { abortEarly: false });
      } catch (err) {
        errors = formatYupError(err);
      }

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