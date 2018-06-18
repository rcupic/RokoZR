const creditCardRouter = require('express').Router();
const userController = require('../controller/userController');
const creditCardController = require('../controller/creditCardController');
const async = require('async');

creditCardRouter.get('/', function(req, res) {
  if (req.session.user) {
    userController.FindById(req.session.user.id, (err, user) => {
      if (err) {
        res.redirect("/");
      }
      req.session.user = user;
      res.render('creditCard', {
        messages: req.session.user.unreadMessages,
        name: req.session.user.username,
        account: req.session.user.account,
        balance: req.session.user.balance
      });
    });
  }else res.redirect('/');
});
creditCardRouter.put('/', (req, res) => {
  if (req.session.user) {
    async.waterfall(
      [
        callback => {
          creditCardController.FindByUserAndId({cardNo:req.body.cardNo,userId:req.session.user.id},(err,result) => {
            if(err)
              return callback(err);
            if(!result)
              return callback({name:'error',message:'There is no card with that credential'});
            return callback(null);
          });
        },
        callback => {
          userController.Update({
            id: req.session.user.id,
            account: parseInt(req.session.user.account) + parseInt(req.body.amount)
          });
          return callback(null);
        }
      ],
      err => {
        if(err)
          res.json(err);
        else
          res.json('');
      } 
    );
  } else res.redirect('/');
});
module.exports = creditCardRouter;
