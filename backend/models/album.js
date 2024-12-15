/** Album Schema */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: { type: String, required: true },
  originalDate: { type: String, required: true },
  rerecordDate: { type: String, required: false },
  year: { type: Number, required: true },
  numberOfSongs: { type: Number, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Songs' }],
});

export default mongoose.model('Albums', albumSchema);
