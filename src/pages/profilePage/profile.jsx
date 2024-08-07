/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import './profile.css';
import { getMyInfo } from "../../service/getService";
import './../../styles/defaultDesign.css';
import Modal from "../../components/ProfileDetail/Modal";
import './../archivePage/Archive.css';
import './editProfileInfo/editProfileInfo.css';
import PopUp from "../../components/PopUp/PopUp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { storeUserInfo } from "../../redux/store";
import Toast from "../../components/PopUp/Toast";
import { isDefaultProfileImage } from "../../utils/usefulFunctions";


function Profile() {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
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
    } finally {
      setLoading(false); // 데이터 로드가 완료되면 로딩 상태를 false로 설정
    }
  }, [dispatch]);

  const closeModal = (e) => {
    if (e.target.className === "Archive--modal-backdrop") {
      setModal(false);
    }
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

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <div className="ProfilePage--container">
      <MyInfoCard data={data} setModal={setModal}/>

      <div style={{ width: "auto", height: "80px"}}/>

      <div className="ProfilePage--button-container">
        {
          ((isDefaultProfileImage(data.profileImageURL) && (data.alumniType === 0 || data.alumniType === 1))) && (
            <button 
              onClick={changeObjet}
              className="ProfilePage--button"
            >
              <span className="h2-18-sb">오브제 변경</span>
            </button>
          )
        }
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
        <div className="Archive--modal-backdrop" onClick={(e) => closeModal(e)}>
          <Modal info={data} setModal={setModal} setToast={setToast}/>
        </div>
      )}

      {
        popUp && (
          <div className="Archive--modal-backdrop" onClick={closePopUp}>
            <PopUp purpose={purpose} closePopUp={closePopUp}/>
          </div>
        )
      }

      {
        toast && (
          <Toast purpose={"소개"}/>
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

  const generation = () => {
    if (data.alumniType === 0) {
      return data.generation + "회 ";
    }
  }
  
  return(
    <>
      {
        (data.alumniType === 0 || data.alumniType === 1) ? (
          <div className="MyInfoCard--container" onClick={openModal}>
            <div className="MyInfoCard--header-container">
              <div className="MyInfoCard--header-text">
                <span className="pc-body fs-14" style={{ color: "#66707A"}}>
                {data.campus}&nbsp;
                {generation()}
                {membership()}<br />
                {location}
                </span>
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
                className="pc-body fs-16 MyInfoCard--content-intro" 
                style={{ color: "#66707A"}}
              >
                {data.introduction}
              </span>
            </div>
          </div>
        ) : (
          <div className="EditProfileInfo--basic-info" style={{ width: "285px"}}>
            <div className="EditProfileInfo--basic-info-category b6-16-m">
              <span>이름</span>
              <span>생년월일</span>
              <span>성별</span>
              <span>캠퍼스</span>
            </div>
            <div className="EditProfileInfo--basic-info-content b7-16-sb">
              <span>{data.korName} | {data.engName}</span>
              <span>{data.bornYear}년 {data.bornMonth}월 {data.bornDay}일</span>
              <span>{data.sex}</span>
              <span>{data.campus}</span>
            </div>
          </div>
        )
      }
    </>

  )
}

export default Profile;