import React, { useEffect, useState } from "react";
import './../Signup.css';
import './../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import PictureUploader from "../../../../components/PictureUploader/PictureUploader";
import Terms from "../../../../components/Terms/Terms";
import './../../../../components/BottomSheet/BottomSheet.css';

function AlumniFourthPage({ formData, handleChange, goToPreviousPage, registerUser, profileImage, previewImage, handleProfileImage, handleArrayData, handleTermClick, handleTermOfUseClick }) {

  const [termOfUse, setTermOfUse] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [optionalPrivacy, setOptionalPrivacy] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [clickCount, setClickCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const agreeAll = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      const isOddClick = newCount % 2 !== 0;

      setTermOfUse(isOddClick);
      setPrivacy(isOddClick);
      setOptionalPrivacy(isOddClick);

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
    setOptionalPrivacy(!optionalPrivacy);
  }

  useEffect(() => {
    setIsValid(termOfUse && privacy);
  }, [termOfUse, privacy])

  return(
    <div 
      className="Profile--content-container huge-gap"
    >
      {/* Picture */}
      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>사진 (선택) </span>
        </div>

        <PictureUploader picFile={previewImage} onChangePicture={handleProfileImage}/>
      </div>


      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>링크 (선택) </span>
        </div>

        <input 
          className="Profile--text-input-box"
          type="text" 
          placeholder={"링크 붙여넣기"}
          name={"sns"}
          value={formData['sns']}
          onChange={handleChange}
        />
      </div>

      {/* Terms and Agreement */}
      <Terms
        handleTermClick={handleTermClick}
        handleTermOfUseClick={handleTermOfUseClick}
        agreeAll={agreeAll}
        setTermsOfUse={toggleTermOfUse}
        setPrivacy={togglePrivacy}
        setOptionalPrivacy={toggleOptionalPrivacy}
        termOfUse={termOfUse}
        privacy={privacy}
        optionalPrivacy={optionalPrivacy}
      />

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
          disabled={!isValid}
        >
          <span className="h2-18-sb">완료</span>
        </button>
      </div>
    </div>
  )
}

export default AlumniFourthPage;