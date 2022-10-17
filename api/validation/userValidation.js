// Contains validation from the usermodule
const Joi = require("joi");

exports.validUser = (_reqBody) => {
    let joiSchema = Joi.object({
      fullName: {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
  },
      email:Joi.string().min(2).max(99).email().required(),
      password:Joi.string().min(3).max(99).required()
    })
    return joiSchema.validate(_reqBody);
  }
  
  exports.validLogin = (_reqBody) => {
    let joiSchema = Joi.object({
      email:Joi.string().min(2).max(99).email().required(),
      password:Joi.string().min(3).max(99).required()
    })
  
    return joiSchema.validate(_reqBody);
  }