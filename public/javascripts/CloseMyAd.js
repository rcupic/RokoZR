function CloseMyAd(){

	var socket = io('http://localhost:5000');
	
	socket.emit('CloseMyAd');
	
	socket.on('finishedDeletion',function(){
		
		location.href='http://localhost:3000/myAd';
		
	});
}