class HomeController {

  welcome = (req, res) => {
    res.json({
      'success': true,
      'result': 'Welcome to Collab Finance 💰',
      'error': null
    });
  }

}


const homeController = new HomeController();
module.exports = homeController;