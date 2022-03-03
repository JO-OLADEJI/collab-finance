const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
  // get the token from request header
  const token = req.header('X-auth-token');

  // manage errors of undefined token
  if (!token) {
    return res
      .status(400)
      .json({
        'result': false,
        'data': null,
        'error': 'auth token not sent ❗'
      });
  }

  try {
    const userJsonEncodedObject = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userJsonEncodedObject;
    next();
  }
  catch (exception) {
    return res
      .status(500)
      .json({
        'result': false,
        'data': null,
        'error': `${exception.message} ❗`
      });
  }
}

module.exports = {
  auth
}