const jwt = require("jsonwebtoken");
const User = require("../models/Userschema");

module.exports = {
  loginCookie: (id) => {
    return jwt.sign({ userId: id }, process.env.JWTSECRET, {
      expiresIn: 1000 * 60 * 60 * 60 * 24 * 2,
    });
  },
  checkUserExistInCookie: async (cookie) => {
    if (cookie === undefined) {
      return false;
    } else {
      const { userId } = jwt.verify(cookie, process.env.JWTSECRET);
      if (!userId) {
        return false;
      } else {
        const user = await User.findById(userId);
        return user.firstName;
      }
    }
  },
};
