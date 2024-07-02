import React from "react";
import './../Signup.css';
import '../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import HistoryDetail from "../../../../components/HistoryDetail/HistoryDetail";

function AlumniSecondPage({ formData, handleChange, goToNextPage, goToPrevPage })
{
  // const degreeList = [
  //   "초등학교 졸업", "중학교 졸업", "고등학교 졸업",
  //   "대학교 (2,3년)", "대학교 (4년)", 
  //   "대학원 (석사)", "대학원 (박사)"
  // ]

  // const generateDegreeOptions = () => {
  //   return degreeList.map((degree) => (
  //     <option key={degree} value={degree}>
  //       {degree}
  //     </option>
  //   ));
  // };

  // const latestDegree = "dd";

  return (
    <div className="Profile--content-container">
      {/* Latest degree */}
      {/* <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>최종학력 </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <select 
          id="latest-degree"
          className={"Profile--dropdown-menu" + (latestDegree === "" ? " placeholder" : "")}
          value={latestDegree}
        >
          <option value="" disabled>
            최종학력 선택
          </option>
          {generateDegreeOptions()}
        </select>
      </div> */}

      {/* Education */}
      <div className="Profile--content-section huge-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>학력 </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        {/* TODO: add the condition */}
        <HistoryDetail title={'지비대학교'} detail1={'학사'} detail2={'재학'} content={"경영학과"}/>

        <button 
          className="Profile--add-education"
          // disabled={!latestDegree}
        >
          <span className="b6-16-m">학력 추가</span>
          <img 
            alt="add-education"
            src={require("../../../../assets/profile-add-edu.png")}
          />
        </button>
      </div>

      {/* Profile Visibility button */}
      <div className="Profile--content-section narrow-gap">
        <label  className="Profile--checkbox-input">
          <input 
            type="checkbox" 
            id="checkbox"
            disabled={!formData.educations}
          />
          <span className="checkmark"></span>
          <span className="b6-16-m label-text">프로필에 표시하지 않기</span>
        </label>
      </div>

      <div className="Profile--button-container navigate">
        <button 
          className="Profile--navigate-button prev"
          onClick={goToPrevPage}
        >
          <span className="h2-18-sb">이전</span>
        </button>
        <button 
          className="Profile--navigate-button" 
          onClick={goToNextPage}
        >
          <span className="h2-18-sb">다음</span>
        </button>
      </div>
    </div>
  )
  
}

export default AlumniSecondPage;