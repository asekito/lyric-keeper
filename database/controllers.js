const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lyrics', { useNewUrlParser: true });

const { Schema } = mongoose;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const lyricSchema = new Schema({
  title: String,
  author: String,
  chorus: String,
  verses: String,
});

const Lyric = mongoose.model('Lyric', lyricSchema);

const addNewLyric = (title, chorus, verses, author, cb) => {
  const newLyric = new Lyric({
    title: title,
    chorus: chorus,
    verses: verses,
    author: author,
  });
  newLyric.save((err) => (err ? console.error(err) : cb()));
};

const returnAllLyrics = (cb) => {
  Lyric.find({}, (err, data) => (!err ? cb(data) : console.error(err)));
};

module.exports = { addNewLyric: addNewLyric, returnAllLyrics: returnAllLyrics };
