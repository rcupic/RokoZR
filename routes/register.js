const express=require('express');
const router = express.Router();
const connection = require('../db/db.js');
const accountant = require('../service/accountant.js');
const async = require('async');
const Promise = require('promise');
const dbHandler = require('../service/dbHandler.js')
		
router.get('/',function(req,res,next){
	
	res.render('register');
	
});

router.post('/',function(req,res,next){
	
	const promise = new Promise(function(){

		accountant.checkIllegalChar(req.body.usrname,function(err){
		
			if(err){
			
				res.status(500).json(err);
				res.redirect('register');
			}
		
		})}).then(

		accountant.checkSpacePassword(req.body.password,function(err,result){
		
			if(err){
			
				res.status(500).json(err);
				res.redirect('register');
			
			}
		
		})).then(
	
		accountant.checkRePassword(req.body.password,req.body.repassword,function(err){
		
			if(err){
			
				res.status(500).json(err);
				res.redirect('register');
			}
		
		})).then(
	
		dbHandler.checkForName(req.body.usrname,function(err){
		
			if(err){
				
				res.status(500).json(err);
				res.redirect('register');
				
			}
		
		})).then(
	
		dbHandler.checkForMail(req.body.email,function(err){
		
			if(err){
				
				res.status(500).json(err);
				res.redirect('register');
				
			}
		
		})).then(
			
			dbHandler.addNewUser(req.body,function(err){
				
				if(err) res.status(500).json(err);
				
				res.redirect('login');
				
			})).catch(function(err){
			
			res.status(500).json(err);
			
		});
});

module.exports=router;
