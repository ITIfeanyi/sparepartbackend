const User = require("../models/Userschema");
const bcrypt = require("bcrypt");
const { loginCookie } = require("../auth/loginCookieToken");

module.exports = {
  loginGet: (req, res) => {
    res.render("Login", { title: "B-Mart | Login" });
  },
  loginPost: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email === "" || email.trim() === "") {
        res.status(400);
        req.flash("error_msg", "What about your email?");
        return res.redirect("https://pure-depths-31131.herokuapp.com/login");
      }
      if (password === "" || password.trim() === "") {
        res.status(400);
        req.flash("error_msg", "What about your password?");
        return res.redirect("https://pure-depths-31131.herokuapp.com/login");
      }

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404);
        req.flash("error_msg", "User not found.");
        return res.redirect("https://pure-depths-31131.herokuapp.com/login");
      } else {
        if (user.googleID) {
          res.status(400);
          req.flash("error_msg", "User not found");
          return res.redirect("https://pure-depths-31131.herokuapp.com/login");
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          res.status(400);
          req.flash("error_msg", "Password incorrect.");
          return res.redirect("https://pure-depths-31131.herokuapp.com/login");
        } else {
          const token = loginCookie(user._id);
          res.cookie("B_Mart_user", token, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
            httpOnly: true,
          });
          res.status(200);
          return res.redirect("https://pure-depths-31131.herokuapp.com");
        }
      }
    } catch (error) {
      console.log(error.message);
      res.status(500);
      req.flash("error_msg", "An error occured");
      return res.redirect("https://pure-depths-31131.herokuapp.com/login");
    }
  },
};
