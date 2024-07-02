import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import './ProfileInfo.css';
import './Signup.css';
import './../../../styles/defaultDesign.css';
import AlumniForm from "./Alumni/AlumniForm";
import { 
  validateYear, 
  validateMonth, 
  validateDay 
} from "../../../utils/validate";
import validator from "validator";
import { register } from "../../../service/postService";
import ParentForm from "./Parent/ParentForm";
import StudentForm from "./Student/StudentForm";
import StaffForm from "./Staff/StaffForm";
/* eslint-disable no-unused-vars */
function ProfileInfo() {
  const alumniType = useSelector((state) => state.alumniType);

  const [formData, setFormData] = useState({
    korName: '',
    engName: '',
    bornYear: 0,
    bornMonth: 0,
    bornDay: 0,
    sex: '',
    email: '',
    campus: '',
    graduationYear: 0,
    expectedGraduationYear: 0,
    generation: 0,
    country: '',
    state: '',
    city: '',
    field1: '',
    field2: '',
    field3: '',
    introduction: '',
    alumniType: null,
    sns: 'www.instagram.com',
    // educations: [{ schoolName: '', degree: '', status: '', major: '', entranceYear: '', graduationYear: '' }],
    educations: [
      {
        "schoolName": "Seoul National University",
        "degree": "Bachelor's",
        "status": "Graduated",
        "major": "Computer Science",
        "entranceYear": 2008,
        "graduationYear": 2012
      },
      {
        "schoolName": "Korea University",
        "degree": "Master's",
        "status": "Graduated",
        "major": "AI",
        "entranceYear": 2013,
        "graduationYear": 2015
      }
    ],
    // careers: [{ companyName: '', position: '', startYear: '', duration: '' }],
    "careers": [
      {
        "companyName": "Samsung Electronics",
        "position": "Software Engineer",
        "startYear": 2015,
        "duration": 3
      },
      {
        "companyName": "LG Electronics",
        "position": "Senior Software Engineer",
        "startYear": 2018,
        "duration": 5
      }
    ],
    entranceYear: 0
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      alumniType: alumniType
    }));
  }, [alumniType]);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidYear, setIsValidYear] = useState(false);
  const [isValidMonth, setIsValidMonth] = useState(false);
  const [isValidDay, setIsValidDay] = useState(false);
  // const [generation, setGeneration] = useState(15); // fixed now, but needs to be changed

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'graduationYear'){
      setFormData((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    }
  };

  const handleBornYearChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
    setIsValidYear(validateYear(value));
  };

  const handleBornMonthChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
    setIsValidMonth(validateMonth(value));
  };

  const handleBornDayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
    setIsValidDay(validateDay(value));
  };

  const handleEmail = (event) => {
    const { name, value } = event.target;
    if (validator.isEmail(value)) {
      setIsValidEmail(true);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    } else if (value === "") {
      setIsValidEmail(true);
      setFormData((prevState) => ({
        ...prevState,
        [name]: ""
      }));
    } else {
      setIsValidEmail(false);
    }
  }
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProfileImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log(reader);
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
  }

  const registerUser = async (e) => {
    e.preventDefault();
    await register(formData, profileImage)
  }

  return (
    <div className="Profile--container">
      <div className="Profile--header">
        <button className="Profile--header-back-button">
          <img src={require("../../../assets/profile-header-back-button.png")} alt="back-button" />
        </button> 
        <span className="h3-20-b">회원가입</span>
      </div>

      {
        alumniType === 0 && (
          <AlumniForm
            formData={formData}
            handleChange={handleChange}
            handleBornYearChange={handleBornYearChange}
            handleBornMonthChange={handleBornMonthChange}
            handleBornDayChange={handleBornDayChange}
            handleEmail={handleEmail}
            isValidEmail={isValidEmail}
            registerUser={registerUser}
            profileImage={profileImage}
            previewImage={previewImage}
            handleProfileImage={handleProfileImage}
          />
        )
      }

      {
        alumniType === 1 && (
          <ParentForm
            formData={formData}
            handleChange={handleChange}
            handleBornYearChange={handleBornYearChange}
            handleBornMonthChange={handleBornMonthChange}
            handleBornDayChange={handleBornDayChange}
            handleEmail={handleEmail}
            isValidEmail={isValidEmail}
            registerUser={registerUser}
            profileImage={profileImage}
            previewImage={previewImage}
            handleProfileImage={handleProfileImage}
          />
        )
      }

      {
        alumniType === 2 && (
          <StudentForm
            formData={formData}
            handleChange={handleChange}
            handleBornYearChange={handleBornYearChange}
            handleBornMonthChange={handleBornMonthChange}
            handleBornDayChange={handleBornDayChange}
            handleEmail={handleEmail}
            isValidEmail={isValidEmail}
            registerUser={registerUser}
          />
        )
      }

      {
        alumniType === 3 && (
          <StaffForm
            formData={formData}
            handleChange={handleChange}
            handleBornYearChange={handleBornYearChange}
            handleBornMonthChange={handleBornMonthChange}
            handleBornDayChange={handleBornDayChange}
            handleEmail={handleEmail}
            isValidEmail={isValidEmail}
            registerUser={registerUser}
          />
        )
      }
    </div>
  )
}

export default ProfileInfo;