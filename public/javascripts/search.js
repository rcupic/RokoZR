function Search(){
	const searchSort = document.getElementById('searchSelect').options[document.getElementById('searchSelect').selectedIndex].value;
	console.log(searchSort);
	switch(searchSort){
		case 'ads':{
				const searchInput = document.getElementById('searchInput').value;
				const myRequest = new Request('http://localhost:5001/ads?search='+searchInput+'',
				{
					credentials: "same-origin"
				});
				fetch(myRequest)
				.then(res => {
					console.log(res);
					res.json()
					.then(data => {
						console.log(data);
						if(data.name==='error'){							
							document.getElementById('errorP').innerHTML = "<p>No such ad</p>";
						}							
						document.getElementById('pSearch0').innerHTML = "<hr><p>Name: "+data.name+"</p><p>Amount: "+data.amount+" hrk</p><p>Donations: "+data.donations+" hrk</p><p>By: "+data.adOwner.username+"</p>";	
						document.getElementById('formSub0').innerHTML = "<p><input type='text' name='donations' values='"+data.id+"' onfocus= 'this.placeholder=&quot;&quot' onblur='this.placeholder=&quot Amount...&quot' placeholder='Amount...'></p><p><input style='border-bottom:none;text-align:center' type='submit'  id='submitButt' value='Submit'></p><hr>";
						document.getElementById('form0').action = "?id="+data.id;
					})	
				})
				.catch(err => {
					console.log(err);
				})
				break;
			}
		case 'users': {
			const searchInput = document.getElementById('searchInput').value;
			const myRequest = new Request('http://localhost:5001/users?search='+searchInput+'',
			{
				credentials: "same-origin"
			});
			fetch(myRequest)
			.then(res => {
				console.log(res.body);
				res.json()
				.then(data => {
					console.log(data);
					if(data.name === 'error') {
						document.getElementById('errorP').innerHTML = "<p>No such user</p>";
					}else if(data.adOwner[0]){
						document.getElementById('pSearch0').innerHTML = "<hr><p>Username: "+data.username+"</p><p>Balance: "+data.balance+" hrk</p><p>Ad: "+data.adOwner[0].name+"</p>";	
						document.getElementById('formSub0').innerHTML = "<p><a href='/messages?id="+data.id+"'><i class='fas fa-envelope'></i></a></p>";
						document.getElementById('form0').action = "?id="+data.id;
					}else {
						document.getElementById('pSearch0').innerHTML = "<hr><p>Username: "+data.username+"</p><p>Balance: "+data.balance+" hrk</p><p>No ad.</p>";	
						document.getElementById('formSub0').innerHTML = "<p><a href='/messages?id="+data.id+"'><i class='fas fa-envelope'></i></a></p>";
						document.getElementById('form0').action = "?id="+data.id;
					}
					document.getElementById('form0').style.border = '1px solid blue';
				});
			})
			.catch(err => {
				console.log(err);
			})
		}
	}	
}
