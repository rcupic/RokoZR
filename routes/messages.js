const messagesRouter = require("express").Router();
const messagesController = require('../controller/messagesController');

messagesRouter.get("/", function(req, res) {
    res.render("message", {
        name: req.session.user.username,
        account: req.session.user.account,
        balance: req.session.user.balance,
      });
});
messagesRouter.get("/myMessages", function(req, res) {
    messagesController.FindBySentTo(req.session.user.id,(err,messages) => {
        console.log(messages);
        console.log(messages[0].creator);
        if(err) res.json(err);
        res.render('myMessages', {
            name: req.session.user.username,
            account: req.session.user.account,
            balance: req.session.user.balance,
            messages: messages
          });
    });
});
messagesRouter.get("/fetch", function(req, res) {
    messagesController.FindBySentTo(req.session.user.id,(err,messages) => {
        if(err) res.json(err);
        res.json(messages);
    });
});
messagesRouter.post("/", function(req, res) {
    messagesController.Create({createdBy:req.session.user.id,text:req.body.text,sentTo:req.query.id},err => {
        if(err) res.json(err);
        res.redirect('/secure');
    });
});
module.exports = messagesRouter;
