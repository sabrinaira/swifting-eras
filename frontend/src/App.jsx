import React, { useState } from 'react';
import { Router, Route, Routes, Link } from 'react-router-dom';
import Albums from '../src/components/albums';
import AlbumInfo from './components/album-info';
import Songs from '../src/components/songs';
import SongInfo from './components/song-info';

const App = () => {
  const [view, setView] = useState('home');

  return (
    // <div>
    //   <h1>Swifting Eras</h1>
    //   <p>An album and lyrical archive...</p>
    //   <button onClick={() => setView('albums')}>Albums</button>
    //   <button onClick={() => setView('songs')}>Songs</button>
    //   <button onClick={() => setView('about')}>About</button>
    //   {view === 'home' && <p>Welcome to the Swifting Eras archive...</p>}
    //   {view === 'albums' && <Albums />}
    //   {view === 'songs' && <Songs />}
    //   {view === 'about' && (
    //     <p>This is a solo project developed by Sabrina Ira</p>
    //   )}
    // </div>

    <div>
      <h1>Swifting Eras</h1>
      <p>An album and lyrical archive!</p>

      <nav>
        <Link to='/albums'>Albums</Link>
        <Link to='/songs'>Songs</Link>
        <Link to='/about'>About</Link>
      </nav>

      <Routes>
        <Route
          path='/'
          element={<p>Welcome to the Swifting Eras archive...</p>}
        />
        <Route path='/albums' element={<Albums />} />
        <Route path='/songs' element={<Songs />} />
        <Route
          path='/about'
          element={<p>This is a solo project developed by Sabrina Ira</p>}
        />

        {/* Information Route */}
        <Route path='/albums/:id' element={<AlbumInfo />} />
        <Route path='/songs/:id' element={<SongInfo />} />
      </Routes>
    </div>
  );
};

export default App;
