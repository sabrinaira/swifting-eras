/** Handle album routing logic */

const express = require('express');
const AlbumController = require('../controllers/albumController');

// set up router
const albumRouter = express.Router();

albumRouter.post('/', AlbumController.addAlbum, (req, res) => {
  return res
    .status(200)
    .send(`TS Album added successfully: ${res.locals.newAlbum}`);
});

albumRouter.get('/:albumName', AlbumController.getAlbum, (req, res) => {
  return res
    .status(200)
    .send(`TS Album found: ${res.locals.foundAlbum}`);
});

albumRouter.patch('/:albumName', AlbumController.updateAlbum, (req, res) => {
  return res.status(200).send(`TS Album updated: ${res.locals.updateAlbum}`);
});

albumRouter.delete('/:albumName', AlbumController.deleteAlbum, (req, res) => {
  return res.status(200).json('Album deleted successfully.');
});

module.exports = albumRouter;
