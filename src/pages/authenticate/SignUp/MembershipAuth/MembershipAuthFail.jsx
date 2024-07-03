import React from "react";
import './MembershipAuth.css';
import '../../../../styles/defaultDesign.css';
import '../ProfileInfo.css';
import { useGoBack } from "../../../../utils/usefulFunctions";

function MembershipAuthFail() {
  return (
    <div className="MembershipAuth--wrapper">
      <div className="MembershipAuth--container">
        <div className="MembershipAuth--content-container">
          <img 
            style={{ margin: "16px"}}
            src={require('../../../../assets/membership-fail.png')} 
            alt="failure" 
          />
          <span 
            className="h2-18-sb"
            style={{ textAlign: "center", color: "#2f2f2f" }}
          >
            멤버십 정보를 찾을 수 없습니다.<br />
            다시 시도해 주세요.
          </span>
        </div>

        <>
          <button 
            className="Profile--navigate-button" 
            style={{ maxWidth: "342px", marginTop: "80px" }}
            onClick={useGoBack()}
          >
            <span className="h2-18-sb">다시 시도</span>
          </button>
          <span 
            className="b3-14-m"
            style={{ color: "#66707A", marginTop: '20px' }}
          >
            문의 : team8ddg@gmail.com
          </span>
        </>

      </div>
    </div>
  )
}

export default MembershipAuthFail;