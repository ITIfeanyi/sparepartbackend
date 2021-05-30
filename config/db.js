const mongoose = require("mongoose");

mongoose.connect(
  `${process.env.MONGO_URI}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("App connected to database");
    }
  }
);
