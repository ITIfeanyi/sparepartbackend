const User = require("../models/Userschema");
const bcrypt = require("bcrypt");
const { loginCookie } = require("../auth/loginCookieToken");

module.exports = {
  registerGet: (req, res) => {
    res.render("Register", { title: "B-Mart | Register" });
  },
  registerPost: async (req, res) => {
    let { firstName, lastName, email, password } = req.body;

    if (firstName === "" || firstName.trim() === "") {
      res.status(400);
      req.flash("error_msg", "What about your first name?");
      return res.redirect("http://localhost:3000/register");
    }
    if (lastName === "" || lastName.trim() === "") {
      res.status(400);
      req.flash("error_msg", "What about your last name?");
      return res.redirect("http://localhost:3000/register");
    }
    if (email === "" || email.trim() === "") {
      res.status(400);
      req.flash("error_msg", "What about your email?");
      return res.redirect("http://localhost:3000/register");
    }
    if (password === "" || password.trim() === "") {
      res.status(400);
      req.flash("error_msg", "What about your password?");
      return res.redirect("http://localhost:3000/register");
    }

    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        req.flash("error_msg", "This email is already in use");
        return res.redirect("http://localhost:3000/register");
      }
      password = await bcrypt.hash(password, 10);
      const newUser = await new User({
        firstName,
        lastName,
        email,
        password,
      });

      await newUser.save();

      const token = loginCookie(newUser._id);
      res.cookie("B_Mart_user", token, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
        httpOnly: true,
      });
      res.redirect("http://localhost:3000");
    } catch (error) {
      res.status(500);
      req.flash("error_msg", "An error occured");
      return res.redirect("http://localhost:3000/register");
    }
  },
};
