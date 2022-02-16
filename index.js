const express = require('express');
const app = express();

const PORT = process.env.PORT || 8877;

app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

let dataBase = [
  {
    name: "Alguma coisa",
    description: "Alguma coisa qualquer",
    popularity: "99",
    images: [
      {
        url: 'https://aaaa',
        alt: 'Alt'
      },
      {
        url: 'https://aaaa',
        alt: 'Alt'
      },
      {
        url: 'https://aaaa',
        alt: 'Alt'
      }
    ]
  }
]

app.get('/api/products', (req, res) => {
  res.json(dataBase)
})

app.post('/api/product/create', function(req, res) {
  const body = req.body
  dataBase.push(body);
  res.json(body)
});

app.listen(PORT, () => {
  console.log('Escutando na porta: ' + PORT)
})