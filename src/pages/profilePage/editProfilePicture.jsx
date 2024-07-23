import React, { useState } from "react";
import './profile.css';
import './../../styles/defaultDesign.css';
import { useGoBack } from "../../utils/usefulFunctions";
import { useSelector } from "react-redux";
import { updateInfoAndProfilePicture, updateUserInfo } from "../../service/putService";

function EditProfilePicture() {
  let [selectedObjet, setSelectedObjet] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState(userInfo);
  const userInfo = useSelector(state => state.user.userInfo);

  console.log("redux userInfo: ", userInfo);

  const changeProfilePicture = async () => {
    try {
      const { profileImageURL, ...rest } = userInfo;
      // const updatedUserInfo = { ...rest, entranceYear: entranceYear || "", expectedGraduationYear: expectedGraduationYear || "" };

      let formData = rest;
      console.log(formData);
      // let profileImage = selectedObjet;
      console.log(selectedObjet);

      const result = await updateInfoAndProfilePicture(formData, selectedObjet);

      if (result) {
        console.log('successfully update the picture')
      }
    } catch(error) {
      console.log('Failed in updating the picture')
    }
  }

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

  // eslint-disable-next-line no-unused-vars
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedObjet(file);
      const reader = new FileReader();
      // reader.onloadend = () => {
      //   console.log(reader);
      //   setPreviewImage(reader.result);
      // };
      reader.readAsDataURL(file);
  }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewUserInfo((prevState) => ({...prevState, 
      [name]: value})
    )
  }

  const updateProfile = async () => {
    try {
      const result = await updateUserInfo(newUserInfo);

      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
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
          // src={require(`./../../assets/${selectedObjet}.png`)} 
          alt="selected-objet" 
        />
      </div>

      <input 
        type="file" 
        id="imageUpload" 
        accept="image/*" 
        onChange={handleImageChange} 
      />

      <input type="text" value={userInfo.korName} name="korName" onChange={(e) => handleChange(e)}/>

      <div className="objet-wrapper">
        { profilePictures() }
      </div>

      <button 
        // onClick={changeProfilePicture}
        onClick={updateProfile}
        className="ProfilePage--button black"
      >
        <span className="h2-18-sb">저장</span>
      </button>
    </div>
  )
}

export default EditProfilePicture;