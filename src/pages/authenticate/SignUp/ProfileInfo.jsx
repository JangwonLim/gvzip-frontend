import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { calculateGeneration } from "../../../utils/usefulFunctions";

/* eslint-disable no-unused-vars */
function ProfileInfo() {
  const navigate = useNavigate();
  const alumniType = useSelector((state) => state.alumniType);

  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      alumniType: alumniType
    }));
  }, [alumniType]);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidYear, setIsValidYear] = useState(false);
  const [isValidMonth, setIsValidMonth] = useState(false);
  const [isValidDay, setIsValidDay] = useState(false);
  const [isFirstDone, setIsFirstDone] = useState(false);
  const [isSecondDone, setIsSecondDone] = useState(false);
  const [isThirdDone, setIsThirdDone] = useState(false);
  const [isFourthDone, setIsFourthDone] = useState(false);

  const [educationNumber, setEducationNumber] = useState(null);
  const [editEducation, setEditEducation] = useState(false);

  const openEditEducation = () => {
    setCurrentPage(9);
  }
  const closeEditEducation = () => {
    setCurrentPage(2);
  }

  // calculate generation
  useEffect(() => {
    if (formData.campus.length > 0 && String(formData.graduationYear).length > 0) {
      const result = calculateGeneration(formData.campus, formData.graduationYear);
      
      setFormData((prevFormData) => ({
        ...prevFormData,
        generation: result
      }));
    }
  }, [formData.graduationYear, formData.campus]);

  const handleChange = (e, actionType = 'update', index = null, updatedEducation = null) => {
    if (actionType === 'delete' && index !== null) {
      // Delete specific education entry
      setFormData((prevState) => {
        const updatedEducations = prevState.educations.filter((_, i) => i !== parseInt(index));
        return { ...prevState, educations: updatedEducations };
      });
    } else if (actionType === 'update' && index !== null && updatedEducation !== null) {
      // Update specific education entry
      setFormData((prevState) => {
        const updatedEducations = prevState.educations.map((education, i) => 
          i === parseInt(index) ? updatedEducation : education
        );
        return { ...prevState, educations: updatedEducations };
      });
    } else {
      const { name, value } = e.target;
  
      if (
        name === 'graduationYear' ||
        name === 'expectedGraduationYear' ||
        name === 'entranceYear'
      ) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
    } 
    // else if (value === "") {
    //   setIsValidEmail(true);
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [name]: ""
    //   }));
    // } 
    else {
      setIsValidEmail(false);
    }
  }

  const handleArrayData = (arrayName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [arrayName]: [...prevState[arrayName], value]
    }))
    handleBackButton();
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
    const result = await register(formData, profileImage);
    if (result.isSuccess) {
      navigate('/signup/success');
    }
  }

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleEducationClick = () => {
    setCurrentPage(5);
  }
  const handleCareerClick = () => {
    setCurrentPage(6);
  }
  const handleTermClick = () => {
    setCurrentPage(7);
  }
  const handleTermOfUseClick = () => {
    setCurrentPage(8);
  }

  const headerTitle = () => {
    switch (currentPage) {
      case(5):
        return "학력 추가";
      case(6):
        return "경력/경험 추가";
      case(7):
        return "개인정보 처리방침";
      case(8):
        return "이용약관";
      case(9):
        return "학력 수정";
      default:
        return "회원가입";
    }
  }

  const handleBackButton = () => {
    switch (currentPage) {
      case(5):
        setCurrentPage(2);
        break;
      case(6):
        setCurrentPage(2);
        break;
      case(7):
        setCurrentPage(4);
        break;
      case(8):
        setCurrentPage(4);
        break;
      case(9):
        setCurrentPage(2);
        break;
      default:
        navigate(-1);
    }
  }




  return (
    <div className="Profile--container">
      <div className="Profile--header">
        <button 
          className="Profile--header-back-button"
          onClick={handleBackButton}
        >
          <img src={require("../../../assets/profile-header-back-button.png")} alt="back-button" />
        </button> 
        <span className="Profile--header-title">{headerTitle()}</span>
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
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            handleEducationClick={handleEducationClick}
            handleArrayData={handleArrayData}
            handleCareerClick={handleCareerClick}
            handleTermClick={handleTermClick}
            handleTermOfUseClick={handleTermOfUseClick}
            isValidYear={isValidYear}
            isValidMonth={isValidMonth}
            isValidDay={isValidDay}
            educationNumber={educationNumber}
            closeEditEducation={closeEditEducation}
            setEducationNumber={setEducationNumber} 
            openEditEducation={openEditEducation}
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
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            handleEducationClick={handleEducationClick}
            handleArrayData={handleArrayData}
            handleCareerClick={handleCareerClick}
            handleTermClick={handleTermClick}
            handleTermOfUseClick={handleTermOfUseClick}
            educationNumber={educationNumber}
            closeEditEducation={closeEditEducation}
            setEducationNumber={setEducationNumber} 
            openEditEducation={openEditEducation}
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
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            handleTermClick={handleTermClick}
            handleTermOfUseClick={handleTermOfUseClick}
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
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            handleTermClick={handleTermClick}
            handleTermOfUseClick={handleTermOfUseClick}
          />
        )
      }
    </div>
  )
}

export default ProfileInfo;