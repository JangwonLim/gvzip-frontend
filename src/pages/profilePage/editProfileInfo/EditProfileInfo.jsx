/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './editProfileInfo.css';
import './../../authenticate/SignUp/ProfileInfo.css';
import './../../archivePage/Archive.css';
import AlumAndParentInfo from "./AlumAndParentInfo";
import PopUp from "../../../components/PopUp/PopUp";
import { useGoBack } from "../../../utils/usefulFunctions";
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

  const togglePopUp = () => {
    setPopUp(!popUp);
  }

  const toggleEducation = () => {
    setEducation(!education);
  }

  const toggleCareer = () => {
    setCareer(!career);
  }

  const [newUserInfo, setNewUserInfo] = useState(userInfo);

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

  const handleArrayData = (arrayName, value) => {
    setNewUserInfo((prevState) => ({
      ...prevState,
      [arrayName]: [...prevState[arrayName], value]
    }))
    // handleBackButton();
  }

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

  return(
    <>
      <div className="EditProfileInfo--wrapper">
        <div className="Profile--header">
          <button 
            className="Profile--header-back-button"
            onClick={useGoBack()}
          >
            <img src={require("./../../../assets/profile-header-back-button.png")} alt="back-button" />
          </button> 
          <span className="Profile--header-title">프로필 편집</span>
        </div>

        {
          (userInfo.alumniType === 0 && (!education && !career)) && (
            <AlumAndParentInfo
              toggleEducation={toggleEducation}
              toggleCareer={toggleCareer}
              userInfo={userInfo}
              handleImageChange={handleImageChange}
              handleChange={handleChange}
              updateProfile={updateProfile}
              previewImage={previewImage}
              handleEmail={handleEmail}
            />
          )
        }

        {
          (userInfo.alumniType === 1 && (!education && !career)) && (
            <StudentAndStaffInfo
              userInfo={userInfo}
              handleChange={handleChange}
              updateProfile={updateProfile}
            />
          )
        }

        {
          education && (
            <>
              <div style={{ height: '22px', width: 'auto' }}/>
              <Education
                handleChange={handleArrayData}
              />
              <div style={{ height: '22px', width: 'auto' }}/>
            </>
          )
        }

        {
          career && (
            <>
              <div style={{ height: '22px', width: 'auto' }}/>
              <Career
                handleChange={handleArrayData}
              />
              <div style={{ height: '22px', width: 'auto' }}/>
            </>
          )
        }

        {
          (!education && !career) && (
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