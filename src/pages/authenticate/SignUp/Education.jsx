import React, { useEffect, useState } from "react";
import './ProfileInfo.css';
import '../../../styles/defaultDesign.css';
import Introduction from "../../../components/SignUpComponents/Introduction";
import ButtonSelection from "../../../components/SignUpComponents/ButtonSelection";
import Year from "../../../components/SignUpComponents/Year";
// import Year from "../../../components/SignUpComponents/Year";

function Education({handleChange}) {
  const statusList = ["재학", "휴학", "졸업"];
  const degreeList = ["학사", "석사", "박사"];

  const generateYearOptions = () => {
    const yearOptions = [];
    for (let year = 1950; year <= 2024; year++) {
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
    for (let year = 1950; year <= 2050; year++) {
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
    graduationYear: '',
    expectedGraduationYear: ''
  });
  const [isDataValid, setIsDataValid] = useState(false);

  const handleYearData = (e) => {
    const { name, value } = e.target;
    
    if (name === "entranceYear" || name === "graduationYear" || name === "expectedGraduationYear") {
      setYearData((prevYearData) => ({
        ...prevYearData,
        [name]: parseInt(value)
      }));
    } else {
      setYearData((prevYearData) => ({
        ...prevYearData,
        [name]: value
      }));
    }
  }

  useEffect(() => {
    const isSchoolNameValid = yearData.schoolName.length > 0;
    const isDegreeValid = yearData.degree.length > 0;
    const isStatusValid = yearData.status.length > 0;
    const isMajorValid = yearData.major.length > 0;
    const isEntranceYearValid = String(yearData.entranceYear).length > 0;
    const isGradYearValid = String(yearData.graduationYear).length > 0 || String(yearData.expectedGraduationYear).length > 0;
    

    console.log(isSchoolNameValid, isDegreeValid, isStatusValid, isMajorValid, isEntranceYearValid, isGradYearValid)
    if ( isSchoolNameValid && isStatusValid && isMajorValid && isEntranceYearValid && isGradYearValid && isDegreeValid ) {
      setIsDataValid(true);
    } else {
      setIsDataValid(false);
    }

    console.log(yearData)
  },[yearData])

  return(
    <div className="Profile--content-container">
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

      {/* Degree */}
      <ButtonSelection
        formData={yearData}
        handleChange={handleYearData}
        title={"학위"}
        name={"degree"}
        list={degreeList}
        isMandatory={true}
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

      <Year
        formData={yearData}
        handleChange={handleYearData}
        options={generateYearOptions}
        title={"입학년도"}
        placeholder={"입학년도 선택"}
      />

      <Year
        formData={yearData}
        handleChange={handleYearData}
        options={generateExpectedYearOptions}
        title={"졸업(예정)년도"}
        placeholder={"졸업(예정)년도 선택"}
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