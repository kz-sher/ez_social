if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { isUserExist } = require('../services/user.service');

async function authenticateUserByLocal(username, password, done) {
    let answer, user;
    try{
        ({ answer, user } = await isUserExist({ "local.username": username }));
        if(!answer){
            return done("Incorrect credentials entered") // user not found
        }
    } catch(err){
        return done(err.message)
    }

    try{
        if(await bcrypt.compare(password, user.local.password)){
            return done(null, user);
        } else{
            return done("Incorrect credentials entered") // wrong password
        } 
    } catch(err){
        return done("Server error occured")
    }
}

async function authenticateUserByJwt(payload, done){
    try{
        const { user } = await isUserExist({ "_id": payload.id });
        if (user) {

            return done(null, user);
         } else {
            return done("Invalid Token"); // verified token but user not found probably due to user account deletion
         }
    } catch(err){
        done(err);
    }
}

async function findOrCreateUser(accessToken, refreshToken, profile, done){
    try{
        const { answer, user } = await isUserExist({ "google.id": profile.id });
        if(answer){

            return done(null, user);
        }

        const newUser = new User({
            method: "google",
            google:{
                id: profile.id,
                username: profile.displayName,
                displayName: profile.displayName
            }
        });
        await newUser.save();
        done(null, newUser);
    } catch(err){
        done(err);
    }
};

const initializePassport = passport => {
    
    // Local strategy
    passport.use( new LocalStrategy({}, authenticateUserByLocal) );

    // Google strategy
    passport.use('google', new GoogleStrategy({ 
        clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/oauth/google/callback'
    }, findOrCreateUser) );

    // Facebook strategy
    passport.use('facebook', new FacebookStrategy({ 
        clientID: process.env.OAUTH_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET,
        callbackURL: '/api/auth/oauth/facebook/callback'
    }, findOrCreateUser) );

    // JWT strategy
    passport.use( new JwtStrategy({
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET
    }, authenticateUserByJwt) );
}

module.exports = { initializePassport }