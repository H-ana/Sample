const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let data = [];

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/data', (req, res) => {
  const data2 = req.body;
  data.push(data2);
  res.status(201).json(data2);
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});