const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user.js');
const { validateUser, validateLogin } = require('../utils/validate.js');
const response = require('../utils/response.js');


class UserController {

  signUp = async (req, res, next) => {
    try {
      // validate the body of the request
      const { value, error } = validateUser(req.body);
      if (error) return next({ 'code': 400, 'message': error['details'][0]['message'] });

      // check if email or username exists before
      let user = await User.findOne({ 'username': value.username });
      if (user) return next({ 'code': 409, 'message': 'username already exists' });
      user = await User.findOne({ 'email': value.email });
      if (user) return next({ 'code': 409, 'message': 'email already exists' });
      
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
        .header('x-auth-token', token)
        .json(response(
          _.pick(user, ['_id', 'firstname', 'lastname', 'username', 'email', 'gender', 'pendingGroupInvites']))
        );
    }
    catch (exception) {
      next({ 'code': 500, 'message': exception.message });
    }
  }


  login = async (req, res, next) => {
    // validate the request of the body [username/email and password]
    const { value, error } = validateLogin(req.body);
    if (error) return next({ 'code': 400, 'message': error['details'][0]['message'] });

    try {
      // check if the login method of the user - either username or email
      let loginMethod = null;
      let user = null;
      if (value['email']) {
        loginMethod = 'email';
        user = await User.findOne({ 'email': value.email });
      }
      else if (value['username']) {
        loginMethod = 'username';
        user = await User.findOne({ 'username': value.username[0] == '@' ? value.username : `@${value.username}` });
      }
      else {
        return next({ 'code': 400, 'message': 'email or username must be provided' });
      }

      if (!user) return next({ 'code': 400, 'message': `invalid ${loginMethod} or password` });

      // compare password to hash
      const match = await bcrypt.compare(value['password'], user['password']);
      if (!match) return next({ 'code': 400, 'message': `invalid ${loginMethod} or password` });

      // create a json web token for the user
      const token = user.generateAuthToken();

      // return the user object and jwt header
      res
        .status(200)
        .header('x-auth-token', token)
        .json(response(
          _.pick(user, ['_id', 'firstname', 'lastname', 'username', 'email', 'gender', 'pendingGroupInvites']))
        );
    }
    catch (exception) {
      next({ 'code': 500, 'message': exception.message });
    }
  }


  profile = async (req, res, next) => {
    // get the id sent from the auth middleware
    const { _id } = req.user;

    try {
      const user = await User.findById(_id);
      if (!user) return next({ 'code': 500, 'message': 'user not found' });
      res
        .status(200)
        .json(response(
          _.pick(user, ['_id', 'firstname', 'lastname', 'username', 'email', 'gender', 'pendingGroupInvites']))
        );
    }
    catch (exception) {
      next({ 'code': 500, 'message': exception.message });
    }
  }


  // method for smooth UX in frontend - to update the user in real time if their username is valid
  usernameExists = async (req, res, next) => {
    let sentUsername;
    try {
      sentUsername = (req.body['username']).trim();
    }
    catch (err) { // incase sentUsername is undefined
      sentUsername = req.body['username'];
    }

    if (!sentUsername) {
      next({ 'code': 400, 'message': 'empty username sent'});
    }
    else if ((sentUsername).length < 4) {
      next({ 'code': 400, 'message': 'username should be more than 4 characters' });
    }

    try {
      const user = await User.findOne({ 'username': sentUsername[0] == '@' ? sentUsername : `@${sentUsername}` });
      if (user) return res.status(200).json(response(true));
      res.status(200).json(response(false));
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