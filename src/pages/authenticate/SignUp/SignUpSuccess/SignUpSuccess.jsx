/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect} from "react";
import './SignUpSuccess.css';
import './../../../../styles/defaultDesign.css';
import { getMyInfo } from "../../../../service/getService";
import './../../../profilePage/profile.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "../../../../redux/store";
import { isDefaultProfileImage } from "../../../../utils/usefulFunctions";

function SignUpSuccess() {
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }, [dispatch]);

  const changeObjet = () => {
    navigate("/profile/editObjet");
  }
  
  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

  return (    
      <div className="SignUpSuccess--wrapper">
        <div className="SignUpSuccess--container">
          {
            (data.alumniType === 0 || data.alumniType === 1) && (
              <span className="h2-18-sb" style={{ color: "#2f2f2f", textAlign: "center"}}>
                지비집의 식구가 되신 것을 환영합니다<br />
                아카이브에서 프로필을 확인해보세요!
              </span>
            )
          }

          <div className="SignUpSuccess--background">
            {
              (data.alumniType === 0 || data.alumniType === 1) ? (
                <div className="fade-in">
                  <MyInfoCard data={data}/>
                </div>
              ) : (
                <span className="h2-18-sb" style={{ color: "#2f2f2f", textAlign: "center", marginTop: "130px"}}>
                  지비집의 식구가 되신 것을 환영합니다<br />
                  아카이브에서 프로필을 확인해보세요!
                </span>
              )
            }
          </div>
        </div>

        <div className="SignUpSuccess--button-container">
          {
            ((isDefaultProfileImage(data.profileImageURL) && (data.alumniType === 0 || data.alumniType === 1))) && (
              <button 
                onClick={changeObjet}
                className="SignUpSuccess--button white"
              >
                <span className="h2-18-sb">오브제 변경</span>
              </button>
            )
          }
          
          <button 
            onClick={() => navigate('/archive')}
            className="SignUpSuccess--button"
          >
            <span className="h2-18-sb">아카이브로 이동</span>
          </button>
        </div>
      </div>
  )
}

function MyInfoCard({data}) {
  const membership = () => {
    if (data.alumniType === 0) {
      return "졸업생";
    } else {
      return "인기모";
    }
  }

  const location = [data.city ?? '', data.country ?? ''].filter(Boolean).join(', ');
  
  return(
    <div className="SuccessCard--container">
      <div className="SuccessCard--header-container">
        <div className="SuccessCard--header-text">
          <span className="pc-body fs-14" style={{ color: "#66707A"}}>{data.campus} {data.generation}회 {membership()}<br /> {location}</span>
        </div>

        <div className="SuccessCard--header-img-container">
          <img 
            className="SuccessCard--header-img"
            src={data.profileImageURL || require("./../../../../assets/profile-pic-11.png")} 
            alt="card-img" 
          />
        </div>
      </div>

      <div className="SuccessCard--content-container">
        <span className="pc-head fs-20">
          {data.korName} | {data.engName}
        </span>
        <span 
          className="pc-body fs-16 SuccessCard--content-intro" 
          style={{ color: "#66707A"}}
        >
          {data.introduction}
        </span>
      </div>
    </div>
  )
}

export default SignUpSuccess;