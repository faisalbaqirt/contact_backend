const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const pool = require("../db/config");

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "secret",
};

const verify = (payload, done) => {
  const query = "SELECT * FROM users WHERE id = $1 LIMIT 1";

  pool.query(query, [payload.id], (err, result) => {
    if (err) {
      return done(err, false, {
        message: err.message,
      });
    }

    const user = result.rows[0];

    if (!user) {
      return done(null, false, {
        message: "User not found",
      });
    }

    return done(null, user);
  });
};

passport.use(new JwtStrategy(options, verify));

module.exports = passport;
