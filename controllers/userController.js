const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../database/models/user.js');
const { validateUser } = require('../utils/validate.js');
const responseController = require('./responseController.js');


class UserController {

  signUp = async (req, res, next) => {
    try {
      // validate the body of the request
      const { value, error } = validateUser(req.body);
      if (error) return next({ 'code': 400, 'message': error['details'][0]['message'] });

      // check if email or username exists before
      let user = await User.findOne({ 'username': value.username });
      if (user) return next({ 'code': 400, 'message': 'Username already exists' });
      user = await User.findOne({ 'email': value.email });
      if (user) return next({ 'code': 400, 'message': 'Email already exists' });
      
      // hash the password
      const salt = await bcrypt.genSalt(11);
      const hashedPassword = await bcrypt.hash(value.password, salt);
      value.password = hashedPassword;
      value.username = `@${value.username}`

      // create a json web token for the user
      user = new User(value);
      const token = user.generateAuthToken();
      await user.save();

      // return the user object (-password) and jwt header
      res
        .status(201)
        .header('X-auth-token', token)
        .json(responseController.response(
          _.pick(user, ['_id', 'firstname', 'lastname', 'username', 'email', 'gender', 'pendingGroupInvites']))
        );
    }
    catch (exception) {
      next({ 'code': 500, 'message': exception.message });
    }
  }


  login = async (req, res) => {
    // validate the request of the body [username/email and password]
    // compare password to hash
    // create a json web token for the user
    // return the user object and jwt header
  }


  profile = async (req, res) => {
    // validate the json web token sent through a middleware
    // get the id
    // return the user (-password) to the user
  }


  // method for smooth UX in frontend - to update the user in real time if their username is valid
  usernameExists = async (req, res, next) => {
    if (!req.body['username']) {
      next({ 'code': 400, 'message': 'Empty username sent'});
    }
    else if ((req.body['username']).length < 4) {
      next({ 'code': 400, 'message': 'Username should be more than 4 characters' });
    }

    try {
      const user = await User.findOne({ 'username': `@${req.body['username']}` });
      if (user) return res.status(400).send(true);
      res.status(200).send(false);
    }
    catch (exception) {
      next({ 'code': 500, 'message': exception.message });
    }
  }

  // getAll = async (req, res) => {
  //   try {
  //     const allUsers = await User.find({});
  //     res.json({
  //       'success': true,
  //       'result': allUsers,
  //       'error': null
  //     });
  //   }
  //   catch (exc) {
  //     res.json({
  //       'success': false,
  //       'result': null,
  //       'error': exc.message
  //     });
  //   }
  // }

  
  // getOne = async (req, res) => {
  //   try {
  //     const requestedUser = await User.findById(req.params.id);
  //     if (!requestedUser) return res.status(404).json({
  //       'success': false,
  //       'result': null,
  //       'error': 'User not found for the given ID ❗'
  //     });

  //     res.json({
  //       'success': true,
  //       'result': requestedUser,
  //       'error': null
  //     });
  //   }
  //   catch (exc) {
  //     res.json({
  //       'success': false,
  //       'result': null,
  //       'error': exc.message
  //     });
  //   }
  // }


  // createOne = async (req, res) => {
  //   // validate the request body
  //   const { value, error } = validateUser(req.body);
  //   if (error) return res.status(400).json({
  //     'success': false,
  //     'result': null,
  //     'error': error['details'][0]['message']
  //   });

  //   const { firstname, lastname, username, phone, email, gender, password } = value;

  //   // create the object and save
  //   try {
  //     const userObj = new User({ 
  //       firstname, lastname, phone, email, gender, password,
  //       username: `@${username}`
  //     });
  //     const newUser = await userObj.save();
  //     res.json({
  //       'success': true,
  //       'result': newUser,
  //       'error': null
  //     });
  //   }
  //   catch (exc) {
  //     res.json({
  //       'success': false,
  //       'result': null,
  //       'error': exc.message
  //     });
  //   }
  // }


  // updateOne = async (req, res) => {
  //   try {
  //     const requestedUser = await User.findById(req.params.id);
  //     if (!requestedUser) return res.status(404).json({
  //       'success': false,
  //       'result': null,
  //       'error': 'User with the given ID was not found ❗'
  //     });

  //     const { firstname, lastname, phone, email, gender } = req.body;

  //     // prepare an object to be validated
  //     const proposedUpdate = {
  //       'firstname': firstname || requestedUser.firstname,
  //       'lastname': lastname || requestedUser.lastname,
  //       'username': (requestedUser.username).toString().substring(1),
  //       'phone': phone || requestedUser.phone,
  //       'email': email || requestedUser.email,
  //       'gender': gender || requestedUser.gender,
  //       'password': requestedUser.password
  //     };

  //     // validate the request
  //     const { value, error } = validateUser(proposedUpdate);
  //     if (error) return res.status(400).json({
  //       'success': false,
  //       'result': null,
  //       'error': error['details'][0]['message']
  //     });

  //     // update the user
  //     const updatedUser = await User.findByIdAndUpdate(
  //       req.params.id, 
  //       {
  //         $set: { 
  //           firstname: value.firstname,
  //           lastname: value.lastname,
  //           username: `@${value.username}`,
  //           phone: value.phone,
  //           email: value.email,
  //           gender: value.gender
  //         },
  //         $inc: {
  //           __v: 1 
  //         }
  //       },
  //       { new: true }
  //     );

  //     res.json({
  //       'success': true,
  //       'result': updatedUser,
  //       'error': null
  //     });
  //   }
  //   catch (exc) {
  //     res.json({
  //       'success': false,
  //       'result': null,
  //       'error': exc.message
  //     });
  //   }
  // }


  // deletOne = async (req, res) => {
  //   try {
  //     const deletedUser = await User.findByIdAndDelete(req.params.id);
  //     if (!deletedUser) return res.status(400).json({
  //       'success': false,
  //       'result': null,
  //       'error': 'User not found for the given ID ❗'
  //     });

  //     res.json({
  //       'success': true,
  //       'result': deletedUser,
  //       'error': null
  //     });
  //   }
  //   catch (exc) {
  //     res.json({
  //       'success': false,
  //       'result': null,
  //       'error': exc.message
  //     });
  //   }
  // }

}

const userController = new UserController();
module.exports = userController;