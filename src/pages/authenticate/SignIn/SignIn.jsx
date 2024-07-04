/* eslint-disable no-unused-vars */
import React from "react";
import './SignIn.css';
import { useNavigate } from "react-router-dom";
import '../../../styles/defaultDesign.css';

function SignIn() {
  const navigate = useNavigate();
  return(
    <div className="SignIn--container">
      <div className="SignIn--close-button-container">
        <button
          className="SignIn--close-button"
          onClick={() => navigate('/')}
        />
      </div>

      <img 
        className="SignIn--logo-gif"
        src={require('../../../assets/login-logo.gif')} 
        alt="logo-gif" 
      />

      <div className="SignIn--button-container">
        <button className="SignIn--google-button">
          <img src={require('../../../assets/google-logo.png')} alt="" />
          <span className="h2-18-sb">
            구글 로그인
          </span>
        </button>

        <span className="b6-16-m" style={{ color: "#2f2f2f"}}>
          지비집이 처음이신가요?&nbsp;
          <a href="/signup" className="SignIn--signup-link">
            가입하기
          </a>
        </span>
      </div>
      
    </div>
  )
}

export default SignIn;

