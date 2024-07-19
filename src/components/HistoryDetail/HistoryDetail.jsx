import React from "react";
import './HistoryDetail.css';
import '../../styles/defaultDesign.css'

function HistoryDetail({title, detail1, detail2, content, index, openEdit}) {
  return(
    <div id={index} className="HistoryDetail--container">
      <div className="HistoryDetail--title-wrapper">
        <span className="b7-16-sb">{title}</span>
        <button 
          onClick={openEdit}
          className="HistoryDetail--button"
        />
      </div>
      <span className="b3-14-m" style={{ color: "#A8B3BD"}}>{detail1} · {detail2}</span>
      <span className="b3-14-m">{content}</span>
    </div>
  )
}

export default HistoryDetail;