import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const AlbumInfo = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/albums/${id}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data))
      .catch((error) => console.error);
  }, [id]);

  if (!album) {
    return <p>Coming Soon!</p>;
  }

  return (
    <div className='album'>
      <h2>{album.albumTitle}</h2>
      <p>Year: {album.year}</p>
      <p>Number of Songs: {album.numberOfSongs}</p>

      <h3>Song List</h3>
      <ul>
        {album.songs.map((song) => (
          <li key={song._id}>
            <Link to={`/songs/${song._id}`}>{song.songTitle}</Link>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumInfo;
