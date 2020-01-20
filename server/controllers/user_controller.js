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
      user.checkPassword(password, (err, isMatch) => {
        if (err) {
          return next(err)
        }
        else if (isMatch){
          return res.json({ token: user.token() });
        }
        else {
          return res.status(401).send({
            message: 'Username or password is not correct'
          });
        }
      });
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
  const password_confirmation = req.body.password_confirmation;
  const display_name = req.body.display_name;

  if (!username || !password || !display_name) {
    return res.status(401).send({ error: "Username or password is required"});
  }

  if (password !== password_confirmation) {
    return res.status(401).send({ error: "Password doesn't match"});
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
      return res.json({ token: user.token() });
    }).catch(err => {
      return next(err);
    })
  });
}

const getUserInfo = function(req, res, next) {
  if (res.locals.user) {
    const user = res.locals.user;
    const user_json = {
      id: user._id,
      username: user.username,
      display_name: user.display_name,
      avatar: user.image,
      friends: user.friends,
      channels: user.channels
    }
    return res.json(user_json);
  }
}

UserController.createToken = createToken;
UserController.registration = registration;
UserController.getUserInfo = getUserInfo;

module.exports = UserController;
