const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const homeRouter = require('../routes/home.js');
const errorRouter = require('../routes/error.js');
const userRoutes = require('../routes/user.js');
const groupRoutes = require('../routes/group.js');
const errorController = require('../controllers/errorController.js')


const pipeline = (app) => {

  // middlewares
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('short'));

  // routes
  app.use('/', homeRouter);
  app.use('/api/users', userRoutes);
  // app.use('/api/groups', groupRoutes);

  // error thrown inside route handlers (controllers)
  app.use(errorController.applicatonError);

  // invalid routes
  app.use('/*', errorRouter);
}

module.exports = pipeline;