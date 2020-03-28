var User = require('../db/models/user.model')

exports.getUserByUsername = async usernameQuery => {
    try {
        var user = await User.findOne(usernameQuery)
        return user;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.formatYupError = err => {
    const errors = {}
    err.inner.forEach(e => {
      errors[e.path] = e.message;
    })
    return errors
}