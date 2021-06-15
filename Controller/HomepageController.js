const jwt = require("jsonwebtoken");
const User = require("../models/Userschema");

module.exports = {
  Homepage: async (req, res) => {
    try {
      const user = await jwt.verify(
        req.cookies.B_Mart_user,
        process.env.JWTSECRET,
        async (err, userId) => {
          if (err) {
            return false;
          }
          if (!userId) {
            return false;
          } else {
            const user = await User.findById(userId.userId);
            return user;
          }
        }
      );
      res.render("Homepage", {
        title: "Homepage-BMart",
        username: user.firstName,
      });
    } catch (error) {
      res.redirect("https://pure-depths-31131.herokuapp.com");
    }
  },
};
