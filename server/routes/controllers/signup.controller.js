const { isUsernameExist } = require('../../services/auth.service');
const { formatYupError } = require('../../utils/user.helper');
const User = require('../../db/models/user.model');

const isEmpty = require('lodash/isEmpty');
const Yup = require('yup');
const bcrypt = require('bcrypt');
  
const validator = Yup.object().shape({
    username: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(4).required(),
    password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    country: Yup.string().required()
})

async function addNewUser(userData){

    // Hash password with salt
    try{
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
    } catch (err) {
        throw Error('Failed to secure credentials');
    }

    // Create user and save to database
    let user = new User(userData);
    await user.save()
        .then(() => {})
        .catch(err => {
            throw Error('Failed to add user');
        });
}

exports.signUp = async function (req, res) {

    let errors = {}
    let userData = req.body

    try {
        await validator.validate(userData, { abortEarly: false });
      } catch (err) {
        errors = formatYupError(err);
      }

    // Check if username is taken when username field passed pre-input validation
    try{
        if(!errors.username){
            const { answer } = await isUsernameExist({ 'username': userData.username });
            if(answer){
                errors.username = 'Username is taken'
            }
        }
    } catch (err){
        console.warn(err.message);
        return res.status(400).json({message: "Failed to retrieve user"});
    }
    
    // Alert if any error exists
    if (!isEmpty(errors)){
        return res.status(200).json({message: "Form error exists", formErrors: errors, ACC_OK: false});
    }

    // Add new user
    try{
        await addNewUser(userData)
        return res.status(200).json({message: 'User added successfully', ACC_OK: true});
    } catch(err){
        return res.status(400).json({message: err.message});
    }
}