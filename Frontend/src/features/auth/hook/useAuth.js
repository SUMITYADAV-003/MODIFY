import {login, logOut, register, getMe} from "../services/auth.api";
import {useContext} from "react";

import {AuthContext} from "../auth.contex";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const {user, setUser, loading, setLoading} = context;

  async function handleRegister({username, email, password}) {
    setLoading(true);
    const data = await register({email, username, password});
    setUser(data.user);
    setLoading(false);
    
  }

  async function handleLogin({username, email, password}) {
    setLoading(true);
    const data = await login({username, email, password});
    setUser(data.user);
    setLoading(false);
    
  }

  async function handlegetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
    
  }

  async function handleLogOut() {
    setLoading(true);
    const data =  await logOut();
    setUser(null);
    setLoading(false);
    
  }

  return({
    user, loading, handleLogOut, handleLogin, handleRegister, handlegetMe
  })





}