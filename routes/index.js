const userRouter = require('express').Router();
const authController = require('../controller/authController');

userRouter.get('/', function(req, res) {
  if (req.session.user) res.redirect('secure');
  else res.render('index',{messages: 0});
});
userRouter.post('/', function(req, res) {
  authController.Login(req.body, (err, result) => {
    if (err) res.json({name:'error',message:'Something went wrong'});
    else if(result) {
      req.session.user = result;
      res.json({message:'successful'});
    }else {
      res.json({name:'error',message:'Wrong user input'});
    }
  });
});
module.exports = userRouter;
