import axios from "axios";
const API_URL = 'https://gvzip.com';

export const register = async (formData, profileImage) => {
  try {
    const data = new FormData();
    const json = JSON.stringify(formData);

    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    // data.append('profileImage', null);
    data.append('signUpRequest', json);

    
    // FormData 확인
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(`${API_URL}/signup`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    });

    if (response.data.success) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while registering the user!");
    console.error(error);
  }
};

// const API_URL = 'https://gvzip.com';

// export const register = async (formData, profileImage) => {
//   try {
//     const data = new FormData();
//     const json = JSON.stringify(formData);

//     data.append('json', json);
//     if (profileImage) {
//       data.append('profileImage', profileImage);
//     }

//     // FormData 확인
//     for (let [key, value] of data.entries()) {
//       console.log(key, value);
//     }

//     const response = await fetch(`${API_URL}/signup`, {
//       method: 'POST',
//       body: data,
//       headers: {
//         'Access-Control-Allow-Origin': '*'
//       }
//     });

//     const result = await response.json();

//     if (result.success) {
//       console.log(result);
//       return result;
//     }
//   } catch (error) {
//     console.log("Error occurred while registering the user!");
//     console.error(error);
//   }
// };