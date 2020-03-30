const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UserSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google'],
        required: true
    },
    local: {
        username: {
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
        name: {
            type: String
        }
    }
});

module.exports = mongoose.model('user', UserSchema);