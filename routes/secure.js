const secureRouter = require('express').Router();

secureRouter.get('/',function(req,res) {
	if(req.session.user)
		res.render('secure',{name: req.session.user.username});	
	else	
		res.redirect('/');
});
module.exports = secureRouter;