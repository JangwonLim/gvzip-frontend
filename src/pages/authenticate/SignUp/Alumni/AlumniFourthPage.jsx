import React, { useState } from "react";
import './../Signup.css';
import './../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import PictureUploader from "../../../../components/PictureUploader/PictureUploader";
import HistoryDetail from "../../../../components/HistoryDetail/HistoryDetail";
import Terms from "../../../../components/Terms/Terms";
import EditBottomSheet from "../../../../components/BottomSheet/EditBottomSheet";
import './../../../../components/BottomSheet/BottomSheet.css';

function AlumniFourthPage({ formData, handleChange, goToPreviousPage, registerUser, profileImage, previewImage, handleProfileImage, handleArrayData, handleCareerClick }) {

  const [edit, setEdit] = useState(false);

  const openEdit = () => {
    setEdit(true);
  }

  const closeEdit = (e) => {
    e.preventDefault();
    setEdit(false);
  }

  return(
    <div className="Profile--content-container">
      {/* Picture */}
      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>사진 (선택) </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <PictureUploader picFile={previewImage} onChangePicture={handleProfileImage}/>
      </div>

      {/* Career */}
      <div className="Profile--content-section huge-gap">
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

      {/* <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>링크 (선택) </span>
        </div>

        <input 
          className="Profile--text-input-box"
          type="text" 
          placeholder={"링크 (선택)"}
          name={}
          value={}
          onChange={handleChange}
        />
      </div> */}

      {/* Terms and Agreement */}
      <Terms />

      {/* Navigate Button */}
      <div className="Profile--button-container navigate">
        <button 
          className="Profile--navigate-button prev"
          onClick={goToPreviousPage}
        >
          <span className="h2-18-sb">이전</span>
        </button>
        <button 
          className="Profile--navigate-button"
          onClick={registerUser}
        >
          <span className="h2-18-sb">완료</span>
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
              handleEducationClick={handleCareerClick}
            />
          </div>
        )
      }
    </div>
  )
}

export default AlumniFourthPage;