function CreateAd(){
    const adName = document.getElementById('adName').value;
    const amount = document.getElementById('amount').value;
	const errorP = document.getElementById('errorP');
    const body = {name: adName,amount:amount};
    if(isNaN(amount))
     errorP.innerHTML = 'Wront amount input';
    else if(adName === '')
     errorP.innerHTML = 'Wrong name input';
    else {
        console.log(body);
        console.log('closing...');
        const myRequest = new Request('http://localhost:5001/ads',
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
                    location.reload();
                    console.log(data);
                }
            })	
        })
        .catch(err => {
            console.log(err);
        });
    }
}