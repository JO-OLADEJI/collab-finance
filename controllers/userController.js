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
      if (!requestedUser) return res.status(404).json({
        'success': false,
        'result': null,
        'error': 'User not found for the given ID ❗'
      });

      res.json({
        'success': true,
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
    try {
      const requestedUser = await User.findById(req.params.id);
      if (!requestedUser) return res.status(404).json({
        'success': false,
        'result': null,
        'error': 'User with the given ID was not found ❗'
      });

      const { firstname, lastname, phone, email, gender } = req.body;

      // prepare an object to be validated
      const proposedUpdate = {
        'firstname': firstname || requestedUser.firstname,
        'lastname': lastname || requestedUser.lastname,
        'username': (requestedUser.username).toString().substring(1),
        'phone': phone || requestedUser.phone,
        'email': email || requestedUser.email,
        'gender': gender || requestedUser.gender,
        'password': requestedUser.password
      };

      // validate the request
      const { value, error } = validateUser(proposedUpdate);
      if (error) return res.status(400).json({
        'success': false,
        'result': null,
        'error': error['details'][0]['message']
      });

      // update the user
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        {
          $set: { 
            firstname: value.firstname,
            lastname: value.lastname,
            username: `@${value.username}`,
            phone: value.phone,
            email: value.email,
            gender: value.gender
          },
          $inc: {
            __v: 1 
          }
        },
        { new: true }
      );

      res.json({
        'success': true,
        'result': updatedUser,
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


  deletOne = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(400).json({
        'success': false,
        'result': null,
        'error': 'User not found for the given ID ❗'
      });

      res.json({
        'success': true,
        'result': deletedUser,
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

}

const userController = new UserController();
module.exports = userController;