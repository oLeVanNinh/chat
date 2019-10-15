function unless(path, middleware) {
  return function(req, res, next) {
    if (path == req.originalUrl) {
      next()
    }
    else {
      return middleware(req, res, next);
    }
  }
}

module.exports = unless;
