/** This file is the main router of the application responses to client requests*/

// import dependencies
require('dotenv').config({ path: '../.env' });
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

//import routers & controllers
const AlbumController = require('./controllers/albumController');
const albumRoutes = require('./routes/albumRoutes');

// initialize middleware for handling JSON and request parsing
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`MongoDB Connection Error: ${err}`));

app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);

// insert error handlers

/** 404 Handler */
app.use('*', (res, req) => {
  return res.status(404).send('404 - Request Not Found');
});

/** Global Error Handler */
app.use((err, req, res, next) => {
  /** default error object */
  const defaultErr = {
    log: 'Global error encountered unknown middleware error.',
    status: 500,
    message: { err: 'An error occured.' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log); // Logs to the console (for devs)
  return res.status(errorObj.status).json(errorObj.message); // Response for the client
});

//insert server configs for start server
