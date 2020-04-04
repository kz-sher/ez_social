const Yup = require('yup');

const postValidator = Yup.object().shape({
    description: Yup.string().required(),
})

module.exports = { postValidator }