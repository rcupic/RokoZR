const registerRouter = require('express').Router();
const authController = require('../controller/authController');
const lastReadingController = require('../controller/lastReadingController');

registerRouter.get('/', function(req, res) {
  res.render('register',{messages:0});
});
registerRouter.post('/', function(req, res) {
  authController.Register(req.body, (err, result) => {
    if(err) {
      if (err.name ==='error') res.json(err);
      else res.json({name:'error',message:'Something went wrong'});
    }else {
      req.session.user = result;
      req.session.user.messageTo = [];
      lastReadingController.Create({userId: result.id},err => {
        if(err)
          console.log(err);
      });
      res.json({message:'successful'});
    }
  });
});
module.exports = registerRouter;
