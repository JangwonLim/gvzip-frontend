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

