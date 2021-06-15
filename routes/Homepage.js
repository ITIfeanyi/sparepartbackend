const express = require("express");
const { Homepage } = require("../Controller/HomepageController");
const router = express.Router();

router.get("/", Homepage);

module.exports = router;
