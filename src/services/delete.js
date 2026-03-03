import axios from "axios";
import { getOne } from "./get";

const API_URL = import.meta.env.VITE_API_URL;

const deleteData = async (id) => {
    const user = await getOne(id);

    const confirmed = window.confirm(`Do you want to remove user: ${user.email}?`); // paspaudus okay confirmed reiksme tampa true, kitu atveju false
    if (!confirmed) return; // 

  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default deleteData;