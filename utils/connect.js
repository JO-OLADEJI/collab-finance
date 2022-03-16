require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('app:start');


const connectDB = () => {
  let connection_uri = null;

  // select db based on the environment
  if (process.env.NODE_ENV === 'test') {
    connection_uri = process.env.DB_URI_TEST;
  }
  else if (process.env.NODE_ENV === 'production') {
    connection_uri = process.env.DB_URI_PROD;
  }
  else { // else run it on the development db
    connection_uri = process.env.DB_URI_DEV;
  }

  mongoose.connect(connection_uri)
    .then(() => {
      debug('Connected to DB ✔');
    }).catch(err => {
      debug('Error: cannot connect DB ❗');
    });
}


module.exports = connectDB;