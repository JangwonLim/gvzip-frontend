import React from "react";
import '../ProfileInfo.css';
import '../../../../styles/defaultDesign.css';
import Name from "../../../../components/SignUpComponents/Name";
import DateOfBirth from "../../../../components/SignUpComponents/DateOfBirth";
import Gender from "../../../../components/SignUpComponents/Gender";
import Email from "../../../../components/SignUpComponents/Email";

function ParentFirstPage({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, goToNextPage}) {

  return (
    <div className="Profile--content-container huge-gap">
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
        formData={formData}
        handleEmail={handleEmail}
        isValidEmail={isValidEmail}
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

export default ParentFirstPage;