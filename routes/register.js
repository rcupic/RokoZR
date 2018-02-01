const express=require('express');
const router = express.Router();
const accountant = require('../service/accountant.js');
const async = require('async');
const Promise = require('promise');
const dbHandler = require('../service/dbHandler.js')
		
router.get('/',function(req,res,next){
	
	res.render('register');
	
});

router.post('/',function(req,res,next){
	
	const promise = new Promise(function(resolve,reject){

		accountant.checkIllegalChar(req.body.usrname,function(err){
		
			if(err){
			
				console.log(err);
				reject(1);
				
			}else{
				
				resolve();
				
			}
		
		})}).then(function(fromResolve){

		accountant.checkSpacePassword(req.body.password,function(err,result){
		
			if(err){
			
				console.log(err);
				reject(2);
			
			}
		
			console.log(2);
		})}
		).then(function(fromResolve){
	
		accountant.checkRePassword(req.body.password,req.body.repassword,function(err){
		
			if(err){
			
				console.log(err);
				reject();
			}
		})}
		).then(function(fromResolve){
	
		dbHandler.checkForName(req.body.usrname,function(err){
		
			if(err){
				
				console.log(err);
				reject();
				
			}
		})}
		).then(function(fromResolve){
	
		dbHandler.checkForMail(req.body.email,function(err){
		
			if(err){
				
				console.log(err);
				reject();
				
			}
		})}
		).then(function(fromResolve){
			
			dbHandler.addNewUser(req.body,function(err){
				
				if(err){
					
					console.log(err);
					reject();
					
				}else{
				
					res.redirect('login');
					
				}
		})}
		).catch(function(fromReject){
			
			res.redirect('register');

		});
});

module.exports=router;
