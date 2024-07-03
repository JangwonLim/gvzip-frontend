import axios from "axios";
const API_URL = 'https://gvzip.com';


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
      }, withCredentials: true
    })
    // console.log(response.data)

    if (response && response.data) {
      console.log(response);
      console.log(response.data);
      return response.data;
    } else {
      console.log('No response data received');
    }

  } catch (error) {
    console.log("Error occurred while fetching userinfo!")
    console.error(error);
  }
}

// const API_URL = 'https://gvzip.com';

// export const getInfo = async (membership, campus, fields, page, size, direction) => {
//   try {
//     console.log(membership, campus, fields, page, size, direction);

//     const params = new URLSearchParams({
//       membership: membership,
//       campus: campus,
//       fields: fields,
//       page: page,
//       size: size,
//       direction: direction
//     }).toString();

//     const response = await fetch(`${API_URL}/archive?${params}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       return data;
//     } else {
//       console.log('No response data received');
//     }
//   } catch (error) {
//     console.log("Error occurred while fetching userinfo!");
//     console.error(error);
//   }
// };