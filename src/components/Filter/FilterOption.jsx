import React from "react";
import './FilterOption.css';
import './../../styles/defaultDesign.css';

function FilterOption({title, setFilterOptions}) {
  const deleteOption = (title) => {
    setFilterOptions(options => options.filter(option => option !== title));
  }

  return (
    <button className="FilterOption--container">
      <div className="FilterOption--content">
        <span className="pc-body fs-14">{title}</span>
        <img 
        className="FilterOption--img" 
        src={require("./../../img/filter-delete.png")} 
        alt="delete"
        onClick={() => deleteOption(title)}
        />
      </div>
    </button>
  )
}

export default FilterOption;