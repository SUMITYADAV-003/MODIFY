import React, { useState } from "react";
import FaceExpression from "../../Expression/compontent/FaceExpression";
import Player from "../compontent/Player";
import { useSong } from "../hook/useSong";

import "../compontent/Daskbored.scss";

const Home = () => {

  const {
    handleGetSong,
    songs,
    loading,
  } = useSong();

  const [mood, setMood] = useState(null);

  const [currentSong, setCurrentSong] = useState(null);

  const handleDetect = async (expression) => {

    setMood(expression);

    const data = await handleGetSong(expression);

    if (data?.songs?.length > 0) {
      setCurrentSong(data.songs[0]);
    }
  };

  return (

    <div className="dashboard">

      {/* LEFT */}
      <div className="left">
        <FaceExpression onClick={handleDetect} />
      </div>

      {/* CENTER */}
      <div className="center">

        {loading && <p>🎵 Finding songs...</p>}

        {mood && <h2>{mood}</h2>}

        {songs?.length > 0 && (

          <div className="playlist">

            {songs.map((s) => (

              <div
                key={s._id}
                className="song"
                onClick={() => setCurrentSong(s)}
              >

                <h3>{s.title}</h3>

                <p>{s.artist}</p>

              </div>

            ))}

          </div>
        )}

        {currentSong && (
          <Player song={currentSong} />
        )}

      </div>

      {/* RIGHT */}
      <div className="right">
        <p>Recommended</p>
      </div>

    </div>
  );
};

export default Home;
