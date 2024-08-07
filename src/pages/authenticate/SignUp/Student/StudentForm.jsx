import React, { useEffect, useState } from "react";
import '../ProfileInfo.css';
import '../../../../styles/defaultDesign.css';
import Name from "../../../../components/SignUpComponents/Name";
import DateOfBirth from "../../../../components/SignUpComponents/DateOfBirth";
import Gender from "../../../../components/SignUpComponents/Gender";
import Email from "../../../../components/SignUpComponents/Email";
import ButtonSelection from "../../../../components/SignUpComponents/ButtonSelection";
import Year from "../../../../components/SignUpComponents/Year";
import Terms from "../../../../components/Terms/Terms";

function StudentForm({formData, handleChange, handleBornYearChange, handleBornMonthChange, handleBornDayChange, handleEmail, isValidEmail, registerUser, handleTermClick, handleTermOfUseClick, isValidYear, isValidMonth, isValidDay}) {
  const campusList = ['음성', '문경', '미국'];
  const [isValid, setIsValid] = useState(false);
  const [termOfUse, setTermOfUse] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [providePrivacy, setProvidePrivacy] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [clickCount, setClickCount] = useState(0);

  const agreeAll = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      const isOddClick = newCount % 2 !== 0;

      setTermOfUse(isOddClick);
      setPrivacy(isOddClick);
      setProvidePrivacy(isOddClick);

      console.log(isOddClick, isOddClick, isOddClick);

      return newCount;
    });
  }

  const toggleTermOfUse = () => {
    setTermOfUse(!termOfUse);
  }
  const togglePrivacy = () => {
    setPrivacy(!privacy);
  }
  const toggleOptionalPrivacy = () => {
    setProvidePrivacy(!providePrivacy);
  }

  useEffect(() => {
    setIsValid(
      formData["korName"].length > 0 &&
      formData["engName"].length > 0 &&
      isValidYear && isValidMonth && isValidDay &&
      formData["sex"].length > 0 &&
      isValidEmail &&
      formData["campus"].length > 0 &&
      String(formData["entranceYear"]).length > 0 &&
      String(formData["expectedGraduationYear"]).length > 0 &&
      termOfUse && privacy && providePrivacy
    )
  }, [formData, isValidEmail, isValidYear, isValidMonth, isValidDay, termOfUse, privacy, providePrivacy]);

  // List of entrance year
  const generateYearOptions = () => {
    const yearOptions = [];
    for (let year = 2003; year <= 2024; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return yearOptions;
  };

  // List of grad year
  const generateGradYearOptions = () => {
    const yearOptions = [];
    for (let year = 2003; year <= 2040; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return yearOptions;
  };
  
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
        options={generateGradYearOptions}
        title={"졸업 예정년도"}
        placeholder={"졸업 예정년도 선택"}
      />

      <Terms
        handleTermClick={handleTermClick}
        handleTermOfUseClick={handleTermOfUseClick}
        agreeAll={agreeAll}
        setTermsOfUse={toggleTermOfUse}
        setPrivacy={togglePrivacy}
        setOptionalPrivacy={toggleOptionalPrivacy}
        termOfUse={termOfUse}
        privacy={privacy}
        optionalPrivacy={providePrivacy}
      />

      <button 
        className="Profile--navigate-button"
        disabled={!isValid}
        onClick={registerUser}
      >
        <span className="h2-18-sb">완료</span>
      </button>
    </div>
  )
}

export default StudentForm;