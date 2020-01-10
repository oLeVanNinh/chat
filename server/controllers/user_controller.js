const User = require("../models/user");
const UserController = {};


const createToken = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(401);
    return res.json({ error: "Username or password is required"});
  }

  User.findOne({ username: username }, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      return res.json({token: user.token() });
    }
    else {
      return res.status(401).send({
        message: 'Username or password is not correct'
      });
    }
  });
}

const registration = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const display_name = req.body.display_name;

  if (!username || !password || !display_name) {
    return res.status(401).send({ error: "Username or password is required"});
  }

  User.findOne({ username: username }, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      return res.status(422).send({ message: 'User name is taken' });
    }

    const newUser = new User({
      display_name: display_name,
      username: username,
      password: password
    });

    newUser.save().then(user => {
      return res.json({token: user.token() });
    }).catch(err => {
      return next(err);
    })
  });
}

UserController.createToken = createToken;
UserController.registration = registration;

module.exports = UserController;
