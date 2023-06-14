const Joi = require('@hapi/joi')
class validationSchema{

    static modelValidation = Joi.object().keys({
    // username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // role : Joi.string().required(),
    // gender: Joi.string().required(),
    // phone: Joi.number().required()
})
}
module.exports = {validationSchema}