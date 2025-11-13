import api from "./api";

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const getProfile = async () => {
  // implement /auth/me on backend to return profile
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch {
    return null;
  }
};