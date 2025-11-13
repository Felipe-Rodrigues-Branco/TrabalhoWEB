function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
}

function isNotAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return next();
  }
  res.redirect('/dashboard');
}

module.exports = { isAuthenticated, isNotAuthenticated };
