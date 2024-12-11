/** This file is the main router of the application responses to client requests*/

// import dependencies
require('dotenv').config({ path: './.env' });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

//import routers & controllers
const albumRoutes = require('./routes/albumRoutes');
const songRoutes = require('./routes/songRoutes');

// initialize middleware for handling JSON and request parsing
app.use(express.json());

// connect mongoose to cloud database
const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully! '))
  .catch((err) => console.log(`MongoDB Connection Error: ${err}`));

app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);

/** 404 Handler */
app.use('*', (req, res) => {
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

/** Connecting to server */
app.listen(PORT, (err) => {
  if (err) console.log('Error in server setup');
  console.log('Server listening on Port', PORT);
});
