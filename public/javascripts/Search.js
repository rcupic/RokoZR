function Search(){
	const socket = io('http://localhost:5000');
	
	const txt = document.getElementById('searchInput').value;
	
	socket.emit('search',txt);
	
	socket.on('finishedSearch',function(res){
		
		let i = 0;
		while(i<res.length){
			console.log(res[i].description);
			document.getElementById('pSearch'+i).innerHTML = "<p>"+res[i].name+"</p></br><p>"+res[i].description+"</p></br><input type='text' name='amount' placeholder='Amount'></br><input type='radio' name='id' value='"+res[i].idad+"'>";
			i++;
		 
		}		
	});
}
