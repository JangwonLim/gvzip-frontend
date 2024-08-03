/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import './editProfileInfo.css';
import './../../authenticate/SignUp/ProfileInfo.css';
import AlumAndParentInfo from "./AlumAndParentInfo";
import PopUp from "../../../components/PopUp/PopUp";
import { useGoBack } from "../../../utils/usefulFunctions";
import StudentAndStaffInfo from "./StudentAndStaffInfo";

function EditProfileInfo() {
  const [popUp, setPopUp] = useState(false);
  const [education, setEducation] = useState(false);
  const [career, setCareer] = useState(false);

  const handlePopUp = () => {
    setPopUp(true);
  }

  const toggleEducation = () => {
    setEducation(!education);
  }

  const toggleCareer = () => {
    setCareer(!career);
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

        {/* <AlumAndParentInfo
          toggleEducation={toggleEducation}
          toggleCareer={toggleCareer}
        /> */}

        <StudentAndStaffInfo/>

        <button 
          className="EditProfileInfo--delete-account"
          onClick={handlePopUp}
        >
          회원탈퇴
        </button>
      </div>

      {
        popUp && (
          <PopUp purpose={"회원탈퇴"}/>
        )
      }
    </>
  )
}

export default EditProfileInfo;