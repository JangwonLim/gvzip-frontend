import React, { useEffect, useState } from "react";
import './ProfileInfo.css';
import '../../../styles/defaultDesign.css';
import Introduction from "../../../components/SignUpComponents/Introduction";
import ButtonSelection from "../../../components/SignUpComponents/ButtonSelection";
import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../../../redux/store";

function EditEducation({handleChange, index, closeEditEducation}) {
  const dispatch = useDispatch();
  console.log("index: ", index);

  const statusList = ["재학", "휴학", "졸업"];
  const degreeList = ["학사", "석사", "박사"];
  
  const educations = useSelector((state) => state.educations.educations);

  const [yearData, setYearData] = useState({
    schoolName: '', 
    degree: '', 
    status: '', 
    major: ''
  });
  
  const [isDataValid, setIsDataValid] = useState(false);

  const handleYearData = (e) => {
    const { name, value } = e.target;
    
    setYearData((prevYearData) => ({
      ...prevYearData,
      [name]: value
    }));
  }

  const updateEducationHandler = () => {
    // Update the local state and Redux state
    handleChange(null, 'update', index, yearData);
    dispatch(updateEducation({ index, updatedEducation: yearData }));
    closeEditEducation();
  };

  useEffect(() => {
    if (educations[index]) {
      setYearData(educations[index]);
    }
  }, [index, educations]);


  useEffect(() => {
    const isSchoolNameValid = yearData.schoolName.length > 0;
    const isDegreeValid = yearData.degree.length > 0;
    const isStatusValid = yearData.status.length > 0;
    const isMajorValid = yearData.major.length > 0;

    setIsDataValid(isSchoolNameValid && isStatusValid && isMajorValid && isDegreeValid);
  },[yearData])

  return(
    <div 
      className="Profile--content-container huge-gap"
    >
      {/* School Name */}
      <Introduction
        formData={yearData}
        handleChange={handleYearData}
        title={"학교명"}
        placeholder={"학교명 입력 ex. 지비대학교"}
        name={"schoolName"}
      />

      {/* Major */}
      <Introduction
        formData={yearData}
        handleChange={handleYearData}
        title={"전공"}
        placeholder={"전공 입력 ex. 경영학과"}
        name={"major"}
      />

      {/* Degree */}
      <ButtonSelection
        formData={yearData}
        handleChange={handleYearData}
        title={"학위"}
        name={"degree"}
        list={degreeList}
        isMandatory={true}
      />

      {/* Status */}
      <ButtonSelection
        formData={yearData}
        handleChange={handleYearData}
        title={"학적"}
        name={"status"}
        list={statusList}
        isMandatory={true}
      />

      <button 
        className="Profile--navigate-button"
        disabled={!isDataValid}
        onClick={updateEducationHandler}
      >
        <span className="h2-18-sb">저장</span>
      </button>
    </div>
  )
}

export default EditEducation;