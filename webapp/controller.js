(() => {
    //refresh da assinatura depois de 1h 50m
    let refresh = () => setTimeout(() => {
        Sfdc.canvas.client.refreshSignedRequest(function(data) {
            if (data.status === 200) {
                var signedRequest = data.payload.response;
                var part = signedRequest.split('.')[1];
                var obj = JSON.parse(Sfdc.canvas.decode(part));
                console.log(obj)
                refreshToken(signedRequest)
                refresh();
            } else {
                window.location.href = 'http://localhost:3000/webapp/auth.html';
            }
        })
    }, 7000000)
    refresh();

    async function refreshToken(signed_request) {
        let response = await fetch('/refreshToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { signed_request }
        });
        console.log('server', response)
    }

    document.querySelector('#text').textContent = sessionStorage.getItem('signed_request')
})()

document.querySelector('#btn').addEventListener('click', function() {
    if (self === top) {
        alert("App não está em um frame");
    }

    //Sfdc.canvas.oauth.logout();
    window.location.href = 'http://localhost:3000/webapp/auth.html'
    
});