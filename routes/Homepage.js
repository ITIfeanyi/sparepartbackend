const express = require("express");
const { deleteHomeCookieIfErrorFound } = require("../auth/loginCookieToken");
const { Homepage } = require("../Controller/HomepageController");
const router = express.Router();

router.get("/", Homepage);

module.exports = router;
