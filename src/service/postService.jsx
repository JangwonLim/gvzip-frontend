import axios from "axios";
const API_URL = 'https://gvzip.com';

export const register = async (formData, profileImage) => {
  try {
    const data = new FormData();
    const json = JSON.stringify(formData);

    const blob = new Blob([json], { type: 'application/json' });
    data.append('signUpRequest', blob);

    console.log("profileImage: ", profileImage);

    if (profileImage !== null) {
      data.append('profileImage', profileImage);
    } else {
      console.log("no profile image");
      const imageName = "profile-pic-11.png";
      const imageUrl = require(`./../assets/profile-pic-11.png`);

      // 기본 이미지 파일을 가져오는 비동기 함수
      const fetchDefaultImage = async () => {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const file = new File([blob], imageName, { type: 'image/*' });
        console.log("file created!");
        data.append('profileImage', file);
      };

      // 기본 이미지 추가
      await fetchDefaultImage();
    }
    
    // FormData 확인
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    const response = await axios.post(`${API_URL}/signup`, data, {
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