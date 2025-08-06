import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './YoutubeMusicPlayer.css';

const YoutubeMusicSearchPlayer = () => {
  const [url, setUrl] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    const isValidUrl = ReactPlayer.canPlay(inputValue);
    if (isValidUrl) {
      setUrl(inputValue);
    } else {
      alert('Insira uma URL válida do YouTube');
    }
  };

  return (
    <div className="music-player-container">
      <h3 className="music-player-title">🎧 Relaxe com sua música favorita</h3>

      <input
        type="text"
        placeholder="Cole o link do YouTube aqui..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="music-search-input"
      />
      <button onClick={handleSearch} className="music-search-button">
        Tocar música
      </button>

      {url && (
        <div className="react-player-wrapper">
          <ReactPlayer
            url={url}
            controls
            width="100%"
            height="100%"
            className="react-player"
          />
        </div>
      )}
    </div>
  );
};

export default YoutubeMusicSearchPlayer;
