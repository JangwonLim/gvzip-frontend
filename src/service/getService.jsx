import axios from "axios";
const API_URL = 'https://gvzip.com';


export const getInfo = async (page, size, direction, searchingWord, membership, campus, country, state, city, fields ) => {
  try {
    const response = await axios.get(`${API_URL}/archive`, {
      params: {
        page: page,
        size: size,
        direction: direction,
        searchingWord: searchingWord,
        membership: membership,
        campus: campus,
        country: country,
        state: state,
        city: city,
        fields: fields,
      }, withCredentials: true
    })
    // console.log(response.data)

    if (response && response.data) {
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

export const getChildInfo = async (nameOfChild, bornYearOfChild, bornMonthOfChild, bornDayOfChild) => {
  try {
    const response = await axios.get(`${API_URL}/parent-test`, {
      params: {
        nameOfChild: nameOfChild,
        bornYearOfChild: bornYearOfChild,
        bornMonthOfChild: bornMonthOfChild,
        bornDayOfChild: bornDayOfChild
      }
    });

    return response.data.isSuccess;
  } catch (error) {
    console.log("Error occurred while fetching ChildInfo!")
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