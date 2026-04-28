import React from 'react';
import FaceExpression from '../../Expression/compontent/FaceExpression';
import Player from '../compontent/Player'; // ✅ import Player
import { useSong } from '../hook/useSong';

const Home = () => {
  const { handleGetSong, song, loading } = useSong();

  return (
    <div style={{ textAlign: "center" }}>
      <FaceExpression
        onClick={(expression) => { handleGetSong({ mood: expression }) }}
      />

      {/* ✅ Show loading state */}
      {loading && <p>🎵 Finding a song for your mood...</p>}

      {/* ✅ Show player only when song is available */}
      {song && <Player />}
    </div>
  );
}

export default Home;