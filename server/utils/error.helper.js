const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const formatYupError = err => {
    const errors = {}
    err.inner.forEach(e => {
      errors[e.path] = e.message;
    })
    return errors
}

// Middleware error handler for json response
const handlePassportError = (type) => (err, req, res, next) => {
  if(type == "jwt") {
    const token = fromAuthHeaderAsBearerToken()(req);
    if(!token) {
      return res.sendStatus(400);
    }
    else{
      return res.status(400).json({ message: "Invalid/expired token" })
    }
  }
  return res.status(400).json({ message: err });
}

module.exports = { formatYupError, handlePassportError }