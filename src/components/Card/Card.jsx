import React from "react";
import './Card.css'
import '../../styles/defaultDesign.css';

function Card({data, setModal, setModalInfo}) {

  const openModal = () => {
    setModal(true);
    setModalInfo(data);
  }

  const membership = () => {
    if (data.alumniType === 0) {
      return "졸업생";
    } else {
      return "인기모";
    }
  }

  const generation = () => {
    if (data.alumniType === 0) {
      return data.generation + "회";
    }
  }

  const location = [data.city ?? '', data.country ?? ''].filter(Boolean).join(', ');

  return(
    <div className="Card--container" onClick={openModal}>
      <div className="Card--header-container">
        <div className="Card--header-text">
          <span className="b0-10-m" style={{ color: "#66707A"}}>
            {data.campus} 
            {generation()} 
            {membership()} <br />
            {location}
          </span>
        </div>

        <div className="Card--header-img-container">
          <img 
            className="Card--header-img"
            src={data.profileImageURL || require("./../../assets/profile-pic-11.png")}
            alt="card-img" 
          />
        </div>
      </div>

      <div className="Card--content-container">
        <span className="Card--content-name">{data.korName} | {data.engName}</span>
        <span 
          className="b1-12-m Card--content-intro" 
          style={{ color: "#66707A"}}
        >
          {data.introduction}
        </span>
      </div>
    </div>
  )
}

export default Card;