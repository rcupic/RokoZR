const connection = require('../db/db.js');
const Promise = require('promise');

class accountant {

	accountant(){
	
	};

	checkIllegalChar(data,callback){
	
		if(data == null) return callback('Wrong username input');
	
		for(let i=0;i<data.length;i++){

			if((data[i]<'A' || data[i]>'Z')&&(data[i]<'a' || data[i]>'z')){
			
				return callback('Username contains illegal char');
			}
		
		}
		
		return callback(null);
	
	};

	checkSpacePassword(data,callback){
		
		for(let i=0;i<data.length;i++){
			
			if(data==null) return callback('Wrong password input');
		
			if(data[i]==' '){
			
				return callback('Password containts space');
			
			}
		}
		
		return callback(null);
		
	};
	
	checkRePassword(first,second,callback){
		
		if(first == null) return callback('The first password is invaild');
		
		if(second == null) return callback('The second password is invalid');
		
		if(first===second) return callback(null);
		
		return callback('Your passwords don\'t match');
		
	};
	
	checkPasswordLength(data,callback){
		
		if(data.length < 8){
			
			return callback('password has less than 8 characters');
			
		}
		
		return callback(null);
	}
	
};

module.exports = new accountant();
