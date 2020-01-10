function unless(paths, middleware) {
  return function(req, res, next) {
    const tokenIsNotNeedAuthenicate = paths.indexOf(req.originalUrl) > -1;
    if (tokenIsNotNeedAuthenicate) {
      next()
    }
    else {
      return middleware(req, res, next);
    }
  }
}

module.exports = unless;
