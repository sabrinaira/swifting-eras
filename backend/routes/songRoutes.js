/** Handle routing logic */

const express = require('express');
const SongController = require('./controllers/songController');

const songRouter = express.Router();

module.exports = songRouter;
