import React from "react";
import './FilterOption.css';
import './../../styles/defaultDesign.css';

function FilterOption({title, setFilterOptions, setFilterData}) {
  const deleteOption = (title) => {
    // filterOptions 업데이트
    setFilterOptions(options => options.filter(option => option !== title));
    
    // filterData 업데이트
    setFilterData(prevData => {
      const newData = { ...prevData };
      Object.keys(newData).forEach(key => {
        if (Array.isArray(newData[key])) {
          newData[key] = newData[key].filter(value => value !== title);
        } else if (newData[key] === title) {
          newData[key] = "";
        }
      });
      return newData;
    });
  }

  return (
    <button className="FilterOption--container" onClick={() => deleteOption(title)}>
      <div className="FilterOption--text">
        <span>{title}</span>
        <span>X</span>
      </div>
    </button>
  )
}

export default FilterOption;