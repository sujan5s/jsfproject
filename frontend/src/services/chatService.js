import api from "./api";
export const ask = async (question) => {
  const { data } = await api.post("/chat/ask", { question });
  return data || {};
};