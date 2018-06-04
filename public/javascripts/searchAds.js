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
			let i = 0;
			if(data.length == 0){
				
				document.getElementById('pSearch0').innerHTML = "<p>No such ad.</p>";
				document.getElementById('formSub').innerHTML = "";
				document.getElementById('butSub').innerHTML = "";
				
			}else{
				while(i<data.length){
					document.getElementById('pSearch'+i).innerHTML = "<hr><p>Name: "+data[i].name+"</p><p>Amount: "+data[i].amount+" hrk</p><p>Donations: "+data[i].donations+" hrk</p><p>By: "+data[i].user.username+"</p>";	
					document.getElementById('formSub'+i).innerHTML = "<p><input style='text-align:right' type='submit'  id='submitButt' value='Submit'><input type='text' name='donations' values='"+data[i].id+"' onfocus= 'this.placeholder=&quot;&quot' onblur='this.placeholder=&quot Amount...&quot' placeholder='Amount...'><p><hr>";
					document.getElementById('form'+i).action = "?id="+data[i++].id;
				}
			}
		})	
	})
	.catch(err => {
		console.log(err);
	})
}
