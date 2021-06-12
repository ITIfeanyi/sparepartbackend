const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const cookiePaser = require("cookie-parser");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
//DB config
require("./config/db");

const passportSetup = require("./config/googleStategy");

app.use(express.static("public"));

//Ejs
app.set("view engine", "ejs");

//Cors
app.use(cors());
app.use(cookiePaser());

app.use(passport.initialize());
app.use(passport.session());

//Routes
const Homepage = require("./routes/Homepage");
const loginpage = require("./routes/login");
app.use("/", Homepage);
app.use("/", loginpage);
app.listen(PORT, () => console.log(`Application running on ${PORT}`));
