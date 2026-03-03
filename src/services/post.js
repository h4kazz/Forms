import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const postData = async (data) => {
  let response = await axios.post(API_URL,  data);
  console.log(response);
};

export default postData;