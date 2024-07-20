import React from "react";
import AlumniFirstPage from "./AlumniFirstPage";
import AlumniSecondPage from "./AlumniSecondPage";
import AlumniThirdPage from "./AlumniThirdPage";
import AlumniFourthPage from "./AlumniFourthPage";
import Education from "../Education";
import Career from "../Career";

function AlumniForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, profileImage, previewImage, handleProfileImage, currentPage, goToNextPage, goToPreviousPage, handleEducationClick, handleArrayData, handleCareerClick}) {

  return(
    <>
      { currentPage === 1 && (
          <AlumniFirstPage 
            formData={formData}
            handleChange={handleChange}
            handleBornYearChange={handleBornYearChange}
            handleBornMonthChange={handleBornMonthChange}
            handleBornDayChange={handleBornDayChange}
            handleEmail={handleEmail}
            isValidEmail={isValidEmail}
            goToNextPage={goToNextPage}
          />
        )
      }

      {
        currentPage === 2 && (
          <AlumniSecondPage 
            formData={formData}
            handleChange={handleChange}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            handleEducationClick={handleEducationClick}
            handleArrayData={handleArrayData}
          />
        )
      }
      
      {
        currentPage === 3 && (
          <AlumniThirdPage 
            formData={formData}
            handleChange={handleChange}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
          />
        )
      }
      
      {
        currentPage === 4 && (
          <AlumniFourthPage 
            formData={formData}
            handleChange={handleChange}
            goToPreviousPage={goToPreviousPage}
            registerUser={registerUser}
            profileImage={profileImage}
            previewImage={previewImage}
            handleProfileImage={handleProfileImage}
            handleArrayData={handleArrayData}
            handleCareerClick={handleCareerClick}
          />
        )
      }

      {
        currentPage === 5 && (
          <Education
            handleChange={handleArrayData}
          />
        )
      }

      {
        currentPage === 6 && (
          <Career
            handleChange={handleArrayData}
          />
        )
      }
    </>
  )
}

export default AlumniForm;