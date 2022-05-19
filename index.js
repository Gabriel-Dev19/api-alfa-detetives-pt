const express = require('express');
const app = express();
const fs = require('fs')
var cors = require('cors')
var bodyParser = require('body-parser');

// var corsConfig = {
//   origin: 'https://promo-faster.herokuapp.com',
//   methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
//   allowedHeaders: 'Access-Control-Allow-Headers, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Request-Method, Access-Control-Request-Headers',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 204
// }
// 
//app.use(cors())

const PORT = process.env.PORT || 8877;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var PRODUCTS_FILE = './save.json'

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Disable caching so we'll always get the latest comments.
//   //res.setHeader('Cache-Control', 'no-cache');
//   next();
// });

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)

import dataBase from './save.json'

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