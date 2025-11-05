const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Holaaaa, este es un Servidor Express ');
});

const port = 3025;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
