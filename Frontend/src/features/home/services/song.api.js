import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials:  true,
});


export async function getSong({mood}) {
  const response = await api.get("/api/songs?mood=" + mood);
  // console.log(response.data);

  return response.data;

}

export async function getSongsByMood(mood) {
  const response = await api.get(`/api/songs/moods/${mood}`);

  console.log(response.data);
  return response.data;
  
}