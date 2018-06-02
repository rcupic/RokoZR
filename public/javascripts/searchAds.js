function Search(){
	const searchInput = document.getElementById('searchInput').value;
	const myRequest = new Request('http://localhost:5001/ads?search='+searchInput+'',
	{
		credentials: "same-origin"
	});
	fetch(myRequest)
	.then(res => {
		res.json()
		.then(data => {
			console.log(data);
			console.log(searchInput);
			console.log(data);
			let i = 0;
			if(data.length == 0){
				
				document.getElementById('pSearch0').innerHTML = "<p>No such AD!!</p>";
				document.getElementById('formSub').innerHTML = "";
				document.getElementById('butSub').innerHTML = "";
				
			}else{
				while(i<data.length){
					document.getElementById('pSearch'+i).innerHTML = "<p>Name: "+data[i].name+"</p><p>Amount: "+data[i].amount+" hrk</p><p>Donations: "+data[i].donations+" hrk</p><p>By: "+data[i].user.username+"</p>";	
					document.getElementById('formSub'+i).innerHTML = "<p><button type='submit' id='submitButt'><i class='fas fa-hand-holding-usd'></i></button><input type='text' name='donations' values='"+data[i].id+"' placeholder='Amount...'><p><hr>";
					document.getElementById('form'+i).action = "?id="+data[i++].id;
				}
			}
		})	
	})
	.catch(err => {
		console.log(err);
	})
}
