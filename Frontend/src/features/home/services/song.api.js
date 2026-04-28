import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials:  true,
});


export async function getSong({mood}) {
  const response = api.get("/api/songs?mood=" + mood);
  console.log(response.data);

  return (await response).data;

}