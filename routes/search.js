const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');
const socket = require('../routes/sockets.js');
const dbHandler = require('../service/dbHandler.js');
const Promise = require('promise');

router.get('/', function(req, res, next) {
	
	if(!req.session.id) res.redirect('login');
	
	res.render('search',{res:5});

	socket.on('connection',function(client){
		
		client.on('search',function(value){
						
			dbHandler.searchAd(value,req.session.id,function(err,results){
				
				if(err) {
					
					socket.emit('finishedSearch',results);

				}
				
				socket.emit('finishedSearch',results);
				
			});				
		});
	});
});

router.post('/', function(req,res,next){

		const promise = new Promise(function(){
			console.log(req.body);
			dbHandler.likeAd(req.body,req.session.id,function(err,results){
				
				if(err){
					
					res.status(500).json(err);
				
				}
			});
		}).then(
		
		dbHandler.updateLikes(req.body,function(err,results){
			
			if(err){
				
					res.status(500).json(err);

			}
			
			res.redirect('/');
			
		}));
});

module.exports = router;
