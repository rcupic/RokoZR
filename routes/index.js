const router = require('express').Router();

router.get('/', function(req, res) {
	
	res.render('index',{title: 'HeartBid'});
	
});

module.exports = router;
