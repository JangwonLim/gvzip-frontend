import React from "react";
import './../Signup.css';
import './../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import PictureUploader from "../../../../components/PictureUploader/PictureUploader";
import HistoryDetail from "../../../../components/HistoryDetail/HistoryDetail";
import Terms from "../../../../components/Terms/Terms";

function AlumniFourthPage({ formData, handleChange, goToPrevPage, registerUser, profileImage, previewImage, handleProfileImage }) {


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
      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>경력/경험 (선택) </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <HistoryDetail title={'team DDG'} detail1={'2023년'} detail2={'1년~2년'} content={"프론트엔드 개발자"}/>

        <button 
          className="Profile--add-education"
        >
          <span className="b6-16-m">경험/경력 추가</span>
          <img 
            alt="add-education"
            src={require("../../../../assets/profile-add-edu.png")}
          />
        </button>
      </div>


      {/* Terms and Agreement */}
      <Terms />

      {/* Navigate Button */}
      <div className="Profile--button-container navigate">
        <button 
          className="Profile--navigate-button prev"
          onClick={goToPrevPage}
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
    </div>
  )
}

export default AlumniFourthPage;