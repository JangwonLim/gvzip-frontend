import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAlumniType } from "../../../redux/store";
import './Signup.css';


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
    <div>
      <button onClick={goToInfo}>졸업생</button>
      <button onClick={goToInfo}>인기모</button>
      <button onClick={goToInfo}>재학생</button>
      <button onClick={goToInfo}>교직원</button>
    </div>
  )
}

export default SignUp;