/** Album data handling logic via mongoose */

import Albums from '../models/album.js';

// created a helper error function
function createError(log, status = 500, message) {
  return { log, status, message };
}

const AlbumController = {};

/** Get All Albums */
AlbumController.allAlbums = (req, res, next) => {
  Albums.find()
    .then((albums) => {
      res.locals.allAlbums = albums;
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error occurred: ${err}`,
        message: { err: "Couldn't load all albums" },
      });
      return next(error);
    });
};

/** Add Album */
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

/** Get Album */
AlbumController.getAlbum = (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  // use Albums.populate('Songs') in this method to retrieve the data reference from another document
  Albums.findOne({ _id: id })
    .then((album) => {
      // if the album does not exist
      if (!album) {
        const error = createError({
          log: `Cannot find the album assocaited with album ID: ${id}`,
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
        log: `Error encountered - cannot find album: ${err}`,
        message: { err: 'Cannot find album in database' },
      });
      return next(error);
    });
};

/** Update Album */
AlbumController.updateAlbum = (req, res, next) => {
  const { id } = req.params;
  const { albumTitle, year, numberOfSongs, songs } = req.body;

  Albums.findOneAndUpdate(
    { _id: id },
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

/** Delete Album */
AlbumController.deleteAlbum = (req, res, next) => {
  const { id } = req.params;
  // console.log(req.params);
  Albums.findOneAndDelete({ _id: id })
    .then((album) => {
      res.locals.deletedAlbum = album;
      console.log(`Album deleted successfully: ${res.locals.deletedAlbum.albumTitle}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot delete album: ${err}`,
        message: { err: `Failed to delete album record` },
      });
      return next(error);
    });
};

export default AlbumController;
