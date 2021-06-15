const express = require("express");
const {
  registerPost,
  registerGet,
} = require("../Controller/RegisterController");
const { loginGet, loginPost } = require("../Controller/LoginController");
const { redirectIfCookieExist } = require("../auth/loginCookieToken");
const router = express.Router();

router.get("/login", redirectIfCookieExist, loginGet);
router.post("/login", loginPost);

router.get("/register", registerGet);
router.post("/register", registerPost);

module.exports = router;
