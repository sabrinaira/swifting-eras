import express from 'express';
import Songs from '../../models/song.js';

const router = express.Router();

router.get('/', (req, res) => {
  Songs.find()
    .then((songs) => res.json(songs))
    .catch((error) => res.status(500).json({ error: 'Failed to fetch songs' }));
});

export default router;
