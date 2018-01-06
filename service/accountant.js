class accountant {

	accountant(){
	
	};

	checkIllegalChar(const data,callback){
	
	if(data == NULL) return callback('Wrong input');
	
	for(let i=0;i<data.length;i++){

		if((uname[i]<'A' || uname[i]>'Z')&&(uname[i]<'a' || uname[i]>'z')){
			
			return callback('Username contains illegal char');
		}
		
	}
	
	return callback(NULL,data);
	
	};

}

module.exports = new accountant();