/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect} from "react";
import './SignUpSuccess.css';
import './../../../../styles/defaultDesign.css';
import { getMyInfo } from "../../../../service/getService";
import './../../../profilePage/profile.css';
import EditProfilePicture from "../../../profilePage/editProfilePicture";
import { useNavigate } from "react-router-dom";

function SignUpSuccess() {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [purpose, setPurpose] = useState('');

  const navigate = useNavigate();

  const fetchMyInfo = useCallback(async () => {
    try {
      const result = await getMyInfo();
      if (result.message === "Success") {
        setData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  const closeModal = () => {
    setModal(false);
  }

  const openPopUp = (e) => {
    setPurpose(e.target.textContent);
    setPopUp(true);
  }

  const closePopUp = () => {
    setPopUp(false);
  }

  const changeObjet = () => {
    navigate("/signup/edit-objet");
  }
  
  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  return (    
      <div className="SignUpSuccess--wrapper">
        <div className="SignUpSuccess--container">
          <span className="h2-18-sb" style={{ color: "#2f2f2f", textAlign: "center"}}>
            지비집의 식구가 되신 것을 환영합니다<br />
            아카이브에서 프로필을 확인해보세요!
          </span>

          <div className="fade-in">
            <MyInfoCard data={data} setModal={setModal}/>
          </div>

          <div className="ProfilePage--button-container">
            <button 
              onClick={changeObjet}
              className="ProfilePage--button"
            >
              <span className="h2-18-sb">오브제 변경</span>
            </button>
            <button 
              // onClick={}
              className="ProfilePage--button black"
            >
              <span className="h2-18-sb">아카이브 확인</span>
            </button>
          </div>
        </div>
      </div>
  )
}

function MyInfoCard({data, setModal}) {

  const openModal = () => {
    setModal(true);
  }

  const membership = () => {
    if (data.alumniType === 0) {
      return "졸업생";
    } else {
      return "인기모";
    }
  }

  const location = [data.city ?? '', data.country ?? ''].filter(Boolean).join(', ');
  
  return(
    <div className="MyInfoCard--container" onClick={openModal}>
      <div className="MyInfoCard--header-container">
        <div className="MyInfoCard--header-text">
          <span className="pc-body fs-14" style={{ color: "#66707A"}}>{data.campus} {data.generation}회 {membership()}<br /> {location}</span>
        </div>

        <div className="MyInfoCard--header-img-container">
          <img 
            className="MyInfoCard--header-img"
            src={data.profileImageURL} 
            alt="card-img" 
          />
        </div>
      </div>

      <div className="MyInfoCard--content-container">
        <span className="pc-head fs-20">{data.korName} | {data.engName}</span>
        <span 
          className="pc-body fs-16" 
          style={{ color: "#66707A"}}
        >
          {data.introduction}
        </span>
      </div>
    </div>
  )
}

export default SignUpSuccess;