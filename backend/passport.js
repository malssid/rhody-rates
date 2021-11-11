const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const db = require("./dbConnect");
const bcrypt = require("bcrypt");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization with JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await db("student").where({ id: payload.sub });
        if (user.length > 0) {
          return done(null, user[0]);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// authentication with local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db("student").where({ username: username });
      if (user.length === 0) {
        return done(null, false);
      }
      const result = await bcrypt.compare(password, user[0].password);
      if (result) {
        return done(null, user[0]);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  })
);
