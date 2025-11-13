import api from "./api";

export const fetchPlants = async () => {
  const { data } = await api.get("/plants");
  return data || [];
};

export const getPlant = async (id) => {
  const { data } = await api.get(`/plants/${id}`);
  return data;
};

export const createPlant = async (payload) => {
  const { data } = await api.post("/seller/plants", payload);
  return data;
};