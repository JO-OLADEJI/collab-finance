const Joi = require('joi');

/**
 * 
 * @param {Object} reqBody - body of request contaning the required values
 * @returns {Object} - a { value, error } object: the result of the validation
 */
const validateUser = (reqBody) => {
  const schema = Joi.object({
    'firstname': Joi.string().required().min(2).max(255).lowercase().trim(),
    'lastname': Joi.string().required().min(2).max(255).lowercase().trim(),
    'username': Joi.string().required().min(4).max(255).lowercase().trim(),
    'email': Joi.string().required().email().min(9).max(255).trim(),
    'gender': Joi.string().required().lowercase().trim().valid('male', 'female'),
    'password': Joi.string().required().min(6).max(255).lowercase().trim()
  });

  return schema.validate(reqBody);
}


/**
 * 
 * @param {Object} reqBody - body of request contaning the required values
 * @returns {Object} - a { value, error } object: the result of the validation
 */
const validateGroup = (reqBody) => {
  const schema = Joi.object({
    'admin': Joi.string().length(24).required(true),
    'name': Joi.string().min(3).max(255).trim().lowercase().required(),
    'description': Joi.string().min(24).max(1024).trim().lowercase().required(),
    'maximumCapacity': Joi.number().min(1).max(256).required(),
    'members': Joi.array().min(1).max(256).required(),
    'startDate': Joi.date().required(true),
    'isSearchable': Joi.boolean().required()
  });

  return schema.validate(reqBody);
}


const validateLogin = (reqBody) => {
  const schema = Joi.object({
    'email': Joi.string().email().min(9).max(255).trim(),
    'username': Joi.string().min(4).max(255).lowercase().trim(),
    'password': Joi.string().required().min(6).max(255).lowercase().trim()
  });

  return schema.validate(reqBody);
}


module.exports = {
  validateUser,
  validateGroup,
  validateLogin
}