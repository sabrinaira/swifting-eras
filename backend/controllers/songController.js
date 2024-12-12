/** Song data handling logic via mongoose*/

import Songs from '../models/song.js';

/** Helper Error Function */
function createError(log, status = 500, message) {
  return { log, status, message };
}

const SongController = {};

/** Get All Songs */
SongController.allSongs = (req, res, next) => {
  Songs.find()
    .then((songs) => {
      res.locals.allSongs = songs;
      return next();
    })
    .catch((err) => {
      const error = createError({
        log: `Error occurred retrieving all song records - ${err}`,
        message: { err: 'Unable to load all Songs.' },
      });
      return next(error);
    });
};

/** Add Song */
SongController.addSong = (req, res, next) => {
  const { number, songTitle, duration, artist, lyrics, albumId, desc } =
    req.body;
  // console.log('Request Body:', req.body);

  Songs.create({ number, songTitle, duration, artist, lyrics, albumId, desc })
    .then((song) => {
      res.locals.newSong = song;
      console.log(`Song Added: ${res.locals.newSong}`);
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

/** Get Specific Song */
SongController.getSong = (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);

  Songs.findOne({ _id: id })
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
        log: `Error encountered - cannot find song: ${err}`,
        message: { err: 'Cannot find song in database' },
      });
      return next(error);
    });
};

/** finding an array of songs by albumId */
SongController.getSongsByAlbum = (req, res, next) => {
  const { albumId } = req.params;

  Songs.find({ albumId: albumId })
    .populate('albumId', 'albumTitle')
    .then((songs) => {
      if (!songs || songs.length === 0) {
        const error = createError({
          log: `Error: Cannot find songs associated with album ID`,
          message: { err: 'Unable find song records.' },
        });
        return next(error);
      }

      // retirieving the album title from reference
      const validSongWithAlbum = songs.find((song) => song.albumId);
      let albumTitle = 'Unknown Album';
      if (validSongWithAlbum) {
        albumTitle = validSongWithAlbum.albumId.albumTitle;
        console.log('Songs are associated with this album:', albumTitle); // Use this albumTitle
        res.status(200).json({
          message: 'Songs found successfully',
          album: albumTitle,
          songs: songs,
        });
      } else {
        console.log('No valid album found for these songs.');
      }
    })
    .catch((err) => {
      const error = createError({
        log: `Error in retrieving songs: ${err}`,
        message: { err: 'Failed to retrieve songs.' },
      });
      return next(error);
    });
};

/** Update Song */
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

/** Delete Song */
SongController.deleteSong = (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);

  Songs.findOneAndDelete({ _id: id })
    .then((song) => {
      if (song === null) {
        const error = createError({
          log: `Cannot find song.`,
          message: { err: 'Unable to find song query in database.' },
        });
        return next(error);
      }

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

export default SongController;
