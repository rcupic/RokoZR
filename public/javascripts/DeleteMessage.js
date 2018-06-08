function DeleteMessage(id){
	console.log('deleting...');
	const myRequest = new Request('http://localhost:5001/messages/delete?id='+id,
	{
		method: "POST",
		credentials: "same-origin"
	});
	fetch(myRequest)
	.then(res => {
		res.json()
		.then(data => {
			location.reload();
			console.log(data);
		})	
	})
	.catch(err => {
		console.log(err);
	});
}