function Purchase(){
    let error = null;
    const cardNo = document.getElementById('cardNo').value;
    const amount = document.getElementById('amount').value;
    const errorP = document.getElementById('errorP');
    const body = {cardNo : parseInt(cardNo),amount:parseInt(amount)};
    if(isNaN(cardNo) || cardNo <= 0)
        error = {name:'error',message:'Wrong card number input!'};
    if(isNaN(amount) || amount <= 0) {
        error = {name:'error',message:'Wrong amount input!'};
    }
    if(error) {
        errorP.innerHTML = error.message;
    }else {
        console.log('purchasing...');
        const myRequest = new Request('http://localhost:5001/creditCard',
        {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        }
        );
        fetch(myRequest)
        .then(res => {
            res.json()
            .then(data => {
                if(data.name === 'error')
                    errorP.innerHTML = data.message;
                else
                    window.location='./secure';
            })	
        })
        .catch(err => {
            errorP.innerHTML = 'Something went wrong!';
        });
    }
}