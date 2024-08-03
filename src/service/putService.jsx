import axios from "axios";
const API_URL = 'https://gvzip.com';

export const updateProfilePicture = async (formData, profileImage) => {
  try {
    console.log(JSON.stringify(formData));
    const data = new FormData();
    const json = JSON.stringify(formData);

    const blob = new Blob([json], { type: 'application/json' });
    data.append('profileUpdateRequest', blob);

    if (profileImage) {
      data.append('profileImage', profileImage);
    } else {
      throw new Error("No profile picture changed!");
    }

    // FormData 확인
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const response = await axios.put(`${API_URL}/profile-image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    });

    if (response.data.isSuccess) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while updating the user info including the profile picture!");
    console.error(error);
  }
}

export const updateUserInfo = async (data) => {
  try {
    console.log(data);
    const response = await axios.put(`${API_URL}/profile`, data, {
      withCredentials: true
    });
    console.log(response);
    if (response.data.isSuccess) {
      console.log(response.data);
      return response.data;
    }
  } catch(error) {
    console.log("Error occurred while updating the user info!");
    console.error(error);
  }
}