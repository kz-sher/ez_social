require('dotenv').config();

const { isUsernameExist } = require('../../services/auth.service');
const Yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validator = Yup.object().shape({
    username: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(4).required(),
    password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
})

async function authenticateUserCredentials({username, password}) {
    let answer, user;
    const usernameQuery = { 'username' : username}
    try{
        ({ answer, user } = await isUsernameExist(usernameQuery));
        if(!answer){
            throw Error("User not found");
        }
    } catch(err){
        throw Error(err.message);
    }

    try{
        if(await bcrypt.compare(password, user.password)){
            return { 'username' : username };
        } else{
            // throw Error("Incorrect credentials entered") // wrong password
            throw Error("Incorrect password")
        } 
    } catch(err){
        throw Error(err.message);
    }
}

exports.signIn = async function (req, res) {
    let user;
    let userData = req.body;
    // Pre-validation for user credentials
    try {
        await validator.validate(userData, { abortEarly: false });
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    
    // Check whether the credentials entered are correct
    try{
        user = await authenticateUserCredentials(req.body)
    } catch(err){
        return res.status(400).json({ message: err.message });
    }

    // Create token for the user
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ token: token });
}