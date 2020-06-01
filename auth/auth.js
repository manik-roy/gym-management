const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Authorization Fail' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
