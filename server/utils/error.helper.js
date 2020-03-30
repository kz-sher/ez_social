const formatYupError = err => {
    const errors = {}
    err.inner.forEach(e => {
      errors[e.path] = e.message;
    })
    return errors
}

// Middleware error handler for json response
const handlePassportError = (err, req, res, next) => {
  return res.status(400).json({ message: err });
}

module.exports = { formatYupError, handlePassportError }