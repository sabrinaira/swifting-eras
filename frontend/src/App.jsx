import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './components/about';
import Albums from '../src/components/albums';
import AlbumInfo from './components/album-info';
import Songs from '../src/components/songs';
import SongInfo from './components/song-info';
import './styles/style.css';

const App = () => {
  return (
      <div>
        <h1 className='title'>Swifting Eras</h1>
        <p className='sub-title'>An album and lyrical archive!</p>

        <nav className='nav'>
          <Link to='/'>Home</Link>
          <Link to='/albums'>Albums</Link>
          <Link to='/songs'>Songs</Link>
          <Link to='/about'>About</Link>
        </nav>

        <Routes>
          <Route path='/' element={<p className='home'>It's me, hi, I'm the problem, it's me.</p>} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/songs' element={<Songs />} />
          <Route path='/about' element={<About />} />

          {/* Information Route */}
          <Route path='/albums/:id' element={<AlbumInfo />} />
          <Route path='/songs/:id' element={<SongInfo />} />
        </Routes>
      </div>
  );
};

export default App;
