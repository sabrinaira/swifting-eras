import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <h3>{album.albumTitle}</h3>
      <p>Year: {album.year}</p>
      <p>Number of Songs: {album.numberOfSongs}</p>

      <h4>Song List</h4>
      <ul>
        {album.songs.map((song) => (
          <li key={song._id}>{song.songTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumInfo;
