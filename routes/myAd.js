const express = require('express');
const router = express.Router();
const socket = require('../routes/sockets.js');
const connection = require('../db/db.js');

router.get('/',function(req,res,next){
	
	let sql = "SELECT * FROM usersdb.ads,usersdb.users WHERE usersdb.users.iduser="+req.session.id+" AND usersdb.users.iduser = usersdb.ads.iduser AND usersdb.ads.active = 1";
	
	connection.query(sql,function(err,results,fields){//TREBA PROVJERITI PRIJE IMA LI UOPCE TRENUTNE REKLAME

		if(results.length){
			
			const stringRes = JSON.parse(JSON.stringify(results));
			console.log(stringRes);
			res.render('myAd',{name: stringRes[0].name,value: stringRes[0].value,cathegory: stringRes[0].cathegory, description: stringRes[0].description});
		
		}else{
			
			res.redirect('/secure');
			
		}
		
	});
	
	socket.on('connection',function(client){//REACT TO CONNECTION FROM CLIENT
	
		console.log('someone connected');
	
		client.on('CloseMyAd',function(client){//EVENT FOR CLOSING AD AND COLLECTIN LIKES
		
			console.log(req.session.id);
			console.log("closing");
		
			sql = "UPDATE usersdb.ads SET ads.active = 0 WHERE usersdb.ads.iduser="+req.session.id+" AND ads.active = 1";
	
	
			connection.query(sql,function(err,results,fields){//DEACTIVATION OF AD

				socket.emit('finishedDeletion');//SEND CONFIRMATION TO CLIENT
				
			});	
		});	
	});
});

module.exports = router;