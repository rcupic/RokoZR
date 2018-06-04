const creditCardRouter = require("express").Router();
const userController = require("../controller/userController");

creditCardRouter.get("/", function(req, res) {
  if (req.session.user)
    res.render("creditCard", {
      name: req.session.user.username,
      account: req.session.user.account,
      balance: req.session.user.balance
    });
  else res.redirect("/");
});
creditCardRouter.post("/", (req, res) => {
  if (req.session.user) {
    userController.Update({
      id: req.session.user.id,
      account: parseInt(req.session.user.account) + parseInt(req.body.amount)
    });
    res.redirect("/secure");
  } else res.redirect("/");
});
module.exports = creditCardRouter;
