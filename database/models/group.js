const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  'admin': {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  'name': {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    lowercase: true,
    trim: true
  },

  'description': {
    type: String,
    required: true,
    minlength: 24,
    maxlength: 1024,
    lowercase: true,
    trim: true
  },

  'maximumCapacity': {
    type: Number,
    required: true,
    min: 1,
    max: 256
  },

  'members': {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    min: 1,
    max: 256,
    ref: 'users'
  },

  'startDate': {
    type: Date,
    required: true
  },

  'isSearchable': {
    type: Boolean,
    required: true
  },

  'timestamp': {
    type: Date,
    default: Date.now
  }
});


const Group = mongoose.model('groups', groupSchema);
module.exports = Group;