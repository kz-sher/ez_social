const { getUserByUsername } = require('../utils/user.helper');

exports.isUsernameExist = async usernameQuery => {
    try {
        var user = await getUserByUsername(usernameQuery);
        if(user)
            return { answer: true, user: user};
        else
            return { answer: false, user: null};
    } catch (err) {
        throw Error(err.message);
    }
}

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // 401 error for unauthorization if no token provided
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        // 403 error for forbidden access because of some reasons (in this case token is not valid anymore)
        if(err) return res.sendStatus(403)
        req.user = user
        next();
    });
}