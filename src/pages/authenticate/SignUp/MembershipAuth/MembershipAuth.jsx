import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../ProfileInfo.css';
import '../../../../styles/defaultDesign.css';
import { validateDateOfBirth } from "../../../../utils/validate";
import { handleCopyClipBoard } from "../../../../utils/usefulFunctions";
import { useGoBack } from "../../../../utils/usefulFunctions";
import { getChildInfo } from "../../../../service/getService";
import { useNavigate } from "react-router-dom";
import Copy from "../../../../components/PopUp/Copy";

function MembershipAuth() {
  const navigate = useNavigate();

  const alumniType = useSelector((state) => state.alumniType);

  const studentCode = "W2@#33s2LoVE88";
  const staffCode = "Jj$$2704sl3HOPE";

  const principals = [
    "이영석", "Jesse Newman", "John Dunlavey", 
    "조성률", "조인진", "고영선", "문모세", "이정주", 
    "강성봉", "박주영", "이명훈", "임혜준", "Joshua Kang"
  ]

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
  const [copy, setCopy] = useState(false);

  const popUpCopy = () => {
    handleCopyClipBoard(shareLink);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 500);
  };

  const checkChildData = async () => {
    const isChildDataValid = await getChildInfo(parentsAuth.name, parseInt(parentsAuth.dateOfBirth.year), parseInt(parentsAuth.dateOfBirth.month), parseInt(parentsAuth.dateOfBirth.day));

    return isChildDataValid;
  }

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

  const handleGoogleSignUp = async () => {
    const navigateToGoogleAuth = () => navigate('/signup/info');
    const navigateToFail = () => navigate('/signup/membership/fail');
  
    const isPrincipalAuthorized = principals.includes(alumniAuth);
    const isChildDataValid = await checkChildData();
    const isStudentAuthorized = studentAuth === studentCode;
    const isTeacherAuthorized = teacherAuth === staffCode;
    
    const authChecks = [
      isPrincipalAuthorized,
      isChildDataValid,
      isStudentAuthorized,
      isTeacherAuthorized,
    ];
  
    const authCheck = authChecks[alumniType];
  
    if (authCheck === true) {
      navigateToGoogleAuth();
    } else {
      navigateToFail();
    }
  };

  const shareLink = "https://main--gvzip.netlify.app/";


  useEffect(() => {
    // Temporary logic
    if (alumniType === 0) {
      setIsValidAuth(alumniAuth.length > 0);
    } else if (alumniType === 1) {
      setIsValidAuth(parentsAuth.name.length > 0 && isValidDoB);
    } else if (alumniType === 2) {
      setIsValidAuth(studentAuth.length > 0);
    } else if (alumniType === 3) {
      setIsValidAuth(teacherAuth.length > 0);
    } else {
      setIsValidAuth(false);
    }
  }, [alumniType, alumniAuth, parentsAuth, studentAuth, teacherAuth, isValidDoB]);

  return (
    <div className="Profile--container" style={{position: "relative"}}>
      <div className="Profile--header">
        <button 
          className="Profile--header-back-button"
          onClick={useGoBack()}
        >
          <img src={require("../../../../assets/profile-header-back-button.png")} alt="back-button" />
        </button> 
        <span className="h3-20-b" style={{ fontWeight: "500" }}>{alumniTitle()} 인증</span>
      </div>

      {/* Alumni */}
      {
        alumniType === 0 && (
          <div className="Profile--content-container" style={{ marginTop: "94px"}}>
            <div className="Profile--content-section huge-gap">
              <div>
                <span className="b7-16-sb" style={{ color: "#2F2F2F"}}>Q. 졸업 당시 교장 선생님의 성함은? </span>
              </div>

              <input 
                className="Profile--text-input-box"
                placeholder="답변 입력"
                type="text" 
                style={{ marginBottom: "132px" }}
                onChange={(e) => handleAlumni(e)}
              />
            </div>
          </div>
        )
      }
      

      {/* Parents */}
      {
        alumniType === 1 && (
            <div className="Profile--content-container huge-gap">
              <div style={{ display: "flex", flexDirection: "column", gap:"20px"}}>
                <span className="b3-14-m" style={{ color: "#66707A" }}>
                  *필독* <br />
                  자녀의 정보가 지비집 서비스에 등록되어 있는 경우에만 인증이 <br />가능합니다. 지비집의 소중한 정보 자산이 유출되지 않도록
                  <br />미연에 방지하고자 함이니 너른 양해 부탁드립니다 :)
                </span>

                <div 
                  className="MembershipAuth--link-share"
                  onClick={popUpCopy}
                >
                  <span>초대 링크 복사</span>
                  <img src={require("./../../../../assets/copy.png")} alt="copy" />
                </div>
              </div>

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

      {/* Current Students & Teachers */}
      {
        (alumniType === 2 || alumniType === 3) && (
          <div className="Profile--content-container" style={{ marginTop: "94px"}}>
            <div className="Profile--content-section huge-gap">
              <span className="b7-16-sb" style={{ color: "#2F2F2F"}}>학교 이메일을 통해 제공 받은 인증코드를 <br /> 입력해 주세요.</span>

              <input 
                className="Profile--text-input-box"
                placeholder="인증코드 입력"
                type="text" 
                style={{ marginBottom: "132px" }}
                onChange={(e) => {
                  alumniType === 0 ? handleStudent(e) : handleTeacher(e);
                }}
              />
            </div>
          </div>
        )
      }
      
      <button 
        className="Profile--navigate-button" 
        style={{ maxWidth: "342px"}}
        disabled={isValidAuth === false}
        onClick={handleGoogleSignUp}
      >
        <span className="h2-18-sb">인증하고 구글로 시작</span>
      </button>
      {
        copy && (
          <Copy/>
        )
      }
    </div>
  )
}

export default MembershipAuth;