const express = require('express');
const app = express();
const port = 3000;

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

app.use(express.json());

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.patch('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) {
    item.name = req.body.name || item.name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
