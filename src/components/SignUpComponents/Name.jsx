import React from "react";
import '../../styles/defaultDesign.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function Name({formData, handleChange}) {
  return (
    <div className="Profile--content-section narrow-gap">
      <div>
        <span className="b7-16-sb" style={{ color: "#66707A"}}>이름 </span>
        <span style={{ color: "#FE3C2A"}}>*</span>
      </div>
      
      <input 
        className="Profile--text-input-box" 
        placeholder="한글명 ex.김지비"
        name="korName"
        defaultValue={formData.korName}
        onChange={handleChange}
      />
      <input 
        className="Profile--text-input-box"
        placeholder="영문명 ex.Jibi Kim"
        name="engName"
        defaultValue={formData.engName}
        onChange={handleChange}
      />
    </div>
  )
}

export default Name;