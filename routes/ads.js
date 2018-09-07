const adsRouter = require('express').Router();
const adsController = require('../controller/adsController');
const userController = require('../controller/userController');

adsRouter.post('/', (req, res) => {
  if (req.session.user) {
      req.body.userId = req.session.user.id;
      adsController.Create(req.body, err => {
        if (err) res.json({name:'error',message:'Something went wrong'});
        res.json({message:'Successful'});
      });
  } else res.redirect('/');
});
adsRouter.post('/collect', (req, res) => {
  if (req.session.user) {
    adsController.Collect(req.session.user, err => {
      if (err) res.send({ message: 'error' });
      res.send({ message: 'finished' });
    });
  } else res.redirect('/');
});
adsRouter.get('/myAd', (req, res) => {
  if (req.session.user) {
    userController.FindById(req.session.user.id, (err, user) => {
      if (err) res.redirect('/');
        req.session.user = user;
    });
    adsController.GetUsersAd(req.session.user.id, (err, result) => {
      if (err) res.redirect('secure');
      else if (result === null) res.render('newAd',{messages:req.session.user.messageTo.length});
      else
        res.render('myAd', {
          messages: req.session.user.messageTo.length,
          name: req.session.user.username,
          account: req.session.user.account,
          balance: req.session.user.balance,
          adName: result.dataValues.name,
          donations: result.dataValues.donations
        });
    });
  } else res.redirect('/');
});
adsRouter.get('/newAd', (req, res) => {
  if (req.session.user) {
    adsController.GetUsersAd(req.session.user.id, (err, result) => {
      if (err) return res.redirect('secure');
      else if (result !== null)
        return res.render('myAd', {
          messages: req.session.user.messageTo.length,
          name: req.session.user.username,
          account: req.session.user.account,
          balance: req.session.user.balance,
          value: result.dataValues.amount,
          adName: result.dataValues.name,
          donations: result.dataValues.donations
        });
      else return res.render('newAd',{message:req.session.user.messageTo.length});
    });
  }else 
    res.redirect('/ads/myAd');
});
adsRouter.get('/', (req, res) => {
  adsController.FindByName(
    { search: req.query.search, userId: req.session.user.id },
    (err, result) => {
      if (err) res.send({ name: 'error', message: 'no user' });
      else if (result === null) res.send({ name: 'error', message: 'no user' });
      else res.send(result);
    }
  );
});
module.exports = adsRouter;
