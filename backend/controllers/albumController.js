/** Album data handling logic via mongoose */

const Albums = require('../models/album'); // CommonJS import

const AlbumController = {};

function createError(message, status, log) {
  return { message, status, log };
}

AlbumController.addAlbum = (res, req, next) => {};
AlbumController.getAlbum = (res, req, next) => {};
AlbumController.updateAlbum = (res, req, next) => {};
AlbumController.deleteAlbum = (res, req, next) => {};

module.exports = AlbumController;
