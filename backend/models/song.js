/** Song Schema */
import mongoose from 'mongoose';
import Albums from './album.js';

const Schema = mongoose.Schema;

const songSchema = new Schema({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: false },
  artist: { type: String, required: false },
  songwriter: { type: String, required: false },
  lyrics: { type: String, required: false },
  albumId: { type: Schema.Types.ObjectId, ref: 'Albums', required: true },
  desc: { type: String, required: false }, // if the song is from the vault
});

/** Retrieve the albumId to find the corresponding Album, then update the songs array of Album model */
songSchema.post('save', (doc) => {
  Albums.findByIdAndUpdate(
    doc.albumId,
    { $push: { songs: doc._id } }, // appending the song's _id into the album's songs array
    { new: true }
  )
    .then((album) => {
      console.log(
        `Album: ${album.albumTitle} updated with Song: ${doc.songTitle} `
      );
    })
    .catch((err) => {
      console.error(`Failed to update album: ${err}`);
    });
});

export default mongoose.model('Songs', songSchema);
