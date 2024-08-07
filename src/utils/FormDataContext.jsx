import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    korName: '',
    engName: '',
    bornYear: '',
    bornMonth: '',
    bornDay: '',
    sex: '',
    email: '',
    campus: '',
    graduationYear: '',
    expectedGraduationYear: '',
    generation: '',
    country: '',
    state: '',
    city: '',
    field1: '',
    field2: '',
    field3: '',
    introduction: '',
    alumniType: null,
    sns: '',
    entranceYear: '',
    educations: [],
    careers: []
  });

  const userInfo = useSelector(state => state.user.userInfo);
  
  const [newUserInfo, setNewUserInfo] = useState(userInfo);

  return (
    <FormDataContext.Provider value={{ formData, setFormData, newUserInfo, setNewUserInfo }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;