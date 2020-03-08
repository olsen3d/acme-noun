const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

const PORT = 3000;

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api/people', (req, res, next) => {
  db.Person.findAll()
    .then(people => res.send(people))
    .catch(next);
});

app.get('/api/places', (req, res, next) => {
  db.Place.findAll()
    .then(place => res.send(place))
    .catch(next);
});

app.get('/api/things', (req, res, next) => {
  db.Thing.findAll()
    .then(thing => res.send(thing))
    .catch(next);
});

db.sync().then(() => app.listen(PORT, () => console.log('listening on port 3000')));
