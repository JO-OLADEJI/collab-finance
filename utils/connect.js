const mongoose = require('mongoose');
const debug = require('debug')('app:start');


/**
 * 
 * @param {String} connection_uri - mongodb connection string
 */
const connectDB = (connection_uri) => {
  mongoose.connect(connection_uri)
    .then(() => {
      debug('Connected to DB ✔');
    }).catch(err => {
      debug('Error: cannot connect DB ❗');
    });
}


module.exports = connectDB;