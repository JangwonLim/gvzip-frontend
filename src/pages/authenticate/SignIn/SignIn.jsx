import React from "react";
import './SignIn.css';
import '../../../styles/defaultDesign.css';

function SignIn() {
  return(
    <div className="SignIn--container">
      <img 
        className="SignIn--logo-gif"
        src={require('../../../assets/login-logo.gif')} 
        alt="logo-gif" 
      />

      <div className="SignIn--button-container">
        <button 
          className="SignIn--google-button black"
          onClick={() =>  window.location.href = "https://gvzip.com/oauth2/authorization/google"}
        >
          <span className="h2-18-sb">
            회원가입
          </span>
        </button>
        <button 
          className="SignIn--google-button"
          onClick={() =>  window.location.href = "https://gvzip.com/oauth2/authorization/google"}
        >
          <img src={require('../../../assets/google-logo.png')} alt="" />
          <span className="h2-18-sb">
            구글 로그인
          </span>
        </button>
      </div>
      
    </div>
  )
}

export default SignIn;

