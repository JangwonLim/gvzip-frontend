import React, { useEffect, useState } from "react";
import './ProfileInfo.css';
import '../../../styles/defaultDesign.css';
import Introduction from "../../../components/SignUpComponents/Introduction";
import ButtonSelection from "../../../components/SignUpComponents/ButtonSelection";
import Year from "../../../components/SignUpComponents/Year";

function Education({handleChange}) {
  const statusList = ["재학", "휴학", "졸업"];

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

  const generateExpectedYearOptions = () => {
    const yearOptions = [];
    for (let year = 2003; year <= 2050; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return yearOptions;
  };
  const [yearData, setYearData] = useState({
    schoolName: '', 
    degree: '', 
    status: '', 
    major: '', 
    entranceYear: '', 
    graduationYear: ''
  });
  const [isDataValid, setIsDataValid] = useState(false);

  const handleYearData = (e) => {
    const { name, value } = e.target;

    setYearData((prevYearData) => ({
      ...prevYearData,
      [name]: value
    }));
  }

  useEffect(() => {
    const isSchoolNameValid = yearData.schoolName.length > 0;
    // const isDegreeValid = yearData.degree.length > 0;
    const isStatusValid = yearData.status.length > 0;
    const isMajorValid = yearData.major.length > 0;
    const isEntranceYearValid = yearData.entranceYear.length > 0;
    const isGradYearValid = yearData.graduationYear.length > 0;
    
    if ( isSchoolNameValid && isStatusValid && isMajorValid && isEntranceYearValid && isGradYearValid ) {
      setIsDataValid(true);
    } else {
      setIsDataValid(false);
    }
  },[yearData])

  return(
    <div className="Profile--content-container">
      {/* Degree */}


      {/* School Name */}
      <Introduction
        formData={yearData}
        handleChange={handleYearData}
        title={"학교명"}
        placeholder={"학교명 입력 ex. 지비대학교"}
        name={"schoolName"}
      />

      {/* Major */}
      <Introduction
        formData={yearData}
        handleChange={handleYearData}
        title={"전공"}
        placeholder={"전공 입력 ex. 경영학과"}
        name={"major"}
      />

      {/* Status */}
      <ButtonSelection
        formData={yearData}
        handleChange={handleYearData}
        title={"학적"}
        name={"status"}
        list={statusList}
        isMandatory={true}
      />

      <button 
        className="Profile--navigate-button"
        disabled={!isDataValid}
        onClick={() => handleChange("educations", yearData)}
      >
        <span className="h2-18-sb">저장</span>
      </button>
    </div>
  )
}

export default Education;