/** This file is the main router of the application responses to client requests*/

// import dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

//import routers & controllers
const AlbumController = require('./controllers/albumController');
const albumRoutes = require('./routes/albumRoutes');

// initialize middleware for handling JSON and request parsing
app.use(express.json());

// connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error(`MongoDB Connection Error: ${err}`));

app.use('/albums', albumRoutes); // Routes for album-related endpoints
app.use('/songs', songRoutes); // Routes for song-related endpoints

// insert error handlers

//insert server configs for start server
