import React, { useState } from "react";
import './profile.css';
import './../../styles/defaultDesign.css';
import { useGoBack } from "../../utils/usefulFunctions";
import { useSelector } from "react-redux";
import { updateProfilePicture } from "../../service/putService";

function EditProfilePicture() {
  const [selectedObjet, setSelectedObjet] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  
  const userInfo = useSelector(state => state.user.userInfo);
  // const [newUserInfo, setNewUserInfo] = useState(userInfo);

  console.log("redux userInfo: ", userInfo);

  // eslint-disable-next-line no-unused-vars
  const changeProfilePicture = async () => {
    try {
      const { profileImageURL, ...rest } = userInfo;
      // const updatedUserInfo = { ...rest, entranceYear: entranceYear || "", expectedGraduationYear: expectedGraduationYear || "" };

      let formData = rest;
      console.log(formData);
      // let profileImage = selectedObjet;
      console.log(selectedObjet);

      const result = await updateProfilePicture(formData, selectedObjet);

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
        <div className="objet-container" key={i} onClick={() => handleObjet(i)}>
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

  const handleObjet = async (index) => {
    console.log(index)
    setSelectedObjet(`profile-pic-${index}`);
    const imageName = `${selectedObjet}.png`;
    console.log(imageName)
    const imageUrl = require(`./../../assets/${imageName}`);
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], imageName, { type: 'image/*' });
        setSelectedObjet(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      });
  }

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedObjet(file);
  //     const reader = new FileReader();
  //     // reader.onloadend = () => {
  //     //   console.log(reader);
  //     //   setPreviewImage(reader.result);
  //     // };
  //     reader.readAsDataURL(file);
  // }
  // };

  // const handleChange = (e) => {
  //   const {name, value} = e.target;
  //   setNewUserInfo((prevState) => ({...prevState, 
  //     [name]: value})
  //   )
  // }

  // const updateProfile = async () => {
  //   try {
  //     console.log(newUserInfo);
  //     const result = await updateUserInfo(newUserInfo);

  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="Profile--container" style={{ gap: '0px'}}>
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
        {previewImage ? (
          <img
            className="objet"
            src={previewImage}
            alt="selected-objet"
          />
        ) : (
          <img
            className="objet"
            src={require(`./../../assets/profile-pic-11.png`)}
            alt="default-objet"
          />
        )}
      </div>

      {/* <input 
        type="file" 
        id="imageUpload" 
        accept="image/*" 
        onChange={handleImageChange} 
      /> */}

      {/* <input type="text" name="korName" onChange={(e) => handleChange(e)}/> */}

      <div className="objet-wrapper">
        { profilePictures() }
      </div>

      <div className="ProfilePage--button-container">
        <button 
          onClick={useGoBack()}
          className="ProfilePage--button"
        >
          <span className="h2-18-sb">취소</span>
        </button>
        <button 
          onClick={changeProfilePicture}
          className="ProfilePage--button black"
        >
          <span className="h2-18-sb">저장</span>
        </button>
      </div>
    </div>
  )
}

export default EditProfilePicture;