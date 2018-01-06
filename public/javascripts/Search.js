function Search(){

	var socket = io('http://localhost:5000');
	
	var txt = document.getElementById('searchInput').value;
	
	socket.emit('search',txt);
	
	socket.on('finishedSearch',function(res){
		
		document.getElementById('pSearch0').innerHTML = res[0].name+","+res[0].description;
				
	});
}
