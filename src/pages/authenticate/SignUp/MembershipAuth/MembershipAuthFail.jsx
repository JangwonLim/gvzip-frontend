import React from "react";
import './MembershipAuth.css';
import '../../../../styles/defaultDesign.css';

function MembershipAuthFail() {
  return (
    <div className="MembershipAuth--container">
      <img src={require('../../../../assets/membership-fail.png')} alt="fail" />
    </div>
  )
}

export default MembershipAuthFail;