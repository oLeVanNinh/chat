const mongoose = require("mongoose");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_FACTOR = 10;
const secret = process.env.SECRET

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  friends: [Number],
  channels: [Number],
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre("save", function(done) {
  const user = this;
  if (!user.isModified("password")) {
    return done();
  }

  bcypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err)};

    bcypt.hash(user.password, salt, function(err, hash) {
      if (err) { return done(err) }
      user.password = hash;
      done();
    })
  })
})

userSchema.methods.checkPassword = function(guess, done) {
  bcypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  })
}

userSchema.methods.token = function() {
  let payload = {
    username: this.username
  }

  const token = jwt.sign(payload, secret);
  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
