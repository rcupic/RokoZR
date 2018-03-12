const logoutRouter = require('express').Router();

logoutRouter.get('/',function(err,req,res) {

	req.session.destroy(function(err) {
		if(err)
			res.status(500).json(err);
	});
	res.redirect('login');
});
module.exports=logoutRouter;