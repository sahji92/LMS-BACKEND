const { emailValidator } = require("../constants/validator");
const Users = require("../models/users");
var md5 = require("md5");

const userRegistration = (req, res) => {
  try {
    console.log(req.body.email);
    console.log(emailValidator(req.body.email));
    if (!emailValidator(req.body.email)) {
     return res.json({
        status: 400,
        message: "plz put valid email",
      });
    }
    req.body.password = md5(req.body.password);
    const user = new Users(req.body);
    user.save()
      .then(result => {
       return res.json({
          status: 201,
          message: "user created successfully",
        });
      })
      .catch((err) => {
       return res.json({
          status: 400,
          message: "Bad request",
        });
      });
  } catch {
    return res.json({
      status: 500,
      message: "Server error",
    });
  }
};
const userLogin = (req, res) => {
  let { email, password } = req.body;
  password = md5(password);
  Users.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return res.json({
          status: 401,
          message: "auth Error",
        });
      }
      return res.json({
        status: 200,
        message: user,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        message: "Server Error",
      });
    });
};
module.exports = {
  userRegistration,
  userLogin,
};