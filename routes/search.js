const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');
const socket = require('../routes/sockets.js');
const dbHandler = require('../service/dbHandler.js');

router.get('/', function(req, res, next) {
	
	res.render('search',{res:5});
	
	socket.on('connection',function(client){
		
		client.on('search',function(value){
						
			dbHandler.searchAd(value,function(err,results){
				
				if(err) res.status(500).json(err);
				
				socket.emit('finishedSearch',results);
			});				
		});
	});
});

router.post('/', function(req,res,next){
	
	console.log(req.body);
	
});

module.exports = router;
