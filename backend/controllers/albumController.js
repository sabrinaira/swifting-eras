/** Album data handling logic via mongoose */

const Albums = require('../models/album');

// created a helper error function
function createError(log, status = 500, message) {
  return { log, status, message };
}

const AlbumController = {};

AlbumController.addAlbum = (req, res, next) => {
  // object deconstruction to specify the properties needed
  const { albumTitle, year, numberOfSongs, songs } = req.body;
  console.log('Request Body:', req.body);

  Albums.create({ albumTitle, year, numberOfSongs, songs })
    .then((album) => {
      console.log(album);
      res.locals.newAlbum = album;
      console.log(`Album created: ${res.locals.newAlbum}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot create album: ${err}`,
        message: { err: 'Album missing some required fields for creation' },
      });
      return next(error);
    });
};

AlbumController.getAlbum = (req, res, next) => {
  const { albumName } = req.params;
  console.log(req.params);
  // use Albums.populate('Songs') in this method to retrieve the data reference from another document
  Albums.findOne({ albumTitle: albumName })
    .then((album) => {
      // if the album does not exist
      if (!album) {
        const error = createError({
          log: `Cannot find the album name ${albumName}`,
          message: { err: 'Cannot find album in database' },
        });
        return next(error);
      }
      res.locals.foundAlbum = album;
      console.log(`Album Found: ${res.locals.foundAlbum}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot find ${albumName}: ${err}`,
        message: { err: 'Cannot find album in database' },
      });
      return next(error);
    });
};

AlbumController.updateAlbum = (req, res, next) => {
  const { albumName } = req.params;
  const { albumTitle, year, numberOfSongs, songs } = req.body;

  Albums.findOneAndUpdate(
    { albumTitle: albumName },
    { albumTitle, year, numberOfSongs, songs },
    { new: true }
  )
    .then((album) => {
      res.locals.updateAlbum = album;
      console.log(`Album Updated: ${res.locals.updateAlbum}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot update album: ${err}`,
        message: { err: 'Album is not found.' },
      });
      return next(error);
    });
};

AlbumController.deleteAlbum = (req, res, next) => {
  const { albumName } = req.params;
  console.log(req.params);
  Albums.findOneAndDelete({ albumTitle: albumName })
    .then((album) => {
      res.locals.deletedAlbum = album;
      console.log(`Album deleted successfully: ${res.locals.deletedAlbum}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot delete album: ${err}`,
        message: { err: `Failed to delete ${albumName} album` },
      });
      return next(error);
    });
};

module.exports = AlbumController;
