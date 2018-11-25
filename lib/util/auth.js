const { Strategy, ExtractJwt } = require('passport-jwt');
const { unauthorized } = require('boom');

const config = {
  secretOrKey: process.env.JWT_KEY,
  algorithm: ['HS256'],
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

function verify(jwt, done) {
  if (jwt.user === 'erin') {
    return done(null, 'erin');
  }

  if (jwt.user === 'stephen') {
    return done(null, 'stephen');
  }

  return done(unauthorized('invalid token'));
}

module.exports = new Strategy(config, verify);
