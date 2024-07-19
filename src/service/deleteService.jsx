import axios from "axios";
const API_URL = 'https://gvzip.com';


export const deleteAccount = async () => {
  try {
    const response = await axios.delete(`${API_URL}/member`, {
      withCredentials: true
    });

    return response.data;
  } catch(error) {
    console.log("Error occurred while deleting account!")
    console.error(error);
  }
}