import React from "react";
import '../../styles/defaultDesign.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function Email({formData, handleEmail, isValidEmail}) {
  return(
    <div className="Profile--content-section narrow-gap">
      <div>
        <span className="b7-16-sb" style={{ color: "#66707A"}}>자주 쓰는 이메일 </span>
        <span style={{ color: "#FE3C2A"}}>*</span>
      </div>

      <input 
        className="Profile--text-input-box"
        style={{
          borderBottom: !isValidEmail ? "2px solid red" : "1px solid #D3DEE6"
        }}
        placeholder="이메일 입력"
        name="email"
        onChange={handleEmail}
        defaultValue={formData["email"]}
      />
      { 
        !isValidEmail && 
        <span className="Profile--warning-msg">이메일을 정확히 입력해 주세요.</span> 
      }
    </div>
  )
}

export default Email;