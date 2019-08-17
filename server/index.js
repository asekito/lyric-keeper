const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const addNewLyric = require('../database/controllers').addNewLyric;
const returnAllLyrics = require('../database/controllers').returnAllLyrics;

// const { returnAllLyrics } = require('../database/controllers');

app.use(cors());

app.use(express.static(path.join(__dirname + '/../dist')));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname + '/../dist')));

app.post('/newLyricEntry', (req, res) => {
  const { title, chorus, verses, author } = req.body;
  addNewLyric(title, chorus, verses, author, () => res.sendStatus(200));
});

app.get('/getAllLyrics', (req, res) => {
  returnAllLyrics((data) => {
    res.send(data);
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
