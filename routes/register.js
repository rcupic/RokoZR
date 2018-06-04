const registerRouter = require("express").Router();
const authController = require("../controller/authController");

registerRouter.get("/", function(req, res) {
  res.render("register");
});
registerRouter.post("/", function(req, res) {
  authController.Register(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("register");
    } else {
      req.session.user = result;
      res.redirect("secure");
    }
  });
});
module.exports = registerRouter;
