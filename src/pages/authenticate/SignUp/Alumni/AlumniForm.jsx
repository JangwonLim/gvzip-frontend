import React from "react";
import AlumniFirstPage from "./AlumniFirstPage";
import AlumniSecondPage from "./AlumniSecondPage";
import AlumniThirdPage from "./AlumniThirdPage";
import AlumniFourthPage from "./AlumniFourthPage";
import Education from "../Education";
import Career from "../Career";
import Privacy from "../Agreement/Privacy";
import TermsOfUse from "../Agreement/TermsOfUse";
import EditEducation from "../EditEducation";
import EditCareer from "../EditCareer";

function AlumniForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, profileImage, previewImage, handleProfileImage, currentPage, goToNextPage, goToPreviousPage, handleEducationClick, handleArrayData, handleCareerClick, handleTermClick, handleTermOfUseClick, isValidYear, isValidMonth, isValidDay, educationNumber, closeEditEducation, setEducationNumber, openEditEducation, careerNumber, setCareerNumber, openEditCareer}) {

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
            isValidYear={isValidYear}
            isValidMonth={isValidMonth}
            isValidDay={isValidDay}
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

export default AlumniForm;