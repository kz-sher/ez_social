if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const { isUsernameExist } = require('../services/user.service');
const Yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const validator = Yup.object().shape({
//     username: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(4).required(),
//     password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Only alphabets and numbers are accepted').min(6).required(),
// })

// async function authenticateUserCredentials({username, password}) {
//     let answer, user;
//     const usernameQuery = { username }
//     // Check whether user exists or not
//     try{
//         ({ answer, user } = await isUsernameExist(usernameQuery));
//         if(!answer){
//             throw Error("Incorrect credentials entered") // user not found
//         }
//     } catch(err){
//         throw Error('Server error occured');
//     }

//     // Check whether password given is the same with the actual one
//     try{
//         if(await bcrypt.compare(password, user.password)){
//             return { username };
//         } else{
//             throw Error("Incorrect credentials entered") // wrong password
//         } 
//     } catch(err){
//         throw Error(err.message);
//     }
// }

// const signIn = async function (req, res) {
//     let user;
//     let userData = req.body;
//     // Pre-validation for user credentials
//     try {
//         await validator.validate(userData, { abortEarly: false });
//       } catch (err) {
//         return res.status(400).json({ message: "Incorrect credentials entered" });
//       }
    
//     // Check whether the credentials entered are correct
//     try{
//         user = await authenticateUserCredentials(req.body)
//     } catch(err){
//         return res.status(400).json({ message: err.message });
//     }

//     // Create token for the user
//     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//     res.status(200).json({ token });
// }

const signToken = function (data) {
    // Create token for the user
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
}

const signInByLocal = (req, res) => {
    const token = signToken({ id: req.user.id });
    res.status(200).json({ token });
}

const oauthGoogle = (req, res) => {
    const token = signToken({ id: req.user.id})
    res.redirect('/?token=' + token);
}

module.exports = { signInByLocal, oauthGoogle }