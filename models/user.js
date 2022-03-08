const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  'firstname': {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    lowercase: true,
    trim: true
  },

  'lastname': {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    lowercase: true,
    trim: true
  },

  'username': {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    lowercase: true,
    trim: true,
    match: /^@[a-z0-9]+$/i,
    unique: true
  },

  'email': {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 255,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true
  },

  'gender': {
    type: String,
    required: true,
    lowercase: true,
    enum: ['male', 'female']
  },

  'password': {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },

  'pendingGroupInvites': {
    type: [mongoose.Schema.Types.ObjectId], // an array of objectIDs
    required: false,
    ref: 'groups'
  },

  'timestamp': {
    type: Date,
    default: Date.now
  }

});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ '_id': this._id, 'admin': false }, process.env.JWT_SECRET);
  return token;
}

const User = mongoose.model('users', userSchema);
module.exports = { userSchema, User };