const userRouter = require('express').Router();
const authController = require('../controller/authController');

userRouter.get('/',function(req,res) {
	if(req.session.id)
		res.redirect('secure');	
	res.render('login');	
});
userRouter.post('/',function(req,res) {
	authController.Login(req.body,(err,result) => {
		if(err)
			res.redirect('login');
		else{
			req.user = result;
			res.redirect('secure');
		}
	});	
});
module.exports = userRouter;