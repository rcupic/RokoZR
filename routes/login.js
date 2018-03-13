const userRouter = require('express').Router();
const authController = require('../controller/authController');

userRouter.get('/',function(req,res) {
	if(req.session.user)
		res.redirect('secure');	
	else
		res.render('login');	
});
userRouter.post('/',function(req,res) {
	authController.Login(req.body,(err,result) => {
		if(err)
			res.redirect('login');
		else{
			req.session.user = result;
			res.redirect('secure');
		}
	});	
});
module.exports = userRouter;