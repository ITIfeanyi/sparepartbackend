const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const cookiePaser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
//DB config
require("./config/db");

const passportSetup = require("./config/googleStategy");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Ejs
app.set("view engine", "ejs");

//Cors
app.use(cors());
app.use(cookiePaser());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  next();
});

//Routes
const Homepage = require("./routes/Homepage");
const googleStrategypage = require("./routes/googleStrategyRoute");
const login_register = require("./routes/login-register-page");
app.use("/", Homepage);
app.use("/", googleStrategypage);
app.use("/", login_register);

app.listen(PORT, () => console.log(`Application running on ${PORT}`));
