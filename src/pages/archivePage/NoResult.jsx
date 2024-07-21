import React from "react";
import './Archive.css'
import './../../styles/defaultDesign.css';

function NoResult({searchingWord}) {
  return (
    <div className="NoResult--container">
      <span className="b4-14-sb" style={{ color: "#2f2f2f" }}> 
        입력하신 '{searchingWord}'에 대한<br />
        검색 결과가 없습니다.
      </span>

      <div className="NoResult--content">
        <span className="b1-12-m">
          - 검색어의 철자가 정확한지 확인해주세요.
        </span>
        <span className="b1-12-m">
          - 비슷한 다른 검색어를 입력해보세요.
        </span>
      </div>
    </div>
  )
}

export default NoResult;