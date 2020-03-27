var User = require('../db/models/user.model')

exports.getUserByUsername = async function (usernameQuery) {
    try {
        var user = await User.find(usernameQuery)
        return user;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}