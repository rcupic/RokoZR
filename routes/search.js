const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');
const socket = require('../routes/sockets.js');


router.get('/', function(req, res, next) {
	
	res.render('search',{res:0});
	
	socket.on('connection',function(client){
		
		client.on('search',function(value){
			
			const sql = "SELECT * FROM usersdb.ads WHERE active='1' AND ads.name='"+value+"'";
			
			connection.query(sql,function(err,results,fields){
	
				const stringRes = JSON.parse(JSON.stringify(results));
				
				socket.emit('finishedSearch',stringRes);
				console.log('here');
			});
			
		});
	});
});

module.exports = router;