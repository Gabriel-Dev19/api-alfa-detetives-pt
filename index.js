const express = require('express');
const app = express();

const PORT = process.env.PORT || 8877;

app.get('/api/products', (req, res) => {
  res.json([
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
  ])
})

app.listen(PORT, () => {
  console.log('Escutando na porta: ' + PORT)
})