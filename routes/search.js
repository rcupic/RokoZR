const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');
const socket = require('../routes/sockets.js');
const dbHandler = require('../service/dbHandler.js');
const Promise = require('promise');

router.get('/', function(req, res) {
	
	if(!req.session.id) res.redirect('login');
	
	res.render('search',{res:5});

	socket.on('connection',function(client) {
		
		client.on('search',function(value) {
						
			dbHandler.searchAd({name : value,id : req.session.id},function(err,results) {
				
				if(err) {
					
					socket.emit('finishedSearch',results);

				}
				
				socket.emit('finishedSearch',results);
				
			});				
		});
	});
});

router.post('/', function(req,res) {

		const promise = new Promise(function() {
			
			dbHandler.insertLike({amount : req.body.amount,id : req.session.id,selected : req.body.selected},function() {
			});
		}).then(
		
		dbHandler.updateLikes({amount : req.body.amount,selected : req.body.selected},function() {
		
			
		})).then(
		
		dbHandler.likeAd({amount : req.body.amount,id : req.session.id},function() {
			
			
			res.redirect('/');
			
		}));
});

module.exports = router;
