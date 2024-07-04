import React from "react";
import ParentFirstPage from "./ParentFirstPage";
import AlumniSecondPage from "../Alumni/AlumniSecondPage";
import AlumniThirdPage from "../Alumni/AlumniThirdPage";
import AlumniFourthPage from "../Alumni/AlumniFourthPage";

function ParentForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, profileImage, previewImage, handleProfileImage, currentPage, goToNextPage, goToPreviousPage, handleEducationClick, handleArrayData}) {

  return(
    <>
      { 
        currentPage === 1 && (
          <ParentFirstPage 
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
          />
        )
      }
    </>
  )
}

export default ParentForm;