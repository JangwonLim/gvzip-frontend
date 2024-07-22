import React from "react";
import '../ProfileInfo.css';
import '../../../../styles/defaultDesign.css';
import Name from "../../../../components/SignUpComponents/Name";
import DateOfBirth from "../../../../components/SignUpComponents/DateOfBirth";
import Gender from "../../../../components/SignUpComponents/Gender";
import Email from "../../../../components/SignUpComponents/Email";
import ButtonSelection from "../../../../components/SignUpComponents/ButtonSelection";
import Year from "../../../../components/SignUpComponents/Year";
import Terms from "../../../../components/Terms/Terms";

function StudentForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, handleTermClick}) {
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
        title={"졸업(예정)년도"}
        placeholder={"졸업(예정)년도 선택"}
      />

      <Terms
        handleTermClick={handleTermClick}
      />

      <button 
        className="Profile--navigate-button"
        // disabled={!isFirstDone}
        onClick={registerUser}
      >
        <span className="h2-18-sb">완료</span>
      </button>
    </div>
  )
}

export default StudentForm;