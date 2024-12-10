const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  songwriters: [String],
  lyrics: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Albums' },
  desc: { type: String, required: false },
});

module.exports = mongoose.model('Songs', songSchema);
