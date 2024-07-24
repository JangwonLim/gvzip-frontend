import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  userInfo: null,
  educations: []
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

let educations = createSlice({
  name: 'educations',
  initialState: initialUserState,
  reducers: {
    addEducation: (state, action) => {
      state.educations.push(action.payload);
    },
    updateEducation: (state, action) => {
      const { index, updatedEducation } = action.payload;
      state.educations[index] = updatedEducation;
    },
    deleteEducation: (state, action) => {
      state.educations.splice(action.payload, 1);
    },
    reset: () => initialUserState // 상태를 초기화하는 리듀서
  }
});



export let { storeUserInfo, clearUserInfo } = userInfo.actions;
export let { setAlumniType } = alumniType.actions;
export let { addEducation, updateEducation, deleteEducation, reset } = educations.actions;


export default configureStore({
  reducer: {
    user: userInfo.reducer,
    alumniType: alumniType.reducer,
    educations: educations.reducer
  }
});