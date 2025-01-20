/** This file is the main router of the application responses to client requests*/

// import dependencies
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

// // to allow __dirname
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//import routers & controllers
import albumRoutes from './routes/albumRoutes.js';
import songRoutes from './routes/songRoutes.js';
import albumRouter from './routes/api/albumRouter.js';
import songRouter from './routes/api/songRouter.js';

const app = express();
const PORT = 3000;

//allow cors to allow all origins
app.use(cors());
// initialize middleware for handling JSON and request parsing
app.use(express.json());

// // React build folder
// app.use(express.static(path.join(__dirname, 'dist')));

// // Catch all routes and serve React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

/** Connecting to cloud database */
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully! '))
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  });

/** Set up path and middlewares */
// backend routers
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);
// frontend API routes
app.use('/api/albums', albumRouter);
app.use('/api/songs', songRouter);

/** 404 Handler */
app.use('*', (req, res) => {
  return res.status(404).send('404 - Request Not Found');
});

/** Global Error Handler */
app.use((err, req, res, next) => {
  /** default error object */
  const defaultErr = {
    log: 'Global error encountered: unknown middleware error.',
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
  console.log(`Server is running on http://localhost:${PORT}`);
});
