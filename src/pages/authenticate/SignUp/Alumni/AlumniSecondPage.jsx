import React, { useState } from "react";
import './../Signup.css';
import '../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import HistoryDetail from "../../../../components/HistoryDetail/HistoryDetail";
import EditBottomSheet from "../../../../components/BottomSheet/EditBottomSheet";
import './../../../../components/BottomSheet/BottomSheet.css'
function AlumniSecondPage({ formData, handleChange, goToNextPage, goToPreviousPage, handleEducationClick })
{
  const [edit, setEdit] = useState(false);

  const openEdit = () => {
    setEdit(true);
  }

  const closeEdit = (e) => {
    e.preventDefault();
    setEdit(false);
  }

  return (
    <div className="Profile--content-container">
      {/* Education */}
      <div className="Profile--content-section huge-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>학력 </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

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
          // disabled={!latestDegree}
          onClick={() => handleEducationClick()}
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
          onClick={goToPreviousPage}
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

      {
        edit && (
          <div 
            className="EditBottomSheet--modal-background"
            onClick={(e) => closeEdit(e)}
          >
            <EditBottomSheet
              closeEdit={closeEdit}
              handleEducationClick={handleEducationClick}
            />
          </div>
        )
      }
    </div>
  )
  
}

export default AlumniSecondPage;