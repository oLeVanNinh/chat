const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = process.env.SECRET;

function errorResponse(res, status, message) {
  res.status(status);
  return res.json({
    success: false,
    message: message
  })
}

function authToken(req, res, next) {
  let token = req.headers['authorization'];

  if (!!token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    try {
      let decoded = jwt.verify(token, secret);
      let username = decoded.username;

      User.findOne({username: username}, function(err, user) {
        if (user) {
          next();
        }
        else {
          return errorResponse(res, 401, 'Token is not valid');
        }
      })
    }
    catch(err) {
      return errorResponse(res, 401, 'Token is not valid');
    }
  }
  else {
    return errorResponse(res, 401, 'Auth token is not supplied');
  }
}

module.exports = authToken;
