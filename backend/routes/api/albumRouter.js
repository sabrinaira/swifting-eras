import express from 'express';
import Albums from '../../models/album.js';

const router = express.Router();

router.get('/', (req, res) => {
  Albums.find()
    .then((albums) => res.json(albums))
    .catch((error) =>
      res.status(500).json({ error: 'Failed to fetch albums' })
    );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Recieved request for Album ID:', id);

  Albums.findById(id)
    .populate('songs', 'title')
    .then((album) => {
      if (!album) {
        return res.status(404).json({ error: 'Album not found' });
      }

      res.json(album);
    })
    .catch((error) =>
      res.status(500).json({ error: 'Unable to retrieve the requested album' })
    );
});

export default router;
