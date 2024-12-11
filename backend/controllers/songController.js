/** Song data handling logic via mongoose*/

const Songs = require('../models/song');
const Albums = require('../models/album'); // for referencing albumId

/** Helper Error Function */
function createError(log, status = 500, message) {
  return { log, status, message };
}

const SongController = {};

SongController.addSong = (req, res, next) => {
  const { number, songTitle, duration, artist, lyrics, albumId, desc } =
    req.body;
  // console.log('Request Body:', req.body);

  Songs.create({ number, songTitle, duration, artist, lyrics, albumId, desc })
    .then((song) => {
      res.locals.newSong = song;
      console.log(`Song Added: ${res.locals.newSong}`);

      /** Retrieve the albumId to find the corresponding Album, then update the songs array of Album model */
      Songs.post();

      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error occurrred - failed to create song: ${err}`,
        message: { err: 'Required fields are missing.' },
      });
      return next(error);
    });
};

SongController.getSong = (req, res, next) => {
  const { songName } = req.params;

  Songs.findOne({ songTitle: songName })
    .then((song) => {
      if (!song) {
        const error = createError({
          log: `Cannot find the song name ${songName}`,
          message: { err: 'Cannot find song query in database' },
        });
        return next(error);
      }

      res.locals.foundSong = song;
      console.log(`Song Found: ${res.locals.foundSong}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot find ${songName}: ${err}`,
        message: { err: 'Cannot find song in database' },
      });
      return next(error);
    });
};

SongController.updateSong = (req, res, next) => {
  const { songName } = req.params;
  const { number, songTitle, duration, artist, lyrics, albumId, desc } =
    req.body;

  Songs.findOneAndUpdate(
    { songTitle: songName },
    { number, songTitle, duration, artist, lyrics, albumId, desc },
    { new: true }
  )
    .then((song) => {
      res.locals.updateSong = song;
      console.log(`Song record updated: ${res.locals.updateSong}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot update song info: ${err}`,
        message: { err: 'Song query cannot be found.' },
      });
      return next(error);
    });
};

SongController.deleteSong = (req, res, next) => {
  const { songName } = req.params;

  Songs.findOneAndDelete({ songTitle: songName })
    .then((song) => {
      res.locals.deletedSong = song;
      console.log(`Song record deleted: ${res.locals.deletedSong}`);
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error encountered - cannot delete song: ${err}`,
        message: { err: `Failed to delete song query: ${songName}` },
      });
      return next(error);
    });
};

module.exports = SongController;
