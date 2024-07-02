import React from "react";
import './../Signup.css';
import '../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import Name from "../../../../components/SignUpComponents/Name";
import DateOfBirth from "../../../../components/SignUpComponents/DateOfBirth";
import Gender from "../../../../components/SignUpComponents/Gender";
import Email from "../../../../components/SignUpComponents/Email";
import Year from "../../../../components/SignUpComponents/Year";
import ButtonSelection from "../../../../components/SignUpComponents/ButtonSelection";

function AlumniFirstPage({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, goToNextPage}) {
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
  
  return (
    <div className="Profile--content-container">
      {/* Name */}
      <Name 
        formData={formData}
        handleChange={handleChange}
      />

      {/* DoB */}
      <DateOfBirth 
        formData={formData}
        handleBornYearChange={handleBornYearChange}
        handleBornMonthChange={handleBornMonthChange}
        handleBornDayChange={handleBornDayChange}
      />

      {/* Gender */}
      <Gender 
        formData={formData}
        handleChange={handleChange}
      />

      {/* Email */}
      <Email
        handleEmail={handleEmail}
        isValidEmail={isValidEmail}
      />

      {/* Campus */}
      <ButtonSelection 
        formData={formData}
        handleChange={handleChange}
        title={"졸업한 캠퍼스"}
        name={"campus"}
        list={campusList}
        isMandatory={true}
      />

      {/* Graduation year */}
      <Year 
        formData={formData}
        handleChange={handleChange}
        options={generateYearOptions}
        title={"졸업년도"}
        placeholder={"졸업년도 선택"}
      />

      <button 
        className="Profile--navigate-button"
        // disabled={!isFirstDone}
        onClick={goToNextPage}
      >
        <span className="h2-18-sb">다음</span>
      </button>
    </div>
  )
}

export default AlumniFirstPage;