const passport = require("passport");
const express = require("express");
const router = express();

const { loginCookie } = require("../auth/loginCookieToken");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const token = loginCookie(req.user._id);
    res.cookie("B_Mart_user", token, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
      httpOnly: true,
    });
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
