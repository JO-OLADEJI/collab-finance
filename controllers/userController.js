const User = require('../database/models/user.js');
const { validateUser } = require('../utils/validate.js');


class UserController {

  getAll = async (req, res) => {
    try {
      const allUsers = await User.find({});
      res.json({
        'success': true,
        'result': allUsers,
        'error': null
      });
    }
    catch (exc) {
      res.json({
        'success': false,
        'result': null,
        'error': exc.message
      });
    }
  }

  
  getOne = async (req, res) => {
    try {
      const requestedUser = await User.findById(req.params.id);
      if (!requestedUser) return res.status(400).json({
        'success': false,
        'result': null,
        'error': 'User not found for the given ID ❗'
      });

      res.json({
        'success': false,
        'result': requestedUser,
        'error': null
      });
    }
    catch (exc) {
      res.json({
        'success': false,
        'result': null,
        'error': exc.message
      });
    }
  }


  createOne = async (req, res) => {
    // validate the request body
    const { value, error } = validateUser(req.body);
    if (error) return res.status(400).json({
      'success': false,
      'result': null,
      'error': error['details'][0]['message']
    });

    const { firstname, lastname, username, phone, email, gender, password } = value;

    // create the object and save
    try {
      const userObj = new User({ 
        firstname, lastname, phone, email, gender, password,
        username: `@${username}`
      });
      const newUser = await userObj.save();
      res.json({
        'success': true,
        'result': newUser,
        'error': null
      });
    }
    catch (exc) {
      res.json({
        'success': false,
        'result': null,
        'error': exc.message
      });
    }
  }


  updateOne = async (req, res) => {
    res.send('updating user with given ID . . .');
  }


  deletOne = async (req, res) => {
    res.send('deleting user with given ID . . .');
  }

}

const userController = new UserController();
module.exports = userController;