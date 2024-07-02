import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../ProfileInfo.css';
import '../../../../styles/defaultDesign.css';
import { validateDateOfBirth } from "../../../../utils/validate";

function MembershipAuth() {
  const alumniType = useSelector((state) => state.alumniType);

  const alumniTitle = () => {
    switch (alumniType) {
      case 0:
        return "졸업생";
      case 1:
        return "인기모";
      case 2:
        return "재학생";
      case 3:
        return "교직원";
      default:
        return "졸업생";
    }
  }

  const [kidDateOfBirth, setKidDateOfBirth] = useState({
    year: "",
    month: "",
    day: ""
  });

  const [alumniAuth, setAlumniAuth] = useState('');
  const [parentsAuth, setParentsAuth] = useState({
    name: "",
    dateOfBirth: kidDateOfBirth
  });

  const [studentAuth, setStudentAuth] = useState('');
  const [teacherAuth, setTeacherAuth] = useState('');

  const [isValidDoB, setIsValidDoB] = useState(false);
  const [isValidAuth, setIsValidAuth] = useState(false);


  const handleAlumni = (e) => {
    setAlumniAuth(e.target.value);
  }

  const handleParents = (e) => {
    const name = e.target.value;
    setParentsAuth((prevState) => ({
      ...prevState,
      name
    }));
  };

  const handleStudent = (e) => {
    setStudentAuth(e.target.value);
  }

  const handleTeacher = (e) => {
    setTeacherAuth(e.target.value);
  }

  const handleKidDateOfBirth = (event) => {
    const { name, value } = event.target;

    setKidDateOfBirth((prevState) => {
      const newState = { ...prevState, [name]: value };
      setIsValidDoB(validateDateOfBirth(newState));
      // Update parentsAuth dateOfBirth
      setParentsAuth((prevState) => ({
        ...prevState,
        dateOfBirth: newState
      }));
      return newState;
    });
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'https://gvzip.com/oauth2/authorize/google';
  }

  useEffect(() => {
    // Temporary logic
    if (alumniType === 0) {
      setIsValidAuth(alumniAuth.length > 0);
    } else if (alumniType === 1) {
      setIsValidAuth(parentsAuth.name && parentsAuth.dateOfBirth && isValidDoB);
    } else if (alumniType === 2) {
      setIsValidAuth(studentAuth.length > 0);
    } else if (alumniType === 3) {
      setIsValidAuth(teacherAuth.length > 0);
    } else {
      setIsValidAuth(false);
    }
  }, [alumniType, alumniAuth, parentsAuth, studentAuth, teacherAuth, isValidDoB])

  return (
    <div className="Profile--container">
      <div className="Profile--header">
        <button className="Profile--header-back-button">
          <img src={require("../../../../assets/profile-header-back-button.png")} alt="back-button" />
        </button> 
        <span className="h3-20-b">{alumniTitle()} 인증</span>
      </div>

      {/* Alumni */}
      {
        alumniType === 0 && (
          <div className="Profile--content-container">
            <div className="Profile--content-section huge-gap">
              <span className="b7-16-sb" style={{ color: "#2F2F2F"}}>Q. 졸업 당시 교장 선생님의 성함은?</span>

              <input 
                className="Profile--text-input-box"
                placeholder="답변 입력"
                type="text" 
                style={{ marginBottom: "140px" }}
                onChange={(e) => handleAlumni(e)}
              />
            </div>
          </div>
        )
      }
      

      {/* Parents */}
      {
        alumniType === 1 && (
          <div 
            className="Profile--content-container"
            style={{ gap: "40px" }}
          >
            <div className="Profile--content-section narrow-gap">
              <span className="b7-16-sb" style={{ color: "#2F2F2F"}}>자녀 이름</span>

              <input 
                className="Profile--text-input-box"
                placeholder="자녀명 입력"
                type="text" 
                onChange={(e) => handleParents(e)}
              />
            </div>

            <div 
              className="Profile--content-section huge-gap"
              style={{ marginBottom: "40px" }}
            >
              <span className="b7-16-sb" style={{ color: "#2F2F2F"}}>자녀 생년월일</span>

              <div className="Profile--content-section narrow-gap row">
                <input 
                  className="Profile--text-input-box center"
                  placeholder="YYYY" 
                  type="text" 
                  minLength="4"
                  maxLength="4" 
                  pattern="^\d{4}$"
                  name="year"
                  value={kidDateOfBirth.year}
                  onChange={(e) => handleKidDateOfBirth(e)}
                />
                <input 
                  className="Profile--text-input-box center" 
                  placeholder="MM" 
                  type="text" 
                  minLength="2"
                  maxLength="2"
                  pattern="^(0[1-9]|1[0-2])$"
                  name="month"
                  value={kidDateOfBirth.month}
                  onChange={(e) => handleKidDateOfBirth(e)}
                />
                <input 
                  className="Profile--text-input-box center" 
                  placeholder="DD" 
                  type="text" 
                  minLength="2"
                  maxLength="2" 
                  pattern="^(0[1-9]|[12][0-9]|3[01])$"
                  name="day"
                  value={kidDateOfBirth.day}
                  onChange={(e) => handleKidDateOfBirth(e)}
                />
              </div>
            </div>
          </div>
        )
      }
      
      {
        (alumniType === 2 || alumniType === 3) && (
          <div className="Profile--content-container">
            <div className="Profile--content-section huge-gap">
              <span className="b7-16-sb" style={{ color: "#2F2F2F"}}>학교 이메일을 통해 제공 받은 인증코드를 입력 해주세요.</span>

              <input 
                className="Profile--text-input-box"
                placeholder="인증코드 입력"
                type="text" 
                style={{ marginBottom: "140px" }}
                onChange={(e) => {
                  alumniType === 0 ? handleStudent(e) : handleTeacher(e);
                }}
              />
            </div>
          </div>
        )
      }
      {/* Current Students & Teachers */}
      

      <button 
        className="Profile--navigate-button" 
        style={{ maxWidth: "342px"}}
        disabled={isValidAuth === false}
        onClick={handleGoogleSignUp}
      >
        <span className="h2-18-sb">인증하고 구글로 시작</span>
      </button>
    </div>
  )
}

export default MembershipAuth;