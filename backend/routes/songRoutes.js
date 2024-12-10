/** Handle song routing logic */

const express = require('express');
const SongController = require('../controllers/songController');

const songRouter = express.Router();

/** CRUD Operations! */
songRouter.post('/', SongController.addSongSong, (res, req) => {});
songRouter.get('/', SongController.getSong, (res, req) => {});
songRouter.patch('/:id', SongController.updateSongSong, (res, req) => {});
songRouter.delete('/:id', SongController.deleteSongSong, (res, req) => {});

module.exports = songRouter;
