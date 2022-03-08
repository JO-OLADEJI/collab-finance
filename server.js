const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const debug = require('debug')('app:start');
const connectDB = require('./utils/connect.js');
const pipeline = require('./utils/pipeline.js');


// connect DB
connectDB(process.env.DB_URI);


// application pipeline
pipeline(app);


// setup for listening
const PORT = process.env.PORT || 3001;
app.listen(
  PORT, 
  () => debug(`Server running on http://localhost:${PORT}`)
);