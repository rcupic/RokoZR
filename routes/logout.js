var express = require('express');
var router = express.Router();

router.get('/',function(err,req,res){

	console.log(req.session.user);
	req.session.destroy();
	res.redirect('/');

});

module.exports=router;