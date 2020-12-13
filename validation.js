const joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = {
        name: joi.string().min(3).required(),
        username: joi.string().min(3).required(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data, schema)
}

//Login Validation
const loginValidation = (data) => {
    const schema = {
        username: joi.required(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data, schema)
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
