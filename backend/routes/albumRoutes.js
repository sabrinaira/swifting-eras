/** Handle routing logic */

const express = require('express');
const AlbumController = require('./controllers/albumController');

const albumRouter = express.Router();

module.exports = albumRouter;
