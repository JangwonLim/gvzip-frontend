import React, { useEffect, useState } from "react";
import './../Signup.css';
import '../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import HistoryDetail from "../../../../components/HistoryDetail/HistoryDetail";
import EditBottomSheet from "../../../../components/BottomSheet/EditBottomSheet";
import './../../../../components/BottomSheet/BottomSheet.css'
import ButtonSelection from "../../../../components/SignUpComponents/ButtonSelection";
import Year from "../../../../components/SignUpComponents/Year";
import { useDispatch } from "react-redux";
import { reset } from "../../../../redux/store";

function AlumniSecondPage({ formData, handleChange, goToNextPage, goToPreviousPage, handleEducationClick, handleCareerClick, setEducationNumber, educationNumber, openEditEducation })
{
  const [edit, setEdit] = useState(false);
  const [isSecondDone, setIsSecondDone] = useState(false);

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(reset());
  };

  useEffect(() => {
    setIsSecondDone(
      formData["campus"].length > 0 &&
      String(formData["graduationYear"]).length > 0
    )
  }, [formData]);

  const openEdit = (e) => {
    setEdit(true);
    setEducationNumber(e.target.id);
  }

  const closeEdit = (e) => {
    e.preventDefault();
    setEdit(false);
  }

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
    <div className="Profile--content-container huge-gap">
      {/* Campus */}
      {
        formData.alumniType === 0 ?
          <ButtonSelection 
            formData={formData}
            handleChange={handleChange}
            title={"졸업한 캠퍼스"}
            name={"campus"}
            list={campusList}
            isMandatory={true}
          /> :
          <ButtonSelection 
            formData={formData}
            handleChange={handleChange}
            title={"자녀 캠퍼스(복수 선택 가능)"}
            name={"campus"}
            list={campusList}
            isMandatory={true}
          />
      }



      {/* Graduation year */}
      <Year 
        formData={formData}
        handleChange={handleChange}
        options={generateYearOptions}
        title={"졸업년도"}
        placeholder={"졸업년도 선택"}
      />


      <div className="Profile--content-section wide-gap">
        <span className="b7-16-sb" style={{ color: "#66707A"}}>학력 (선택)</span>
        {
          formData.educations.length > 0 && (
            formData.educations.map((data, index) => {
              return (
                <HistoryDetail 
                  title={data.schoolName} 
                  detail1={data.degree} 
                  detail2={data.status} 
                  content={data.major} 
                  index={index}
                  openEdit={openEdit}
                />
              )
            }
          ))
        }

        <button 
          className="Profile--add-education"
          onClick={() => handleEducationClick()}
        >
          <span className="b6-16-m">학력 추가</span>
          <img 
            alt="add-education"
            src={require("../../../../assets/profile-add-edu.png")}
          />
        </button>
      </div>

      {/* Career */}
      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>경력/경험 (선택) </span>
        </div>

        {
          formData.careers.length > 0 && (
            formData.careers.map((data, index) => {
              return (
                <HistoryDetail 
                  title={data.companyName} 
                  detail1={data.startYear+"년"} 
                  detail2={data.duration} 
                  content={data.position} 
                  index={index}
                  openEdit={openEdit}
                />
              )
            }
          ))
        }
        
        <button onClick={handleReset}>clear</button>

        <button 
          className="Profile--add-education"
          onClick={() => handleCareerClick()}
        >
          <span className="b6-16-m">경험/경력 추가</span>
          <img 
            alt="add-education"
            src={require("../../../../assets/profile-add-edu.png")}
          />
        </button>
      </div>

      <div className="Profile--button-container navigate">
        <button 
          className="Profile--navigate-button prev"
          onClick={goToPreviousPage}
        >
          <span className="h2-18-sb">이전</span>
        </button>
        <button 
          className="Profile--navigate-button" 
          onClick={goToNextPage}
          disabled={!isSecondDone}
        >
          <span className="h2-18-sb">다음</span>
        </button>
      </div>

      {
        edit && (
          <div 
            className="EditBottomSheet--modal-background"
            onClick={(e) => closeEdit(e)}
          >
            <EditBottomSheet
              closeEdit={closeEdit}
              openEditEducation={openEditEducation}
              handleChange={handleChange}
              index={educationNumber}
            />
          </div>
        )
      }
    </div>
  )
  
}

export default AlumniSecondPage;