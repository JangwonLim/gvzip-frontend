/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import './editProfileInfo.css';
import './../../authenticate/SignUp/ProfileInfo.css';
import './../../archivePage/Archive.css';
import AlumAndParentInfo from "./AlumAndParentInfo";
import PopUp from "../../../components/PopUp/PopUp";
import StudentAndStaffInfo from "./StudentAndStaffInfo";
import { useSelector } from "react-redux";
import { updateProfilePicture, updateUserInfo } from "../../../service/putService";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import EditEducation from "../../authenticate/SignUp/EditEducation";
import Education from "../../authenticate/SignUp/Education";
import Career from "../../authenticate/SignUp/Career";

function EditProfileInfo() {
  const [popUp, setPopUp] = useState(false);
  const [education, setEducation] = useState(false);
  const [career, setCareer] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const navigate = useNavigate();

  const userInfo = useSelector(state => state.user.userInfo);

  const [selectedPicture, setSelectedPicture] = useState(userInfo.profileImageURL);
  const [previewImage, setPreviewImage] = useState(userInfo.profileImageURL);
  const [newUserInfo, setNewUserInfo] = useState(userInfo);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (userInfo.alumniType === 0 && !education && !career) {
      setPage(0);
    } else if (userInfo.alumniType === 1 && !education && !career) {
      setPage(1);
    } else if (education) {
      setPage(2);
    } else if (career) {
      setPage(3);
    } else {
      setPage(4);
    }
  }, [userInfo, education, career]);

  const togglePopUp = () => {
    setPopUp(!popUp);
  }

  const toggleEducation = () => {
    setEducation(!education);
  }

  const toggleCareer = () => {
    setCareer(!career);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e, actionType = 'update', index = null, updatedData = null, type = 'educations') => {
    const updateState = (prevState, type) => {
      const dataToUpdate = prevState[type];
      let updatedDataList;
  
      if (actionType === 'delete' && index !== null) {
        updatedDataList = dataToUpdate.filter((_, i) => i !== parseInt(index));
      } else if (actionType === 'update' && index !== null && updatedData !== null) {
        updatedDataList = dataToUpdate.map((item, i) => i === parseInt(index) ? updatedData : item);
      }
  
      return { ...prevState, [type]: updatedDataList };
    };
  
    if (actionType === 'delete' || (actionType === 'update' && index !== null && updatedData !== null)) {
      setNewUserInfo((prevState) => updateState(prevState, type));
    } else {
      const { name, value } = e.target;
  
      if (
        name === 'graduationYear' ||
        name === 'expectedGraduationYear' ||
        name === 'entranceYear'
      ) {
        setNewUserInfo((prevState) => ({
          ...prevState,
          [name]: parseInt(value),
        }));
      } else {
        setNewUserInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  useEffect(() => {
    console.log(newUserInfo);
  }, [newUserInfo]);

  const updateProfile = async () => {
    try {
      console.log("New userInfo: ", newUserInfo);
      const { profileImageURL, ...rest } = newUserInfo;
      if (selectedPicture === userInfo.profileImageURL) {
        const result = await updateUserInfo(rest);
        console.log("no profile image changed: ", result);
        console.log(result.isSuccess)
        if (result.isSuccess) {
          console.log('successfully update the picture');
          navigate('/profile');
        }
      } else {
        const result = await updateProfilePicture(rest, selectedPicture);
        console.log("profile image changed: ", result);
        console.log(result.isSuccess)
        if (result.isSuccess) {
          console.log('successfully update the picture');
          navigate('/profile');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEmail = (event) => {
    const { name, value } = event.target;
    if (validator.isEmail(value)) {
      setIsValidEmail(true);
      setNewUserInfo((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
    else {
      setIsValidEmail(false);
    }
  }

  const handleTitle = () => {
    switch(page) {
      case 2:
        return "학력 추가";
      case 3:
        return "경력/경험 추가";
      default:
        return "프로필 편집";
    }
  }

  const handleBackButton = () => {
    switch(page) {
      case 2:
        toggleEducation();
        break;
      case 3:
        toggleCareer();
        break;
      default:
        navigate(-1);
    }
  }

  const handleArrayData = (arrayName, value) => {
    setNewUserInfo((prevState) => ({
      ...prevState,
      [arrayName]: [...prevState[arrayName], value]
    }));
    handleBackButton();
  }

  return(
    <>
      <div className="EditProfileInfo--wrapper">
        <div className="Profile--header">
          <button 
            className="Profile--header-back-button"
            onClick={handleBackButton}
          >
            <img src={require("./../../../assets/profile-header-back-button.png")} alt="back-button" />
          </button> 
          <span className="Profile--header-title">{handleTitle()}</span>
        </div>

        {
          (page === 0) && (
            <AlumAndParentInfo
              toggleEducation={toggleEducation}
              toggleCareer={toggleCareer}
              userInfo={userInfo}
              handleImageChange={handleImageChange}
              handleChange={handleChange}
              updateProfile={updateProfile}
              previewImage={previewImage}
              handleEmail={handleEmail}
              newUserInfo={newUserInfo}
            />
          )
        }

        {
          (page === 1) && (
            <StudentAndStaffInfo
              userInfo={userInfo}
              handleChange={handleChange}
              updateProfile={updateProfile}
            />
          )
        }

        {
          (page === 2) && (
            <>
              <div style={{ height: '22px', width: 'auto' }}/>
              <Education
                handleArrayData={handleArrayData}
              />
              <div style={{ height: '22px', width: 'auto' }}/>
            </>
          )
        }

        {
          (page === 3) && (
            <>
              <div style={{ height: '22px', width: 'auto' }}/>
              <Career
                handleArrayData={handleArrayData}
              />
              <div style={{ height: '22px', width: 'auto' }}/>
            </>
          )
        }

        {
          (page === 0 || page === 1) && (
            <button 
              className="EditProfileInfo--delete-account"
              onClick={togglePopUp}
            >
              회원탈퇴
            </button>
          )
        }

      </div>

      {
        popUp && (
          <div className="Archive--modal-backdrop" onClick={togglePopUp}>
            <PopUp purpose={"회원탈퇴"} closePopUp={togglePopUp}/>
          </div>
        )
      }
    </>
  )
}

export default EditProfileInfo;