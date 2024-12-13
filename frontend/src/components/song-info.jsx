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

  // aligning the lyrics in stanza form from JSON format
  const lyrics = song.lyrics.split('\n').map((stanza, index) => (
    <p key={index}>{stanza}</p>
  ));

  return (
    <div className='song'>
      <h5>{song.number}</h5>
      <h4>{song.albumId.albumTitle}</h4>
      <h2>{song.songTitle}</h2>
      {/* <p>Duration: {song.duration}</p> */}

      {/* <h4>Lyrics</h4> */}
      <div className='lyrics'>{lyrics}</div>
    </div>
  );
};

export default SongInfo;
