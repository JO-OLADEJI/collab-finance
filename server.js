const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:start');
const app = express();

const homeRouter = require('./routes/home.js');
const errorRouter = require('./routes/error.js');
const userRoutes = require('./routes/user.js');
const connectDB = require('./database/connect.js');


// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('short'));


// connect DB
connectDB(process.env.DB_URI);


// routes
app.use('/', homeRouter);
app.use('/api/users', userRoutes);
app.use('/*', errorRouter);


// setup for listening
const PORT = process.env.PORT || 3001;
app.listen(
  PORT, 
  () => debug(`Server running on http://localhost:${PORT}`)
);