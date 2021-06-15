module.exports = {
  logoutController: (req, res) => {
    res.clearCookie("B_Mart_user", { path: "/" });
    res.redirect("https://pure-depths-31131.herokuapp.com");
  },
};
