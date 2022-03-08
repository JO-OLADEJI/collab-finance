class ErrorController {

  invalidRoute = (req, res) => {
    return res
      .status(404)
      .json({
        'result': false,
        'data': null,
        'error': 'invalid route ❗'
      });
  }

  applicatonError = (err, req, res, next) => {
    return res
      .status(err['code'])
      .json({
        'result': false,
        'data': null,
        'error': err['message'] + ' ❗'
      });
  }

}


const errorController = new ErrorController();
module.exports = errorController;