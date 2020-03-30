if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { isUserExist } = require('../services/user.service');

async function authenticateUserByLocal(username, password, done) {
    let answer, user;
    try{
        ({ answer, user } = await isUserExist({ "local.username": username }));
        if(!answer){
            return done("Incorrect credentials entered", false) // user not found
        }
    } catch(err){
        return done(err.message)
    }

    try{
        if(await bcrypt.compare(password, user.local.password)){
            console.log("****************\n[From passport-config]:\n" + user)
            return done(null, user);
        } else{
            return done("Incorrect credentials entered", false) // wrong password
        } 
    } catch(err){
        return done("Server error occured")
    }
}

async function findOrCreateUser(accessToken, refreshToken, profile, done){
    try{
        const { answer, user } = await isUserExist({ "google.id": profile.id });
        if(answer){
            console.log("****************\n[From passport-config]:\n" + "User already exists in database")
            return done(null, user);
        }

        console.log("****************\n[From passport-config]:\n" + "User not found")
        const newUser = new User({
            method: "google",
            google:{
                id: profile.id,
                name: profile.displayName
            }
        });
        await newUser.save();
        done(null, newUser);
    } catch(err){
        console.log("****************\n[From passport-config]:\n" + err)
        done(err);
    }
};

const initializePassport = passport => {
    
    // Local strategy
    passport.use( new LocalStrategy({}, authenticateUserByLocal) );

    // Google plus token strategy
    passport.use('google', new GoogleStrategy({ 
        clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/oauth/google/callback'
    }, findOrCreateUser) );
}

module.exports = { initializePassport }