/** Album Schema */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new mongoose.Schema({
  albumTitle: { type: String, required: true },
  year: { type: Number, required: true },
  numberOfSongs: { type: Number, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Songs' }],
});

module.exports = mongoose.model('Albums', albumSchema);
