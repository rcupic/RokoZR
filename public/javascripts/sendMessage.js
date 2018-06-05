function sendMessage() {
    console.log('sending message...');
	const myRequest = new Request('/messages',
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
	})
}