import React from "react";
import './HistoryDetail.css';
import '../../styles/defaultDesign.css'

function HistoryDetail({title, detail1, detail2, content, index}) {
  return(
    <div id={index} className="HistoryDetail--container">
      <div className="HistoryDetail--title-wrapper">
        <span className="b7-16-sb">{title}</span>
        <button className="HistoryDetail--button">
          {/* <img src={require('../../assets/details-menu.png')} alt="" /> */}
        </button>
      </div>
      <span className="b3-14-m" style={{ color: "#A8B3BD"}}>{detail1} · {detail2}</span>
      <span className="b3-14-m">{content}</span>
    </div>
  )
}

export default HistoryDetail;