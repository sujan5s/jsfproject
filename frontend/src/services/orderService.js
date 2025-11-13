import api from "./api";

export const createOrder = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};

export const fetchOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};