import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAlumniType } from "../../../redux/store";
import './Signup.css';
import './ProfileInfo.css';


function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToInfo = (e) => {
    const membership = e.target.textContent;
    switch (membership) {
      case "졸업생":
        dispatch(setAlumniType(0));
        break;
      case "인기모":
        dispatch(setAlumniType(1));
        break;
      case "재학생":
        dispatch(setAlumniType(2));
        break;
      case "교직원":
        dispatch(setAlumniType(3));
        break;
      default:
        dispatch(setAlumniType(0));
    }
    navigate('/signup/membership');
  }

  return (
    <div className="SignUp--container">
      <div className="SignUp--header">
        <button 
          style={{ marginRight: "12px" }}
          className="Profile--header-back-button"
        >
          <img 
            src={require("../../../assets/header-backbutton-black.png")} 
            alt="back-button"
          />
        </button> 
        <span>멤버십 선택</span>
      </div>

      <div className="SignUp--description">
        <div className="SignUp--triangle">
          <span className="SignUp--triangle-text">지비집 식구가 되기 위한<br/>멤버십 인증을 진행해 주세요</span>
        </div>
      </div>
      <div>
        <button onClick={goToInfo}>졸업생</button>
        <button onClick={goToInfo}>인기모</button>
        <button onClick={goToInfo}>재학생</button>
        <button onClick={goToInfo}>교직원</button>
      </div>
    </div>
  )
}

export default SignUp;