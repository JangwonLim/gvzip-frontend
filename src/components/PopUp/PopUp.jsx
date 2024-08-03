import React from "react";
import './PopUp.css';
import './../../styles/defaultDesign.css';
import { deleteAccount } from "../../service/deleteService";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../redux/store";

function PopUp({purpose, closePopUp}) {
  const navigate = useNavigate();

  const title = () => {
    switch (purpose) {
      case "회원탈퇴":
        return "정말 탈퇴하시겠습니까?";
      case "로그아웃":
        return "로그아웃 하시겠습니까?";
      case "로그인":
        return "로그인 하시겠습니까?";
      default:
        return "";
    }
  }

  const buttonText = () => {
    switch (purpose) {
      case "회원탈퇴":
        return "탈퇴";
      case "로그아웃":
        return "로그아웃";
      case "로그인":
        return "확인";
      default:
        return "";
    }
  }

  const deleteMyAccount = async () => {
    try {
      const result = await deleteAccount();

      if (result.isSuccess) {
        console.log("Successfully deleted your account!");
        window.location.href = 'https://gvzip.com/logout';
        persistor.purge();
      } else {
        console.log("Failed in deleting your account!");
      }
    } catch(error) {
      console.log(error);
    }
  }

  const logout = () => {
    window.location.href = 'https://gvzip.com/logout';
  }

  const handleNext = () => {
    switch (purpose) {
      case "회원탈퇴":
        deleteMyAccount();
        break;
      case "로그아웃":
        logout();
        break;
      case "로그인":
        navigate('/signin');
        break;
      default:
        break;
    }
  }

  const handleCancel = () => {
    if (purpose === "로그인") {
      navigate(-1);
    } else {
      closePopUp();
    }
  }

  return (
    <div className="PopUp--container">
      <div className="PopUp--text-container">
        <span className="PopUp--title">{title()}</span>
        {
          (purpose === "회원탈퇴") && (
            <span className="PopUp--disclaimer">
              탈퇴 버튼 선택 시, 계정은 삭제되며<br />
              복구되지 않습니다.
            </span>
          )
        }
      </div>

      <div className="PopUp--button-container">
        <button 
          onClick={handleCancel}
          className="PopUp--button b7-16-sb"
        >
          취소
        </button>
        <button 
          onClick={handleNext}
          className="PopUp--button black b7-16-sb"
        >
          {buttonText()}
        </button>
      </div>
    </div>
  )
}

export default PopUp;