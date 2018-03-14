const secureRouter = require('express').Router();
const adController = require('../controller/adController');

secureRouter.get('/',function(req,res) {
	if(req.session.user) //CHECK IF USER IS LOGGED IN	
		res.render('secure',{name: req.session.user.username});	
	else	
		res.redirect('/login');
});
secureRouter.post('/',function(req,res) {
	adController.Create(req.body,(err) => {
		if(err)
			res.redirect('/secure/newAd');
		else
			res.redirect('/secure/myAd');
	});
});
secureRouter.get('/newAd',function(req,res) {
	res.render('newAd');
});
module.exports = secureRouter;