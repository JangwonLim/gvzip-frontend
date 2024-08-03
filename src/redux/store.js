import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const initialUserState = {
  userInfo: null
};

const initialEducationState = {
  educations: []
};

const initialCareerState = {
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


let educations = createSlice({
  name: 'educations',
  initialState: initialEducationState,
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
    reset: () => initialEducationState // 상태를 초기화하는 리듀서
  }
});

let careers = createSlice({
  name: 'careers',
  initialState: initialCareerState,
  reducers: {
    addCareer: (state, action) => {
      state.careers.push(action.payload);
    },
    updateCareer: (state, action) => {
      const { index, updatedCareer } = action.payload;
      state.careers[index] = updatedCareer;
    },
    deleteCareer: (state, action) => {
      state.careers.splice(action.payload, 1);
    },
    resetCareer: () => initialCareerState // 상태를 초기화하는 리듀서
  }
});

export let { storeUserInfo, clearUserInfo } = userInfo.actions;
export let { setAlumniType } = alumniType.actions;
export let { addEducation, updateEducation, deleteEducation, reset } = educations.actions;
export let { addCareer, updateCareer, deleteCareer, resetCareer } = careers.actions;



// 리듀서 결합
const rootReducer = combineReducers({
  user: userInfo.reducer,
  alumniType: alumniType.reducer,
  educations: educations.reducer,
  careers: careers.reducer
});

// Persist 설정
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'educations', 'careers'] // 영속화할 리듀서 선택
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 구성
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist와 함께 사용하기 위해 serializableCheck 비활성화
    }),
});

const persistor = persistStore(store);

export { store, persistor };