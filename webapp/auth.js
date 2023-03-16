(() =>{


    function clickHandler(e) {

        var uri;

        if (! Sfdc.canvas.oauth.loggedin()) {
            // NOTA: Alterar URL quando o ambiente for Produção https://(test/login).salesforce.com/
            uri = configs.URL ? configs.URL +'services/oauth2/authorize' : Sfdc.canvas.oauth.loginUrl();
            console.log(uri)
            Sfdc.canvas.oauth.login(
            {uri : uri,
            params: {
                display : "touch",
                response_type : "token",
                client_id : configs.CONSUMER_KEY, //Consumer Key do SF
                redirect_uri : encodeURIComponent("http://localhost:3000/callback") //Callback URL
            }});

            console.log(window.location.href)

        } else {
            Sfdc.canvas.oauth.logout();
        }
        return false;
    }
    console.log(Sfdc)
    console.log(Sfdc.canvas.param())

    Sfdc.canvas(function() {
        // On Ready...
        var login    = Sfdc.canvas.byId("login");
        login.onclick=clickHandler;

    });

})();            
