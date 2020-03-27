var User = require('../db/models/user.model')

exports.getUser = async function (query) {
    try {
        var user = await User.find(query)
        return user;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}