function Search(){
	const socket = io('http://localhost:5000');
	
	const txt = document.getElementById('searchInput').value;
	
	socket.emit('search',txt);
	
	socket.on('finishedSearch',function(res){
		
		let i = 0;
		if(res.length == 0){
			
			document.getElementById('pSearch0').innerHTML = "<p>No such AD!!</p>";
			document.getElementById('formSub').innerHTML = "";
			document.getElementById('butSub').innerHTML = "";
			
		}else{
		while(i<res.length){
			
			document.getElementById('pSearch'+i).innerHTML = "<hr><p>"+res[i].name+"</p><p>"+res[i].description+"</p><p>"+res[i].likes+"</p><input type='radio' name='selected' value='"+res[i].idad+"'><hr>";
			i++;
			
		}
		document.getElementById('formSub').innerHTML = "<input type='text' name='amount' placeholder='Amount'>";
		document.getElementById('butSub').innerHTML = "<input type='submit' id='submitButt' value='Submit'>";
		}
	});
}
