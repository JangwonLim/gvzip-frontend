import React, { useCallback, useEffect, useState } from "react";
import './profile.css';
import { getMyInfo } from "../../service/getService";
import './../../styles/defaultDesign.css';
import Modal from "../../components/ProfileDetail/Modal";
import { deleteAccount } from "../../service/deleteService";

function Profile() {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);

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

  const deleteMyAccount = async () => {
    try {
      const result = await deleteAccount();

      if (result.isSuccess) {
        console.log("Successfully deleted your account!");
        window.location.href = 'https://gvzip.com/logout';
      } else {
        console.log("Failed in deleting your account!");
      }
    } catch(error) {
      console.log(error);
    }
  }

  const closeModal = () => {
    setModal(false);
  }

  const logout = () => {
    window.location.href = 'https://gvzip.com/logout';
  }
  
  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  return (
    <div className="ProfilePage--container">
      <MyInfoCard data={data} setModal={setModal}/>

      <div className="ProfilePage--button-container">
        <button className="ProfilePage--button">
          <span className="h2-18-sb">오브제 변경</span>
        </button>
        <button className="ProfilePage--button black">
          <span className="h2-18-sb">프로필 편집</span>
        </button>
      </div>

      <div className="b7-16-sb ProfilePage--bottom-button-container">
        <span 
          onClick={deleteMyAccount}
          style={{ cursor: "pointer" }}
        >
          회원탈퇴
        </span>
        <span>|</span>
        <span 
          onClick={logout}
          style={{ cursor: "pointer" }}
        >
          로그아웃
        </span>
      </div>

      { modal && (
        <div className="Archive--modal-backdrop" onClick={closeModal}>
          <Modal info={data} setModal={setModal}/>
        </div>
      )}
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

        <img 
          className="MyInfoCard--header-img"
          src={require("../../assets/card-image.png")} 
          alt="card-img" 
        />
      </div>

      <div className="MyInfoCard--content-container">
        <span className="pc-head fs-20">{data.korName} | {data.engName}</span>
        <span 
          className="pc-body fs-16" 
          style={{ color: "#66707A"}}
        >
          소설을 주로 쓰는 작가이면서 식물을 사랑하..
        </span>
      </div>
    </div>
  )
}

export default Profile;