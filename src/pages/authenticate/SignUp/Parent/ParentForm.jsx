import React from "react";
import ParentFirstPage from "./ParentFirstPage";
import AlumniSecondPage from "../Alumni/AlumniSecondPage";
import AlumniThirdPage from "../Alumni/AlumniThirdPage";
import AlumniFourthPage from "../Alumni/AlumniFourthPage";
import Education from "../Education";
import Career from "../Career";
import Privacy from "../Agreement/Privacy";
import TermsOfUse from "../Agreement/TermsOfUse";
import EditEducation from "../EditEducation";
import EditCareer from "../EditCareer";

function ParentForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, profileImage, previewImage, handleProfileImage, currentPage, goToNextPage, goToPreviousPage, handleEducationClick, handleArrayData, handleCareerClick, handleTermOfUseClick, handleTermClick,  isValidYear, isValidMonth, isValidDay, educationNumber, closeEditEducation, setEducationNumber, openEditEducation, careerNumber, setCareerNumber, openEditCareer}) {

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
            handleCareerClick={handleCareerClick}
            setEducationNumber={setEducationNumber} 
            educationNumber={educationNumber}
            openEditEducation={openEditEducation}
            careerNumber={careerNumber}
            setCareerNumber={setCareerNumber}
            openEditCareer={openEditCareer}
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
            handleTermClick={handleTermClick}
            handleTermOfUseClick={handleTermOfUseClick}
          />
        )
      }

      {
        currentPage === 5 && (
          <Education
            handleArrayData={handleArrayData}
          />
        )
      }

      {
        currentPage === 6 && (
          <Career
            handleArrayData={handleArrayData}
          />
        )
      }

      {
        currentPage === 7 && (
          <Privacy/>
        )
      }

      {
        currentPage === 8 && (
          <TermsOfUse/>
        )
      }
      {
        currentPage === 9 && (
          <EditEducation
            handleChange={handleChange}
            index={educationNumber}
            closeEditEducation={closeEditEducation}
          />
        )
      }
      {
        currentPage === 10 && (
          <EditCareer
            handleChange={handleChange}
            index={careerNumber}
            closeEditEducation={closeEditEducation}
          />
        )
      }
    </>
  )
}

export default ParentForm;