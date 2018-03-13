const registerRouter = require('express').Router();
const authController = require('../controller/authController');
		
registerRouter.get('/',function(req,res) {
	
	res.render('register');
	
});
registerRouter.post('/',function(req,res) {
	authController.Register(req.body,(err,result) => {
		if(err)
			res.redirect('register');
		else{
			console.log(result.username);
			req.session.user.username = result.username;
			res.redirect('secure');
		}
	});
});
module.exports = registerRouter;