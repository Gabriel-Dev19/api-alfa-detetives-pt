const express = require('express');
const app = express();
const fs = require('fs')
var cors = require('cors')
var bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

const PORT = process.env.PORT || 8877;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var DISTRITOS_FILE = './save.json'

app.get('/api/distritos', (req, res) => {
  fs.readFile(DISTRITOS_FILE, function(err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    res.send(JSON.parse(data));
  });
})

app.get('/api/distritos/:distrito', function(req, res) {

  fs.readFile(DISTRITOS_FILE, function(err, data) {
      if (err) {
          console.error(err);
          process.exit(1);
      }
      var json = JSON.parse(data);
      const distrito = json.find((item) => item.distrito === String(req.params.distrito))
      res.send(distrito)
  });
});

app.get('/api/distritos/:distrito/:cidade', function(req, res) {

  fs.readFile(DISTRITOS_FILE, function(err, data) {
      if (err) {
          console.error(err);
          process.exit(1);
      }
      var json = JSON.parse(data);
      const distrito = json.find((item) => item.distrito === String(req.params.distrito))
      const cidade = distrito.cidades.find((item) => item.cidade === String(req.params.cidade))
      res.json(cidade)
  });
});

app.listen(PORT, () => {
  console.log('Escutando na porta: ' + PORT)
})