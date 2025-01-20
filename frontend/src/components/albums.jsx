import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/albums')
      .then((res) => res.json())
      .then((data) => {
        // Sort the albums by year (ascending order)
        const sortedAlbums = data.sort((a, b) => a.year - b.year);
        setAlbums(sortedAlbums);
      })
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  return (
    <div className='album-list'>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album._id}>
            <Link to={`/albums/${album._id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
