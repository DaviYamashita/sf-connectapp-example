const express = require('express')
const app = express()
const port = 3000

const { SECRET } = require('./config.json') 
const parseSignedRequest = require('./functions.js').parseSignedRequest
var cors = require('cors')

app.use(cors()); // support cors
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let svdata = {};

//postagem usada no processo de autenticação de acesso ao app feito pelo SF
app.post('/app', (req, res) => {

  console.log(req)

  console.log(req.originalUrl)
  console.log(req.body)

  console.log('POST')

  try {
    let data = parseSignedRequest(req.body.signed_request, SECRET)

    console.log('parâmetros recebidos:', data.context.environment.parameters)
    //guardar data
    svdata = data;

    res.sendFile('index.html', { 'root':require('path').join(__dirname)+'/webapp'})
  } catch (e) {
    res.status(401).send(e)
  }
})

//verificar e guardar novo signed request recebido pelo cliente
app.post('/refreshToken', (req, res) => {
  try {
    let data = parseSignedRequest(req.body.signed_request, SECRET)
    //guardar data
    svdata = data;
    
    res.status(200).send('Sucesso')
  } catch (e) {
    res.status(401).send(e)
  }
})


//obter dados do signed request (somente para *teste de exemplo*)
app.get('/refreshToken', (req, res) => {

})

//files
let mapping = {
  '/webapp/canvas-all.js': ['/node_modules/@salesforce/canvas-js-sdk/js', 'canvas-all.js'],
  '/webapp/controller.js': ['/webapp', 'controller.js'],
  '/test': ['/webapp', 'test.html'],
  '/webapp/index.html': ['/webapp', 'index.html'],
  '/webapp/auth.html': ['/webapp', 'auth.html'],
  '/callback': ['/webapp', 'callback.html'],
  '/app': ['/webapp', 'auth.html'],
  '/webapp/config.js': ['/webapp', 'config.js']
}

for (let k in mapping) {
  app.get(k, (req, res) => {
    let [ path, file ] = mapping[k];
    res.sendFile(file, { 'root':require('path').join(__dirname)+path})
  })
}


/*app.post('/webapp/storeToken', (req, res) => {
  console.log(req.body)
  console.log('TEST')
  console.log(
    parseSignedRequest(req.body.signature, SECRET)
  )


  fetch(URL + '/services/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: str
  })
  .then(res => res.json())
  .then(json => {
    console.log(json)
  })
  .catch(err => {
    console.log(err)
    res.send(err)
  })
});*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})