class ErrorController {

  invalidRoute = (req, res) => {
    res.status(404).json({
      'success': false,
      'result': null,
      'error': 'Error: invalid route ❗'
    });
  }

}


const errorController = new ErrorController();
module.exports = errorController;