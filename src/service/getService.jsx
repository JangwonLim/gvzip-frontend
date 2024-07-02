import axios from "axios";
const API_URL = 'http://ec2-13-125-5-235.ap-northeast-2.compute.amazonaws.com:8080';


export const getInfo = async (membership, campus, fields, page, size, direction) => {
  try {
    console.log(membership, campus, fields, page, size, direction)
    const response = await axios.get(`${API_URL}/archive`, {
      params: {
        membership: membership,
        campus: campus,
        fields: fields,
        page: page,
        size: size,
        direction: direction
      }
    })

    if (response && response.data) {
      console.log(response.data)
      return response.data;
    } else {
      console.log('No response data received');
    }

  } catch (error) {
    console.log("Error occurred while fetching userinfo!")
    console.error(error);
  }
}