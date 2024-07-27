import React from "react";
import './Filter.css';
import './../../styles/defaultDesign.css';

function FilterOption({title, setFilterOptions, setFilterData, setPage, setInfo, setHasMore}) {
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

    setPage(1); // 새로운 필터가 적용될 때 페이지를 초기화
    setInfo([]); // 기존 데이터를 초기화
    setHasMore(true); // 더 많은 데이터가 있음을 표시
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