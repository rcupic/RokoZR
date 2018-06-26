function DeleteMessage(id){
	const myRequest = new Request(`http://localhost:5001/messages/delete?id=${id}`,
	{
		method: "POST",
		credentials: "same-origin"
	});
	fetch(myRequest)
	.then(res => {
		res.json()
		.then(data => {
			location.reload();
		})	
	})
	.catch(err => {
		console.log(err);
	});
}