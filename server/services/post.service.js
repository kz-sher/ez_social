const Yup = require('yup');

const postValidator = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
})

module.exports = { postValidator }