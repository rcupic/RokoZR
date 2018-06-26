function DeleteMessage(id){
	const myRequest = new Request(`http://localhost:5001/messages/?id=${id}`,
	{
		method: "DELETE",
		credentials: "same-origin"
	});
	fetch(myRequest)
	.then(res => {
		window.location.reload(true);
	})
	.catch(err => {
		console.log(err);
	});
}