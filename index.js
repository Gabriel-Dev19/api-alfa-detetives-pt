const express = require('express');
const app = express();
const fs = require('fs')
var cors = require('cors')
var bodyParser = require('body-parser');


app.use(cors({
  origin: ['http://localhost:3000', 'https://apipromofaster.vercel.app', 'https://promo-faster.herokuapp.com', 'http://promo-faster.herokuapp.com'], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}))

const PORT = process.env.PORT || 8877;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var PRODUCTS_FILE = './save.json'

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

import dataBase from './save.json'

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get('/api/products', (req, res) => {
  fs.readFile(PRODUCTS_FILE, function(err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    res.send(JSON.parse(data));
  });
})

app.get('/api/product/:id', function(req, res) {

  fs.readFile(PRODUCTS_FILE, function(err, data) {
      if (err) {
          console.error(err);
          process.exit(1);
      }

      var json = JSON.parse(data);

      for(var i = 0; i <= json.length; i++)
      {
          if(json[i]['id'] == req.params.id)
          {
              res.send(json[i]);
              break;
          }
      }
  });
});

app.post('/api/products/create', function(req, res) {
  fs.readFile(PRODUCTS_FILE, function(err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    var products = JSON.parse(data);

    var newProduct = {
      id: Date.now(),
      name: req.body.name,
      description: req.body.description,
      preco: req.body.preco,
      popularity: req.body.popularity,
      categorySearch: req.body.categorySearch,
      precoAntigo: req.body.precoAntigo,
      porcentagemDesconto: req.body.porcentagemDesconto,
      numeroParcelas: req.body.numeroParcelas,
      precoParcelas: req.body.precoParcelas,
      semJuros: req.body.semJuros,
      link: req.body.link,
      images: req.body.images,
      url: req.body.images.url,
      alt: req.body.images.alt
    };
    products.push(newProduct);
    fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), function(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(products);
    });
});
});

app.delete('/api/products/delete/:id', function(req, res) {
  //for(var i = 0; i <= dataBase.length; i++)
  //  {
  //    if(dataBase[i]['id'] == req.params.id)
  //    {
  //      dataBase.splice(i, 1);
  //      res.json(dataBase);
  //      break;
  //    }
  //  }
  fs.readFile(PRODUCTS_FILE, function (err, data) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const products = JSON.parse(data)

    for (let i = 0; i <= products.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (products[i].id == req.params.id) {
        products.splice(i, 1)
        fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), function (err) {
          if (err) {
            console.error(err)
            process.exit(1)
          }
          res.json(products)
        })
        break
      }
    }
  })
});

app.listen(PORT, () => {
  console.log('Escutando na porta: ' + PORT)
})