import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const updateData = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export default updateData;
