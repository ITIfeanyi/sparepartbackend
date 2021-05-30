const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

require("./config/db");

app.use(cors());
app.listen(PORT, () => console.log(`Application running on ${PORT}`));
