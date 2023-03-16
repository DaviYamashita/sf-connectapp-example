(() => {
    //https://developer.salesforce.com/docs/atlas.en-us.platform_connect.meta/platform_connect/canvas_app_refresh_signed_request.htm
    //https://www.codescience.com/blog/2021/mastering-salesforce-canvas-apps/


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
            body: JSON.stringify({ signed_request })
        });
        console.log('server', response)
    }

    fetch('/refreshToken', { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(async (v) => {
        let str = JSON.stringify(await v.json()).replaceAll(',', ',\n')

        document.querySelector('#text').textContent = str
    
    })

    
})()

document.querySelector('#btn').addEventListener('click', function() {
    if (self === top) {
        alert("App não está em um frame");
    }

    Sfdc.canvas.oauth.logout();
    window.location.href = 'http://localhost:3000/webapp/auth.html'
    
});