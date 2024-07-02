import React from "react";
import './Terms.css';
import '../../styles/defaultDesign.css';

function Terms(){
  return(
    <div className="Terms--container">
      <span className="b1-12-m" style={{ color: "#66707A"}}>약관 동의</span>

      <label className="Terms--checkbox-input">
        <input 
          type="checkbox" 
          id="checkbox"
        />
        <span className="checkmark" style={{ border: "1px solid #C5CAD2" }}></span>
        <span className="b7-16-sb" style={{ color: "#2F2F2F"}}>모두 동의</span>
      </label>

      <div className="Terms--divider"/>

      <label className="Terms--checkbox-input">
        <input 
          type="checkbox" 
          id="checkbox"
        />
        <span className="checkmark" style={{ border: "1px solid #C5CAD2" }}></span>
        <span className="b6-16-m" style={{ color: "#2F2F2F"}}>
          [필수] <span style={{ textDecoration: "underline" }}>이용약관 </span>동의
        </span>
      </label>

      <label className="Terms--checkbox-input">
        <input 
          type="checkbox" 
          id="checkbox"
        />
        <span className="checkmark" style={{ border: "1px solid #C5CAD2" }}></span>
        <span className="b6-16-m" style={{ color: "#2F2F2F"}}>
          [필수] <span style={{ textDecoration: "underline" }}>개인정보 수집 및 이용 </span>동의
        </span>
      </label>

      <label className="Terms--checkbox-input">
        <input 
          type="checkbox" 
          id="checkbox"
        />
        <span className="checkmark" style={{ border: "1px solid #C5CAD2" }}></span>
        <span className="b6-16-m" style={{ color: "#2F2F2F"}}>
          [선택] <span style={{ textDecoration: "underline" }}>개인정보 제 3자 제공 </span>동의
        </span>
      </label>

        
    </div>
  )
}

export default Terms;