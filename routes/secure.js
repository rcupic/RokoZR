const express = require('express');
const router = express.Router();

router.get('/',function(req,res,next){
	
	if(req.session.username){//CHECK IF USER IS LOGGED IN
		
		console.log(req.session);
		res.render('secure',{name: req.session.username,heart: req.session.hearts,rank: req.session.rank});
	
	}else{
		
		res.redirect('/login');
		
	}
	
});

module.exports = router;