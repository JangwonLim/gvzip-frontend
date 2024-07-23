import React from "react";
import '../ProfileInfo.css';
import '../../../../styles/defaultDesign.css';
import Name from "../../../../components/SignUpComponents/Name";
import DateOfBirth from "../../../../components/SignUpComponents/DateOfBirth";
import Gender from "../../../../components/SignUpComponents/Gender";
import Email from "../../../../components/SignUpComponents/Email";
import Introduction from "../../../../components/SignUpComponents/Introduction";
import Terms from "../../../../components/Terms/Terms";
import ButtonSelection from "../../../../components/SignUpComponents/ButtonSelection";

function StaffForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, handleTermClick, handleTermOfUseClick}) {
  const campusList = ['음성', '문경', '미국'];

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
        title={"재직 캠퍼스"}
        name={"campus"}
        list={campusList}
        isMandatory={true}
      />

      {/* Role */}
      <Introduction 
        formData={formData}
        handleChange={handleChange}
        title={"직무"}
        placeholder={"직무 입력 ex. 생활관 교사"}
        name={"introduction"}
      />

      <Terms
        handleTermClick={handleTermClick}
        handleTermOfUseClick={handleTermOfUseClick}
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

export default StaffForm;