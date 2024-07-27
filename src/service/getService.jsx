import axios from "axios";
const API_URL = 'https://gvzip.com';


export const getInfo = async (page, size, direction, searchingWord, membership, campus, country, state, city, fields ) => {
  try {
    const response = await axios.get(`${API_URL}/archive`, {
      params: {
        page: page,
        size: size,
        direction: direction,
        searchingWord: searchingWord?.length > 0 ? searchingWord : null,
        membership: membership?.length > 0 ? membership.join(',') : null,
        campus: campus?.length > 0 ? campus.join(',') : null,
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
    const response = await axios.get(`${API_URL}/member`, {
      withCredentials: true
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("Error occurred while fetching MyInfo!")
    console.error(error);
  }
}

export const getIsLogIn = async () => {
  try {
    console.log("request IsLogIn info!")
    const response = await axios.get(`${API_URL}/isLogin`, {
      withCredentials: true
    });
    return response.data;
  } catch(error) {
    console.log("Error occurred while checking isLogIn!")
    console.error(error);
  }
}