const secureRouter = require('express').Router();

secureRouter.get('/',function(req,res) {
	if(req.session.user) //CHECK IF USER IS LOGGED IN	
		res.render('secure',{name: req.session.user.username});	
	else	
		res.redirect('/login');
});
module.exports = secureRouter;