var UserService = require('../../services/user.service')    

exports.findUser = async function (req, res, next) {
    
    try {
        console.log(req.body)
        var user = await UserService.getUser(req.body);
        if(user.length > 0)
            return res.status(200).json({message: "Username is taken" });
        else
            return res.status(200).json({message: "Username not found" });
    } catch (e) {
        return res.status(400).json({message: "Failed to retrieve user" });
    }
}