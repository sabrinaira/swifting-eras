/** Handle album routing logic */

const express = require('express');
const AlbumController = require('../controllers/albumController');

// set up router
const albumRouter = express.Router();

/** CRUD Operations! */
albumRouter.post('/', AlbumController.addAlbum, (res, req) => {});
albumRouter.get('/', AlbumController.getAlbum, (res, req) => {});
albumRouter.patch('/:id', AlbumController.updateAlbum, (res, req) => {});
albumRouter.delete('/', AlbumController.deleteAlbum, (res, req) => {});

module.exports = albumRouter;
