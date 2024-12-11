/** Handle song routing logic */

const express = require('express');
const SongController = require('../controllers/songController');

const songRouter = express.Router();

/** CRUD Operations! */
songRouter.post('/', SongController.addSong, (req, res) => {
  return res.status(200).send(`Song added successfully: ${res.locals.newSong}`);
});

songRouter.get('/:songName', SongController.getSong, (req, res) => {
  return res.status(200).send(`Song query found: ${res.locals.foundSong}`);
});

songRouter.patch('/:songName', SongController.updateSong, (req, res) => {
  return res
    .status(200)
    .send(`Song information updated: ${res.locals.updateSong}`);
});

songRouter.delete('/:songName', SongController.deleteSong, (req, res) => {
  return res.status(200).json('Song record deleted successfully.');
});

module.exports = songRouter;
