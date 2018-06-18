function sendMessage() {
	const text = document.getElementById('messageText').value;
	const errorP = document.getElementById('errorP');
	const body = {text: text};
	if(text === '')
	 errorP.innerHTML = 'You can not send empty message';
	else {
		console.log('sending message...');
		const myRequest = new Request(document.URL,
		{
			method: "POST",
			credentials: "same-origin",
			body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
		});
		fetch(myRequest)
		.then(res => {
			res.json()
			.then(data => {
				if(data.name === 'error') errorP.innerHTML = data.message;
				else {
					errorP.innerHTML = 'Message sent successfuly';
					document.getElementById('messageText').value = '';
				}
			})	
		})
		.catch(err => {
			errorP.innerHTML = 'Something went wrong!';
			console.log(err);
		});
	}
}