import express from 'express';
import mongoose from 'mongoose';
import Songs from '../../models/song.js';

const router = express.Router();

router.get('/', (req, res) => {
  Songs.find()
    .then((songs) => res.json(songs))
    .catch((error) => res.status(500).json({ error: 'Failed to fetch songs' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Received request for Song ID:', id);

  Songs.findById(id)
    .populate('albumId', 'albumTitle')
    .then((song) => {
      if (!song) {
       return res.status(404).json({error: 'Song record not found'})
      }

      res.json(song);
    })
    .catch((error) =>
      res.status(500).json({ error: 'Unable to retrieve song record' })
    );
});

export default router;
