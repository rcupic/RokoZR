function Login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
	const errorP = document.getElementById('errorP');
	const body = {username: username,password:password};
	if(username === '')
     errorP.innerHTML = 'Wrong username input';
    else if(password === '')
    errorP.innerHTML = 'Wrong password input';
	else {
        errorP.innerHTML = '';
		console.log('logging...');
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
				window.location = '/secure';
			})	
		})
		.catch(err => {
			errorP.innerHTML = 'Something went wrong!';
			console.log(err);
		});
	}
}