import React, { useState } from "react";
import './SignupQuestions.css'
import Button from './../Button/Button';

const campus = ['음성', '문경', '미국'];
const isAlumni = ["졸업생", "인기모"];
const career = [
  "영업/고객상담", "IT/인터넷", "교육",
  "경영/사무", "서비스", "디자인",
  "마케팅/광고/홍보", "무역/유통", "전문/특수직",
  "생산/제조", "의료", "미디어",
  "연구개발/설계", "건설", "기타"
];

function FirstQuestion({setKorName, setEngName}) {
  const [isKorValid, setIsKorValid] = useState(true);
  const [isEngValid, setIsEngValid] = useState(true);

  const handleKorName = (event) => {
    const input = event.target.value;
    const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ]*$/; 
    if (koreanRegex.test(input)) {
      setKorName(input);
      setIsKorValid(true);
    } else {
      setIsKorValid(false);
    }
  };

  const handleEngName = (event) => {
    const input = event.target.value;
    const englishRegex = /^[a-zA-Z\s]*$/;
    if (englishRegex.test(input)) {
      setEngName(input);
      setIsEngValid(true);
    } else {
      setIsEngValid(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="Signup--content-box">
        <div className="Signup--content-number"><h3>1</h3></div>
      </div>

      <div>
        <h5 className="Signup--content-title">이름을 입력해주세요</h5>
        <div style={{ display: 'flex' }}>
          <div>
            <h5 className="Signup--content-title">한글이름</h5>
            <input 
            className="Signup--content-input" 
            onChange={handleKorName}
            placeholder="ex. 박지비"/>
            {/* { !isKorValid && <h5>It's not valid!</h5> } */}
          </div>
          <div style={{ marginLeft: '16px' }}>
            <h5 className="Signup--content-title">영어이름</h5>
            <input 
            className="Signup--content-input" 
            onChange={handleEngName}
            placeholder="ex. Gv Park"
            style={{width: "129px"}}/>
            {/* { !isEngValid && <h5>It's not valid!</h5> } */}
          </div>
        </div>
      </div>
    </div>
  )
}

function SecondQuestion({setIsAlumni, setGraduationYear}) {
  const [selectedButton1, setSelectedButton1] = useState(null);
  const [isValid, setIsValid] = useState(true);


  const handleAlumButton = (index) => {
    if (selectedButton1 === index) {
      setSelectedButton1(null);
    } else {
      setSelectedButton1(index);
      setIsAlumni(index === 0 ? true : false);
    }
  };

  const handleGradYear = (event) => {
    const newValue = event.target.value;
    const regex = /^(?:[0][6-9]|[1][0-9]|2[0-4])$/;
    if (newValue === '' || regex.test(newValue)) {
      setIsValid(true);
      setGraduationYear(parseInt(newValue));
    } 
    else {
      setIsValid(false);
    }
  };

  return (
    <div>
      {/* 2 */}
      <div style={{ display: "flex", marginTop: "32px"}}>
        <div className="Signup--content-box">
          <div className="Signup--content-number"><h3>2</h3></div>
        </div>

        <div>
          <h5 className="Signup--content-title">자신에게 해당하는 것을 선택해주세요</h5>
          <div className="Signup--content-button-wrap" style={{ width: '448px' }}>
            {isAlumni.map((label, i) => 
              <div key={i} onClick={() => handleAlumButton(i)}>
                {selectedButton1 === i
                  ? <Button color="#fff" radius="30px" bg="#58678E"><h3>{label}</h3></Button>
                  : <Button radius = "30px"><h3>{label}</h3></Button>
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2-1 */}
      { selectedButton1 === 0 && (
        <div style={{ display: "flex", marginTop: "32px"}}>
          <div className="Signup--content-box">
            <div className="Signup--content-number"><h3>2-1</h3></div>
          </div>

          <div>
            <h5 className="Signup--content-title">졸업년도를 입력하세요</h5>
            <input 
            className="Signup--content-input" 
            onChange={handleGradYear}
            placeholder="20_ _년" 
            type="text"
            maxLength="2"/>
            {/* {!isValid && <h5>it's not valid</h5>} */}
          </div>
        </div>
      )}

    </div>
  )
}

function ThirdQuestion({setCampus}) {
  const [selectedButton2, setSelectedButton2] = useState(null);

  const handleCampusButton = (index, label) => {
    setSelectedButton2(index);
    setCampus(label);
  }

  return (
    <div style={{ display: "flex", marginTop: "32px"}}>
      <div className="Signup--content-box">
        <div className="Signup--content-number"><h3>3</h3></div>
      </div>

      <div>
        <h5 className="Signup--content-title">소속 캠퍼스를 선택해주세요</h5>
        <div className="Signup--content-button-wrap">
          {campus.map((label, i) => 
            <div key={i} onClick={() => handleCampusButton(i, label)}>
              {
              selectedButton2 === i
              ? <Button color="#fff" radius="30px" bg="#58678E"><h3>{label}</h3></Button>
              : <Button radius = "30px"><h3>{label}</h3></Button>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FourthQuestion({setFields}) {
  const [selectedButton3, setSelectedButton3] = useState([]);

  const handleCareerButton = (label) => {
    const selectedOptions = selectedButton3.includes(label);
    if (!selectedOptions && selectedButton3.length < 3) {
      setSelectedButton3([...selectedButton3, label]);
    } else if (selectedOptions) {
      setSelectedButton3(selectedButton3.filter(item => item !== label));
    }

    setFields(selectedButton3);
  }

  return (
    <div style={{ display: "flex", marginTop: "32px"}}>
      <div className="Signup--content-box">
        <div className="Signup--content-number"><h3>4</h3></div>
      </div>

      <div>
        <h5 className="Signup--content-title">현재 하고 계신 공부 혹은 일과 관련된 것을 선택해주세요 (최대 3개 선택 가능)</h5>
        <div className="Signup--content-button-wrap">
          {career.map((label, i) => 
            <div style={{marginBottom: "16px"}} key={i} onClick={() => handleCareerButton(label)}>
              {
              selectedButton3.includes(label)
                ? <Button color="#fff" radius="30px" bg="#58678E"><h3>{label}</h3></Button>
                : <Button radius = "30px"><h3>{label}</h3></Button>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FifthQuestion({setJob}) {
  const handleJob = (event) => {
    setJob(event.target.value);
  }

  return (
    <div style={{ display: "flex", marginTop: "32px"}}>
      <div className="Signup--content-box">
        <div className="Signup--content-number"><h3>5</h3></div>
      </div>

      <div>
        <h5 className="Signup--content-title">현재 하고 계신 공부 혹은 일을 한줄로 소개해주세요</h5>
        <input 
        className="Signup--content-input" 
        onChange={handleJob}
        placeholder="ex. 한동대학교 학생 / UX Designer" 
        style={{width: "642px"}}/>
      </div>
    </div>
  )
}

export {
  FirstQuestion,
  SecondQuestion,
  ThirdQuestion,
  FourthQuestion,
  FifthQuestion
}