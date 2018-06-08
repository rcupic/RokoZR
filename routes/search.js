const SearchRouter = require('express').Router();
const AdsController = require('../controller/adsController');
const userController = require('../controller/userController');

SearchRouter.get('/', (req, res) => {
  if (req.session.user) {
    userController.FindById(req.session.user.id, (err, user) => {
      if (err) res.redirect('/');
      req.session.user = user;
    });
    res.render('search', {
      name: req.session.user.username,
      account: req.session.user.account,
      balance: req.session.user.balance
    });
  } else res.redirect('/');
});
SearchRouter.post('/', (req, res) => {
  if (req.session.user) {
    if (req.session.user.account < parseInt(req.body.donations))
      res.redirect('/');
    else {
      req.session.user.balance =
        parseInt(req.session.user.balance) + parseInt(req.body.donations);
      req.session.user.account -= req.body.donations;
      AdsController.DonateToAd(
        {
          id: req.query.id,
          donations: req.body.donations
        },
        {
          id: req.session.user.id,
          account: req.session.user.account,
          balance: req.session.user.balance
        }
      );
      res.redirect('/secure');
    }
  } else res.redirect('/');
});
module.exports = SearchRouter;
