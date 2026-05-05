import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../auth.contex";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);

    try {
      const data = await register({ email, username, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ username, email, password }) {
    setLoading(true);

    try {
      const data = await login({ username, email, password });
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  const handleGetMe = useCallback(async function handleGetMe() {
    setLoading(true);

    try {
      const data = await getMe();
      setUser(data.user);
      return data;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser]);

  async function handleLogOut() {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetMe();
  }, [handleGetMe]);

  return {
    user,
    loading,
    handleLogOut,
    handleLogin,
    handleRegister,
    handleGetMe,
  };
};
