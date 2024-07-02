import React from "react";
import '../../pages/authenticate/SignUp/ProfileInfo.css';
import '../../styles/defaultDesign.css';

function Introduction({formData, handleChange, title, placeholder}) {
  return (
    <div className="Profile--content-section narrow-gap">
      <div>
        <span className="b7-16-sb" style={{ color: "#66707A"}}>{title} </span>
        <span style={{ color: "#FE3C2A"}}>*</span>
      </div>

      <input 
        className="Profile--text-input-box"
        type="text" 
        placeholder={placeholder}
        name="introduction"
        value={formData.introduction}
        onChange={handleChange}
      />
    </div>
  )
}

export default Introduction;