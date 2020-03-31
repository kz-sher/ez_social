const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google'],
        required: true
    },
    local: {
        username: {
            type: String
        },
        displayName: {
            type: String
        },
        password: {
            type: String
        },
        country: {
            type: String
        }
    },
    google: {
        id: {
            type: Number
        },
        username: {
            type: String
        },
        displayName: {
            type: String
        },
    }
});

module.exports = mongoose.model('user', UserSchema);