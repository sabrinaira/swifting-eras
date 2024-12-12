/** Handle album routing logic */

import express from 'express';
import AlbumController from '../controllers/albumController.js';

// set up router
const albumRouter = express.Router();

albumRouter.get('/', AlbumController.allAlbums, (req, res) => {
  return res.status(200).send(res.locals.allAlbums);
});

albumRouter.get('/:albumName', AlbumController.getAlbum, (req, res) => {
  return res.status(200).send(`TS Album found: ${res.locals.foundAlbum}`);
});

albumRouter.post('/', AlbumController.addAlbum, (req, res) => {
  return res
    .status(200)
    .send(`TS Album added successfully: ${res.locals.newAlbum}`);
});

albumRouter.patch('/:albumName', AlbumController.updateAlbum, (req, res) => {
  return res.status(200).send(`TS Album updated: ${res.locals.updateAlbum}`);
});

albumRouter.delete('/:albumName', AlbumController.deleteAlbum, (req, res) => {
  return res.status(200).json('Album deleted successfully.');
});

export default albumRouter;
