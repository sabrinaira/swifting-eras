import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Songs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/songs').then((res) =>
      res
        .json()
        .then((data) => setSongs(data))
        .catch((error) => console.error('Error fetching songs:', error))
    );
  }, []);

  return (
    <div>
      <h2>Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            <Link to={`/songs/${song._id}`}>{song.songTitle}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Songs;
