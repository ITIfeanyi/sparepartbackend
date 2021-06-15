const jwt = require("jsonwebtoken");
const User = require("../models/Userschema");

module.exports = {
  loginCookie: (id) => {
    return jwt.sign({ userId: id }, process.env.JWTSECRET, {
      expiresIn: 1000 * 60 * 60 * 60 * 24 * 2,
    });
  },

  redirectIfCookieExist: async (req, res, next) => {
    try {
      const cookie = req.cookies.B_Mart_user;
      jwt.verify(cookie, process.env.JWTSECRET, function (err, decodedToken) {
        if (err) {
          res.clearCookie("B_Mart_user", { path: "/" });
          next();
        } else {
          if (!decodedToken) {
            res.clearCookie("B_Mart_user", { path: "/" });
            next();
          } else {
            return res.redirect("https://pure-depths-31131.herokuapp.com");
          }
        }
      });
    } catch (error) {
      res.clearCookie("B_Mart_user", { path: "/" });
      return res.redirect("https://pure-depths-31131.herokuapp.com");
    }
  },
};
