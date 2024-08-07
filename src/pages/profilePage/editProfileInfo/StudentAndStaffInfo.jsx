import React, { useEffect, useState } from "react";
import './editProfileInfo.css';
import './../../../styles/defaultDesign.css';
import Email from "../../../components/SignUpComponents/Email";
import ButtonSelection from "../../../components/SignUpComponents/ButtonSelection";
import './../../authenticate/SignUp/ProfileInfo.css';
import Year from "../../../components/SignUpComponents/Year";
import { useGoBack } from "../../../utils/usefulFunctions";
import Introduction from "../../../components/SignUpComponents/Introduction";

function StudentAndStaffInfo({userInfo, handleChange, updateProfile, isValidEmail, handleEmail, newUserInfo}) {

  const campusList = ['음성', '문경', '미국'];

  // List of graduation year
  const generateYearOptions = () => {
    const yearOptions = [];
    for (let year = 2003; year <= 2023; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return yearOptions;
  };

  const title = () => {
    if (userInfo.alumniType === 2) {
      return "재학 캠퍼스";
    } else {
      return "재직 캠퍼스"
    }
  }

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (userInfo.alumniType === 2) {
      setIsValid(
        isValidEmail && (
          userInfo.email !== newUserInfo.email ||
          userInfo.campus !== newUserInfo.campus ||
          userInfo.entranceYear !== newUserInfo.entranceYear ||
          userInfo.expectedGraduationYear !== newUserInfo.expectedGraduationYear
        )
      )
    } else {
      setIsValid(
        isValidEmail && (
          userInfo.email !== newUserInfo.email ||
          userInfo.campus !== newUserInfo.campus ||
          userInfo.introduction !== newUserInfo.introduction
        )
      )
    }
  }, [isValidEmail, userInfo, newUserInfo])

  return (
    <div className="EditProfileInfo--container">
      <div className="EditProfileInfo--additional-info">
        <Email
          formData={userInfo}
          handleEmail={handleEmail}
          isValidEmail={isValidEmail}
        />

        <ButtonSelection 
          formData={newUserInfo}
          handleChange={handleChange}
          title={title()}
          name={"campus"}
          list={campusList}
          isMandatory={true}
        />

        {
          userInfo.alumniType === 2 && (
            <>
              <Year 
                formData={newUserInfo}
                handleChange={handleChange}
                options={generateYearOptions}
                title={"입학년도"}
                placeholder={"입학년도 선택"}
              />
              <Year 
                formData={newUserInfo}
                handleChange={handleChange}
                options={generateYearOptions}
                title={"졸업 예정년도"}
                placeholder={"졸업 예정년도 선택"}
              />
            </>
          )
        }

        {
          userInfo.alumniType === 3 && (
            <Introduction 
              formData={userInfo}
              handleChange={handleChange}
              title={"직무"}
              placeholder={"직무 입력 ex. 생활관 교사"}
              name={"introduction"}
            />
          )
        }


        <div className="ProfilePage--button-container">
          <button 
            onClick={useGoBack()}
            className="ProfilePage--button"
          >
            <span className="h2-18-sb">취소</span>
          </button>
          <button 
            onClick={updateProfile}
            disabled={!isValid}
            className="ProfilePage--button black"
          >
            <span className="h2-18-sb">저장</span>
          </button>
        </div>
      </div>

    </div> 
  )
}

export default StudentAndStaffInfo;