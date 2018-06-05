function CloseMyAd(){
	console.log('closing...');
	const myRequest = new Request('http://localhost:5001/ads/collect',
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