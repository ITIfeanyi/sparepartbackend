const { checkUserExistInCookie } = require("../auth/loginCookieToken");

module.exports = {
  Homepage: async (req, res) => {
    const user = await checkUserExistInCookie(req.cookies.B_Mart_user);

    res.render("Homepage", { title: "Homepage-BMart", username: user });
  },
};
