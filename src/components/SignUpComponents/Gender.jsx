import React from "react";
import '../../styles/defaultDesign.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function Gender({formData, handleChange}) {
  return(
    <div className="Profile--content-section narrow-gap">
      <div>
        <span className="b7-16-sb" style={{ color: "#66707A"}}>성별 </span>
        <span style={{ color: "#FE3C2A"}}>*</span>
      </div>

      <div className="Profile--button-container wide-gap">
        <button 
          className={"Profile--button" + (formData.sex === "여성" ? " selected" : "")}
          value="여성"
          name="sex"
          onClick={handleChange}
        >
          <span className="b7-16-sb">여성</span>
        </button>
        <button 
          className={"Profile--button" + (formData.sex === "남성" ? " selected" : "")}
          value="남성"
          name="sex"
          onClick={handleChange}
        >
          <span className="b7-16-sb">남성</span>
        </button>
      </div>
    </div>
  )
}

export default Gender;