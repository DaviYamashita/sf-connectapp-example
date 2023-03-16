(() =>{
            //força repost na janela pai (passagem de signed request)

            window.opener.Sfdc.canvas.client.repost({refresh : true});
            window.close()
})()