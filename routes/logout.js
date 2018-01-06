var express = require('express');
var router = express.Router();

router.get('/',function(err,req,res){

	req.session.destroy(function(err){
		
		if(err){
			res.status(500).json(err);
		}
		
	});
	res.redirect('login');

});

module.exports=router;
