const messagesRouter = require('express').Router();
const messagesController = require('../controller/messagesController');
const userController = require('../controller/userController');

messagesRouter.get('/', function(req, res) {
  userController.FindById(req.session.user.id, (err, user) => {
    if (err) res.redirect('/');
    req.session.user = user;
    res.render('message', {
      messages: req.session.user.messageTo,
      name: req.session.user.username,
      account: req.session.user.account,
      balance: req.session.user.balance
    });
  });
});
messagesRouter.get('/myMessages', function(req, res) {
  if (req.session.user) {
    userController.FindById(req.session.user.id, (err, user) => {
      if (err) res.redirect('/');
      req.session.user = user;
    });
    messagesController.FindBySentTo(req.session.user.id, (err, messages) => {
      if (err) res.json(err);
      res.render('myMessages', {
        name: req.session.user.username,
        account: req.session.user.account,
        balance: req.session.user.balance,
        messages: messages
      });
    });
  } else res.redirect('/');
});
messagesRouter.get('/fetch', function(req, res) {
  messagesController.FindBySentTo(req.session.user.id, (err, messages) => {
    if (err) res.json(err);
    res.json(messages);
  });
});
messagesRouter.post('/', function(req, res) {
  messagesController.Create(
    {
      createdBy: req.session.user.id,
      text: req.body.text,
      sentTo: req.query.id
    },
    err => {
      if (err) res.json(err);
      else res.json({message:'successful'});
    }
  );
});
messagesRouter.post('/delete', function(req, res) {
  messagesController.Delete(req.query.id, err => {
    if (err) res.json(err);
    res.json({ message: 'done' });
  });
});
module.exports = messagesRouter;
