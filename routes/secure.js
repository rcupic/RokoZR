const secureRouter = require('express').Router();
const userController = require('../controller/userController');

secureRouter.get('/', function(req, res) {
  if (req.session.user) {
    userController.FindById(req.session.user.id, (err, user) => {
      if (err) res.redirect('/');
      req.session.user = user;
      res.render('secure', {
        messages: req.session.user.unreadMessages,
        name: user.username,
        account: user.account,
        balance: user.balance
      });
    });
  } else res.redirect('/');
});
module.exports = secureRouter;
