import React from "react";
import './editProfileInfo.css';
import './../../../styles/defaultDesign.css';
import Email from "../../../components/SignUpComponents/Email";
import ButtonSelection from "../../../components/SignUpComponents/ButtonSelection";
import './../../authenticate/SignUp/ProfileInfo.css';
import Year from "../../../components/SignUpComponents/Year";
import { useGoBack } from "../../../utils/usefulFunctions";
import Introduction from "../../../components/SignUpComponents/Introduction";

function StudentAndStaffInfo() {

  const formData = {
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
  };

  const campusList = ['음성', '문경', '미국'];

  const handleChange = () => {
    //TODO
  }

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

  return (
    <div className="EditProfileInfo--container">
      <div className="EditProfileInfo--additional-info">
        <Email
          formData={formData}
        />

        <ButtonSelection 
          formData={formData}
          handleChange={handleChange}
          title={"재학 캠퍼스"}
          name={"campus"}
          list={campusList}
          isMandatory={true}
        />

        {/* Entrance year */}
        <Year 
          formData={formData}
          handleChange={handleChange}
          options={generateYearOptions}
          title={"입학년도"}
          placeholder={"입학년도 선택"}
        />
        {/* Expected graduation year */}
        <Year 
          formData={formData}
          handleChange={handleChange}
          options={generateYearOptions}
          title={"졸업 예정년도"}
          placeholder={"졸업 예정년도 선택"}
        />

        {/* Role */}
        <Introduction 
          formData={formData}
          handleChange={handleChange}
          title={"직무"}
          placeholder={"직무 입력 ex. 생활관 교사"}
          name={"introduction"}
        />

        <div className="ProfilePage--button-container">
          <button 
            onClick={useGoBack()}
            className="ProfilePage--button"
          >
            <span className="h2-18-sb">취소</span>
          </button>
          <button 
            // onClick={changeProfilePicture}
            disabled
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