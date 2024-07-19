import axios from "axios";
const API_URL = 'https://gvzip.com';


export const getInfo = async (page, size, direction, searchingWord, membership, campus, country, state, city, fields ) => {
  // console.log(page, size, direction, searchingWord, membership, campus, country, state, fields)
  try {
    const response = await axios.get(`${API_URL}/archive`, {
      params: {
        page: page,
        size: size,
        direction: direction,
        searchingWord: searchingWord?.length > 0 ? searchingWord : null,
        membership: membership?.length > 0 ? membership : null,
        campus: campus?.length > 0 ? campus : null,
        country: country?.length > 0 ? country : null,
        state: state?.length > 0 ? state : null,
        // city: city,
        fields: fields?.length > 0 ? fields : null
      }, withCredentials: true
    })

    if (response.data) {
      return response.data;
    } else {
      console.log('No response data received');
    }

  } catch (error) {
    console.log("Error occurred while fetching userinfo!")
    console.error(error);
  }
}

// export const getChildInfo = async (nameOfChild, bornYearOfChild, bornMonthOfChild, bornDayOfChild) => {
//   try {
//     console.log(nameOfChild, bornYearOfChild, bornMonthOfChild, bornDayOfChild);
//     const response = await axios.get(`${API_URL}/parent-test`, {
//       params: {
//         nameOfChild: nameOfChild,
//         bornYearOfChild: bornYearOfChild,
//         bornMonthOfChild: bornMonthOfChild,
//         bornDayOfChild: bornDayOfChild
//       }, withCredentials: true
//     });
//     console.log("childInfo result: ", response.data);

//     if (response.data.isSuccess === true) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.log("Error occurred while fetching ChildInfo!")
//     console.error(error);
//   }
// }

export const getChildInfo = async (nameOfChild, bornYearOfChild, bornMonthOfChild, bornDayOfChild) => {
  try {
    console.log("Request params:", { nameOfChild, bornYearOfChild, bornMonthOfChild, bornDayOfChild });
    
    const response = await axios.get(`${API_URL}/parents-test`, {
      params: {
        nameOfChild,
        bornYearOfChild,
        bornMonthOfChild,
        bornDayOfChild
      },
      withCredentials: true
    });

    console.log("childInfo result:", response.data);

    return response.data.isSuccess === true;
  } catch (error) {
    console.error("Error occurred while fetching ChildInfo!");
    return false;
  }
};

export const getMyInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/member`);
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while fetching MyInfo!")
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