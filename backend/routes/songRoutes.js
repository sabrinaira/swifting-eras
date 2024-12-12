/** Handle song routing logic */

import express from 'express';
import SongController from '../controllers/songController.js';

const songRouter = express.Router();

songRouter.get('/', SongController.allSongs, (req, res) => {
  return res.status(200).send(res.locals.allSongs);
});

songRouter.get('/:id', SongController.getSong, (req, res) => {
  return res.status(200).send(`Song query found: ${res.locals.foundSong}`);
});

songRouter.post('/', SongController.addSong, (req, res) => {
  return res.status(200).send(`Song added successfully: ${res.locals.newSong}`);
});

songRouter.get('/album/:albumId', SongController.getSongsByAlbum);

songRouter.patch('/:songName', SongController.updateSong, (req, res) => {
  return res
    .status(200)
    .send(`Song information updated: ${res.locals.updateSong}`);
});

songRouter.delete('/:id', SongController.deleteSong, (req, res) => {
  return res.status(200).json('Song record deleted successfully.');
});

export default songRouter;
