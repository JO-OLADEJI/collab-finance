const error = require('../utils/error.js');

class ErrorController {

  invalidRoute = (req, res) => {
    return res
      .status(404)
      .json(error('invalid route'));
  }

  applicatonError = (err, req, res, next) => {
    return res
      .status(err['code'])
      .json(error(err['message']));
  }

}


const errorController = new ErrorController();
module.exports = errorController;