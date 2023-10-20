const md5 = require("md5");
const LocalStrategy = require("passport-local");
const Users = require("./models/users");

const initializePassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        Users.findOne({ email: username })
          .then((user) => {
            if (!user) {
              console.log("user doesnt exist");
              return done(null, false, { message: "user doesnot exist" });
            }
            if (user.password !== md5(password)) {
              console.log("password doesnt match");
              return done(null, false);
            }
            console.log("it passed successfully");
            return done(null, user);
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
const isAuthenticated = (req, res, next) => {
  if (req.user) return next()

  res.status(403).json({
    status: 403,
    message: "user not authorised, plz login first"
  });
};

module.exports = {
  initializePassport,
  isAuthenticated
};
