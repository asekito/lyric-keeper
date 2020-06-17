const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const addNewLyric = require('../database/controllers').addNewLyric;
const returnAllLyrics = require('../database/controllers').returnAllLyrics;
const returnSingleLyricMatchingShortUrl = require('../database/controllers')
  .returnSingleLyricMatchingShortUrl;
const removeLyricMatchingShortUrl = require('../database/controllers')
  .removeLyricMatchingShortUrl;
const update = require('../database/controllers.js').update;

app.use(cors());

app.use(express.static(path.join(__dirname + '/../dist')));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname + '/../dist')));
app.use('/lyric/:url', express.static(path.join(__dirname + '/../dist')));

app.post('/newLyricEntry', (req, res) => {
  const { title, chorus, verses, author } = req.body;
  addNewLyric(title, chorus, verses, author, () => res.sendStatus(200));
});

app.get('/getSingleLyricByShortUrl', (req, res) => {
  returnSingleLyricMatchingShortUrl(req.query.shortUrl, (data) => {
    res.send(data);
  });
});

app.get('/getAllLyrics', (req, res) => {
  returnAllLyrics((data) => {
    res.send(data);
  });
});

app.post('/deleteLyric', (req, res) => {
  removeLyricMatchingShortUrl(req.body.shortUrl, () => {
    res.sendStatus(200);
  });
});

app.post('/updateLyric', (req, res) => {
  update(req.body, (newData) => {
    res.send(newData);
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
