/** Album Schema */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  albumTitle: { type: String, required: true },
  year: { type: Number, required: true },
  numberOfSongs: { type: Number, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Songs' }],
});

export default mongoose.model('Albums', albumSchema);
