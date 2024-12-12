import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SongInfo = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/songs/${id}`)
      .then((res) => res.json())
      .then((data) => setSong(data))
      .catch((error) => console.error);
  }, [id]);

  if (!song) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h5>{song.number}</h5>
      <h3>{song.songTitle}</h3>
      <h4>{song.albumId.albumTitle}</h4>
      <p>Duration: {song.duration}</p>

      <h4>Lyrics</h4>
      <p>{song.lyrics}</p>
    </div>
  );
};

export default SongInfo;
