import React from "react";
import './Footer.css';
import '../../styles/defaultDesign.css';

function Footer() {
  const goToInsta = () => {
    window.location.href = 'https://www.instagram.com/teamddg.official/';
  };
  return(
    <div className="Footer--container">

      <div className="Footer--content-container">
        <div className="b2-12-sb">
          <a href="/">
            <span>이용약관</span>
          </a>
          <span> | </span>
          <a href="/">
            <span>개인정보 처리방침</span>
          </a>
        </div>

        <div style={{ display: "flex", gap: "162px"}}>
          <div className="b1-12-m Footer--contact-info"> 
            <span>대표메일: team8ddg@gmail.com</span>
            <span>Team DDG. All rights reserved.</span>
          </div>

          <button
            className="Footer--instagram"
            onClick={goToInsta}
          >
           <img src={require('../../assets/insta-icon.png')} alt="instagram" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer;