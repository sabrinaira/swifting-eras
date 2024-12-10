/** Song Schema */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  artist: { type: String, required: true },
  lyrics: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Albums' },
  desc: { type: String, required: false }, // if the song is from the vault
});

module.exports = mongoose.model('Songs', songSchema);
