function getAllMessages() {
        console.log('getting message...');
        const myRequest = new Request('/messages/fetch',
        {
            method: "GET",
            credentials: "same-origin"
        });
        fetch(myRequest)
        .then(res => {
            res.json()
            .then(data => {
                location.reload();
                console.log(data);
                return;
            })	
        })
        .catch(err => {
            console.log(err);
            return;
        })
        return;
}