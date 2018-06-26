function Register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const number = document.getElementById('number').value;
	const errorP = document.getElementById('errorP');
    const body = {username: username,password:password,id:number};
	if(username === '')
     errorP.innerHTML = 'Wrong username input';
    else if(password === '')
    errorP.innerHTML = 'Wrong password input';
    else if(isNaN(number))
    errorP.innerHTML = 'Wrong number input';
	else {
        errorP.innerHTML = '';
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
                else window.location = '/secure';
			})	
		})
		.catch(err => {
			errorP.innerHTML = 'Something went wrong!';
			console.log(err);
		});
	}
}