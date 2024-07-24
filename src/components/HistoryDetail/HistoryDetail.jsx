import React from "react";
import './HistoryDetail.css';
import '../../styles/defaultDesign.css'

function HistoryDetail({title, detail1, detail2, content, index, openEdit}) {
  return(
    <div className="HistoryDetail--container">
      <div className="HistoryDetail--title-wrapper">
        <span className="b7-16-sb">{title}</span>
        <button 
          id={index}
          onClick={(e) => openEdit(e)}
          className="HistoryDetail--button"
        />
      </div>
      <span className="b3-14-m">{content}</span>
      <span className="b3-14-m" style={{ color: "#A8B3BD"}}>{detail1} ·  {detail2}</span>
    </div>
  )
}

export default HistoryDetail;