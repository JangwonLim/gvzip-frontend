import React from "react";
import AlumniFirstPage from "./AlumniFirstPage";
import AlumniSecondPage from "./AlumniSecondPage";
import AlumniThirdPage from "./AlumniThirdPage";
import AlumniFourthPage from "./AlumniFourthPage";
import Education from "../Education";
import Career from "../Career";
import Privacy from "../Agreement/Privacy";

function AlumniForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, profileImage, previewImage, handleProfileImage, currentPage, goToNextPage, goToPreviousPage, handleEducationClick, handleArrayData, handleCareerClick, handleTermClick}) {

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
            handleTermClick={handleTermClick}
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

      {
        currentPage === 7 && (
          <Privacy/>
        )
      }
    </>
  )
}

export default AlumniForm;