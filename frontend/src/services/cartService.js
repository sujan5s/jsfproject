import api from "./api";

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const addToCart = async (plantId, qty = 1) => {
  const { data } = await api.post("/cart", { plantId, qty });
  return data;
};

export const removeFromCart = async (plantId) => {
  const { data } = await api.delete(`/cart/${plantId}`);
  return data;
};