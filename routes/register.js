const registerRouter=require('express').Router();
		
registerRouter.get('/',function(req,res) {
	
	res.render('register');
	
});
module.exports = registerRouter;