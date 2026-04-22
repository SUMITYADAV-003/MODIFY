import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
})

export async function register({email, username, password}) {
  const response = await axios.post("/api/auth/register", {
    username,email, password
  })

  return response.data;
  
}

export async function login({emial, password, username}) {

  const response = await axios.post("/api/auth/login", {
    username,emial,password
  })
  return response.data;
}

export async function getMe() {
  const response = await axios.get("/api/auth/get-me" )

  return response.data;
  
}
export async function logOut() {
  const response = await axios.get("/api/auth/logout" )

  return response.data;
  
}