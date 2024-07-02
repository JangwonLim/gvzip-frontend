import React from "react";
import './../../styles/defaultDesign.css';
import './Pagination.css';

function Pagination({ page, totalPages, handlePageClick, isFiltered }) {
  const onClickFirst = () => {
    handlePageClick(1);
  }
  const onClickPrev = () => {
    handlePageClick(page - 1);
  }
  const onClickNext = () => {
    handlePageClick(page + 1);
  }
  const onClickLast = () => {
    handlePageClick(totalPages);
  }

  return (
    <div className={"Pagination--container" + (isFiltered ? " page" : " more")}>
    {
      isFiltered ?
        <div className="Pagination--page-container">
          <div className="Pagination--page-move-btn">
            <button 
            className={"Pagination--page-button" + ((page === 1) ? " inactive" : "")}
            onClick={onClickFirst}
            disabled={(page === 1)}
            >
              <img src={require("./../../img/page-arrow-left.png")} alt="left-arrow"/>
              <img src={require("./../../img/page-arrow-left.png")} alt="left-arrow"/>
            </button>
            <button 
            className={"Pagination--page-button" + ((page === 1) ? " inactive" : "")}
            onClick={onClickPrev}
            disabled={(page === 1)}
            >
              <img src={require("./../../img/page-arrow-left.png")} alt="left-arrow"/>
            </button>
          </div>
          
          <div className="Pagination--page-number">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={"Pagination--page-button" + ((page === index + 1) ? " clicked" : "")}
                onClick={() => handlePageClick(index + 1)}
              >
                <span style={{ fontSize: "7px" }}>{index + 1}</span>
              </button>
            ))}
          </div>

          <div className="Pagination--page-move-btn">
            <button 
            className={"Pagination--page-button" + ((page === totalPages) ? " inactive" : "")}
            onClick={onClickNext}
            disabled={(page === totalPages)}
            >
              <img src={require("./../../img/page-arrow-right.png")} alt="right-arrow"/>
            </button>
            <button 
            className={"Pagination--page-button" + ((page === totalPages) ? " inactive" : "")}
            onClick={onClickLast}
            disabled={(page === totalPages)}
            >
              <img src={require("./../../img/page-arrow-right.png")} alt="right-arrow"/>
              <img src={require("./../../img/page-arrow-right.png")} alt="right-arrow"/>
            </button>
          </div>
        </div>
      :
      <>
        {
          (page !== totalPages)
            && 
          <div className="Pagination--more-page-wrapper">
            <button
              className="Pagination--more-page"
              key={page}
              onClick={() => handlePageClick(page + 1)}
            >
              <span className="pc-button fs-16">더보기</span>
              <img src={require("./../../img/more-page-btn.png")} alt="page-button"/>
            </button>
          </div>
        }
      </>
    }
    </div>
  )
}

export default Pagination;