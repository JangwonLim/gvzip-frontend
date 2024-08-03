import React from "react";
import './PopUp.css';
import './../../styles/defaultDesign.css';

function Toast({purpose}) {
  return (
    <div className="Toast--container">
      <span className="Toast--content">
        {purpose} 링크가 복사되었습니다.
      </span>
    </div>
  )
}

export default Toast;