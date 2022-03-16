const response = require('../utils/response.js');

class HomeController {

  welcome = (req, res) => {
    res.json(response('Welcome to Collab Finance 💰'));
  }

}


const homeController = new HomeController();
module.exports = homeController;