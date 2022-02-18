const express = require('express');
const app = express();
const fs = require('fs')
var cors = require('cors')
var bodyParser = require('body-parser');

app.use(cors({
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}))

const PORT = process.env.PORT || 8877;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Acept, Origin, X-Request-Width');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

let dataBase = []

app.get('/api/products', (req, res) => {
  res.json(dataBase)
})

app.post('/api/products/create', function(req, res) {
  var newProduct = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    popularity: req.body.popularity,
    images: req.body.images,
    url: req.body.images.url,
    alt: req.body.images.alt
  };
  dataBase.push(newProduct);
  res.json(dataBase)

  fs.writeFile('./save.json', JSON.stringify(dataBase, null, 2), function(err) {
      if (err) {
          console.error(err);
      }
  });
});

app.delete('/api/products/delete/:id', function(req, res) {
  for(var i = 0; i <= dataBase.length; i++)
    {
      if(dataBase[i]['id'] == req.params.id)
      {
        dataBase.splice(i, 1);
        res.json(dataBase);
        break;
      }
    }
});

app.listen(PORT, () => {
  console.log('Escutando na porta: ' + PORT)
})