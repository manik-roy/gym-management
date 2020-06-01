const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({ _id: payload._id })
        .then(user => {
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(err => done(err));
    })
  );
};
