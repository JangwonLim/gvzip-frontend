/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import './profile.css';
import { getMyInfo } from "../../service/getService";
import './../../styles/defaultDesign.css';
import Modal from "../../components/ProfileDetail/Modal";
import './../archivePage/Archive.css';
import PopUp from "../../components/PopUp/PopUp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storeUserInfo } from "../../redux/store";


function Profile() {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [purpose, setPurpose] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchMyInfo = useCallback(async () => {
    try {
      const result = await getMyInfo();
      if (result.message === "Success") {
        setData(result.data);
        dispatch(storeUserInfo(result.data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

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
    navigate('/profile/editObjet');
  }
  
  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  return (
    <div className="ProfilePage--container">
      <MyInfoCard data={data} setModal={setModal}/>

      <div style={{ width: "auto", height: "80px"}}/>

      <div className="ProfilePage--button-container">
        <button 
          onClick={changeObjet}
          className="ProfilePage--button"
        >
          <span className="h2-18-sb">오브제 변경</span>
        </button>
        <button 
          onClick={() => navigate('/profile/editInfo')}
          className="ProfilePage--button black">
          <span className="h2-18-sb">프로필 편집</span>
        </button>
      </div>

      <span 
        onClick={openPopUp}
        className="ProfilePage--logout"
      >
        로그아웃
      </span>

      { modal && (
        <div className="Archive--modal-backdrop" onClick={closeModal}>
          <Modal info={data} setModal={setModal}/>
        </div>
      )}

      {
        popUp && (
          <div className="Archive--modal-backdrop" onClick={closePopUp}>
            <PopUp purpose={purpose} closePopUp={closePopUp}/>
          </div>
        )
      }
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
            src={data.profileImageURL || require("./../../assets/profile-pic-11.png")} 
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

export default Profile;