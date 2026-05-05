import { useState } from "react";
import FaceExpression from "../../Expression/compontent/FaceExpression";
import Player from "../compontent/Player";
import { useSong } from "../hook/useSong";

import "../compontent/Daskbored.scss";

const MOOD_COPY = {
  happy: "Bright picks for your good mood",
  sad: "Gentle songs for a softer moment",
  surprised: "Fresh tracks with extra energy",
  neutral: "Balanced music for focus",
};

const Home = () => {
  const { handleGetSongMood, songs, song, setSong, loading } = useSong();
  const [mood, setMood] = useState(null);
  const [notice, setNotice] = useState("Scan your face to build a playlist that matches your mood.");

  const handleDetect = async (expression) => {
    if (!expression) {
      setNotice("I could not read a mood yet. Face the camera and try again.");
      return;
    }

    const normalizedMood = expression.toLowerCase();
    setMood(normalizedMood);
    setNotice("Reading your expression and finding songs...");

    const data = await handleGetSongMood(normalizedMood);

    if (data?.songs?.length) {
      setNotice(`${data.songs.length} songs found for ${normalizedMood}.`);
      return;
    }

    setNotice(`No songs found for ${normalizedMood}. Upload songs for this mood from your backend.`);
  };

  return (
    <main className="dashboard">
      <section className="dashboard__sidebar">
        <div className="brand">
          <span className="brand__mark">M</span>
          <div>
            <p className="brand__eyebrow">Moodify</p>
            <h1>Music that matches your face.</h1>
          </div>
        </div>

        <FaceExpression onClick={handleDetect} />
      </section>

      <section className="dashboard__main">
        <div className="hero-panel">
          <div>
            <p className="hero-panel__label">Smart mood player</p>
            <h2>{mood ? MOOD_COPY[mood] || `Songs for ${mood}` : "Find the right song in seconds"}</h2>
            <p>{notice}</p>
          </div>

          <div className="hero-panel__status">
            <span className="pulse" />
            {loading ? "Finding songs" : mood ? mood : "Ready"}
          </div>
        </div>

        <div className="content-grid">
          <section className="music-panel">
            <div className="panel-heading">
              <div>
                <p>Playlist</p>
                <h3>Recommended songs</h3>
              </div>
              <span>{songs.length} tracks</span>
            </div>

            {loading && (
              <div className="empty-state">
                <div className="loader" />
                <p>Finding songs for your mood...</p>
              </div>
            )}

            {!loading && songs.length === 0 && (
              <div className="empty-state">
                <strong>No playlist yet</strong>
                <p>Use the camera panel to detect your expression and Moodify will show matching songs here.</p>
              </div>
            )}

            {!loading && songs.length > 0 && (
              <div className="playlist">
                {songs.map((item, index) => (
                  <button
                    key={item._id || item.url || item.title}
                    className={`song ${song?._id === item._id ? "song--active" : ""}`}
                    onClick={() => setSong(item)}
                  >
                    <span className="song__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="song__art">
                      {item.posteUrl || item.posterUrl ? (
                        <img src={item.posteUrl || item.posterUrl} alt="" />
                      ) : (
                        <span>{item.title?.charAt(0) || "M"}</span>
                      )}
                    </span>
                    <span className="song__meta">
                      <strong>{item.title}</strong>
                      <small>{item.artist || item.mood || "Moodify track"}</small>
                    </span>
                    <span className="song__action">{song?._id === item._id ? "Playing" : "Play"}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <aside className="insight-panel">
            <p className="insight-panel__label">How it works</p>
            <div className="insight-step">
              <span>1</span>
              <p>Allow camera access and keep your face inside the preview.</p>
            </div>
            <div className="insight-step">
              <span>2</span>
              <p>Detect your expression to choose a mood playlist.</p>
            </div>
            <div className="insight-step">
              <span>3</span>
              <p>Select a song and control playback from the bottom player.</p>
            </div>
          </aside>
        </div>
      </section>

      <Player />
    </main>
  );
};

export default Home;
