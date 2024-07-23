import React, { useState } from "react";
import './profile.css';
import './../../styles/defaultDesign.css';
import { useGoBack } from "../../utils/usefulFunctions";
import { useSelector } from "react-redux";

function EditProfilePicture() {
  let [selectedObjet, setSelectedObjet] = useState('profile-pic-11');
  const userInfo = useSelector(state => state.user.userInfo);

  console.log("redux userInfo: ", userInfo);

  const profilePictures = () => {
    const objets = []
    for (let i = 12; i >= 1; i--) {
      objets.push(
        <div className="objet-container" key={i} onClick={(e) => handleObjet(e)}>
          <img
            className="objet"
            src={require(`./../../assets/profile-pic-${i}.png`)} 
            alt={`profile-pic-${i}`} 
          />
        </div>
      )
    }
    return objets;
  }

  const handleObjet = (e) => {
    setSelectedObjet(e.target.alt);
  }

  return (
    <div className="Profile--container">
      <div className="Profile--header">
        <button 
          className="Profile--header-back-button"
          onClick={useGoBack()}
        >
          <img src={require("./../../assets/profile-header-back-button.png")} alt="back-button" />
        </button> 
        <span className="Profile--header-title">오브제 변경</span>
      </div>

      <div className="objet-preview-container">
        <img 
          className="objet"
          src={require(`./../../assets/${selectedObjet}.png`)} 
          alt="selected-objet" 
        />
      </div>

      <div className="objet-wrapper">
        { profilePictures() }
      </div>

      <button 
        // onClick={}
        className="ProfilePage--button black"
      >
        <span className="h2-18-sb">저장</span>
      </button>
    </div>
  )
}

export default EditProfilePicture;