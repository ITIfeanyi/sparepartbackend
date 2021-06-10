const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT;
//DB config
// require("./config/db");

app.use(express.static("public"));

//Ejs
app.set("view engine", "ejs");

//Cors
app.use(cors());

//Routes
const Homepage = require("./routes/Homepage");
app.use("/", Homepage);
app.listen(PORT, () => console.log(`Application running on ${PORT}`));
