class ResponseController {

  response = (responseObject) => {
    return {
      'result': true,
      'data': responseObject,
      'error': null
    };
  }

}

const responseController = new ResponseController();
module.exports = responseController;