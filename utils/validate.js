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
    'username': Joi.string().required().min(2).max(255).lowercase().trim(),
    'phone': Joi.string().required().length(11).trim(),
    'email': Joi.string().required().email().min(9).max(255).trim(),
    'gender': Joi.string().required().min(4).max(6).lowercase().trim(),
    'password': Joi.string().required().min(6).max(255).lowercase().trim()
  });

  return schema.validate(reqBody);
}


module.exports = {
  validateUser
}