import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, getSongsByMood } from "../services/song.api";

export const useSong = () => {
  const context = useContext(SongContext);
  const { loading, setLoading, song, setSong, songs, setSongs } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);

    try {
      const data = await getSong({ mood });
      setSong(data.song);
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function handleGetSongMood(mood) {
    setLoading(true);

    try {
      const data = await getSongsByMood(mood);
      const nextSongs = data.song || data.songs || [];

      setSongs(nextSongs);
      setSong(nextSongs[0] || null);

      return { ...data, songs: nextSongs };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    song,
    songs,
    setSong,
    handleGetSong,
    handleGetSongMood,
  };
};
