import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  userInfo: null,
  educations: [],
  careers: []
};

// const initialFilterState = {
//   searchingWord: "",
//   membership: [],
//   campus: [],
//   country: "",
//   state: "",
//   city: "",
//   fields: ""
// };

let userInfo = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    storeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  }
});

let alumniType = createSlice({
  name: 'alumniType',
  initialState: 0,
  reducers: {
    setAlumniType: (state, action) => action.payload,
  },
});

const sortEducations = (educations) => {
  const degreeOrder = ['박사', '석사', '학사'];
  return educations.sort((a, b) => degreeOrder.indexOf(a.degree) - degreeOrder.indexOf(b.degree));
};

let educations = createSlice({
  name: 'educations',
  initialState: initialUserState,
  reducers: {
    addEducation: (state, action) => {
      state.educations.push(action.payload);
      state.educations = sortEducations(state.educations);
    },
    updateEducation: (state, action) => {
      const { index, updatedEducation } = action.payload;
      state.educations[index] = updatedEducation;
      state.educations = sortEducations(state.educations);
    },
    deleteEducation: (state, action) => {
      state.educations.splice(action.payload, 1);
      state.educations = sortEducations(state.educations);
    },
    reset: () => initialUserState
  }
});

const sortCareers = (careers) => {
  return careers.sort((a, b) => b.startYear - a.startYear);
};

let careers = createSlice({
  name: 'careers',
  initialState: initialUserState,
  reducers: {
    addCareer: (state, action) => {
      state.careers.push(action.payload);
      state.careers = sortCareers(state.careers);
    },
    updateCareer: (state, action) => {
      const { index, updatedCareer } = action.payload;
      state.careers[index] = updatedCareer;
      state.careers = sortCareers(state.careers);
    },
    deleteCareer: (state, action) => {
      state.careers.splice(action.payload, 1);
      state.careers = sortCareers(state.careers);
    },
    resetCareer: () => initialUserState
  }
});

export let { storeUserInfo, clearUserInfo } = userInfo.actions;
export let { setAlumniType } = alumniType.actions;
export let { addEducation, updateEducation, deleteEducation, reset } = educations.actions;
export let { addCareer, updateCareer, deleteCareer, resetCareer } = careers.actions;



export default configureStore({
  reducer: {
    user: userInfo.reducer,
    alumniType: alumniType.reducer,
    educations: educations.reducer,
    careers: careers.reducer
  }
});