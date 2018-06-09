const registerRouter = require('express').Router();
const authController = require('../controller/authController');

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
      res.json({message:'successful'});
    }
  });
});
module.exports = registerRouter;
