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

  if (!album) return <p>Coming Soon!</p>;
  if (!album.songs) return <p>Coming Soon!</p>;

  return (
    <div className='album'>
      <h2>{album.title}</h2>
      <h3>{album.year}</h3>
      <p><b>Original Release Date:</b> {album.releaseDate}</p>

      {/* Check if the album has a re-recorded release date */}
      {album.tvReleaseDate && (
        <p><b>Taylor's Version Release Date:</b> {album.tvReleaseDate}</p>
      )}

      <p><b>Number of Songs:</b> {album.numberOfSongs}</p>

      <h3>Song List</h3>
      {/* checking if the song list is present */}
      {album.songs && album.songs.length > 0 ? (
        <ul>
          {album.songs.map((song) => (
            <li key={song._id}>
              <Link to={`/songs/${song._id}`}>{song.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p> Coming Soon! </p>
      )}
    </div>
  );
};

export default AlbumInfo;
