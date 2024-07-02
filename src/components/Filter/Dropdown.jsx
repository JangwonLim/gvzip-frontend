import React, { useState } from "react";
import './Dropdown.css';
import '../../styles/defaultDesign.css';
import CountrySelector from "../CountrySelector/CountrySelector";

function Dropdown({handleFilterClick, onClickFilterOptions}) {
  const [viewMembership, setViewMembership] = useState(false);
  const [viewLocation, setViewLocation] = useState(false);
  const [viewFields, setViewFields] = useState(false);
  // const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleViewMembership = () => {
    setViewMembership(!viewMembership);
  };

  const toggleViewLocation = () => {
    setViewLocation(!viewLocation);
  };

  const toggleViewFields = () => {
    setViewFields(!viewFields);
  };

  const membership = ["동문", "인기모"];
  const fields = [
    '영업/고객상담', 
    '경영/사무', 
    '마케팅/광고/홍보', 
    '생산/제조',
    '연구개발/설계',
    'IT/인터넷',
    '서비스',
    '무역/유통',
    '의료',
    '건설',
    '디자인',
    '전문/특수직',
    '미디어',
    '기타',
  ]

  // const toggleOption = (option) => {
  //   const transformedOption = option === "동문" ? "true" : (option === "인기모" ? "false" : option);
  
  //   const index = selectedOptions.indexOf(transformedOption);
  //   let newSelectedOptions = [...selectedOptions];
    
  //   if (index === -1) {
  //     newSelectedOptions.push(transformedOption);
  //   } else {
  //     newSelectedOptions.splice(index, 1);
  //   }
  //   console.log(newSelectedOptions);
  
  //   const optionsString = newSelectedOptions.length > 0 ? newSelectedOptions.join(',') : null;
  //   console.log(optionsString);
  
  //   setSelectedOptions(newSelectedOptions);
  
  //   const setState = {
  //     'Membership': setMembership,
  //     'Campus': setCampus,
  //     'Field': setFields
  //   }[title];
  
  //   setState(optionsString);
  // };
  

  return (
    <div className="Dropdown--container">
      <div className="Dropdown--header">
        <div className="Dropdown--header-filter">
          <img src={require('./../../img/filter.png')} alt="filter"/>
          <span className="pc-subtitle fs-16">필터</span>
        </div>
        <button className="Dropdown--exit" onClick={handleFilterClick}/>
      </div>

      <label className="Dropdown--menu" htmlFor="dropdown">
        {/* membership */}
        <div className="Dropdown--menu-wrapper">
          <div className="Dropdown--menu-title">
            <img src={require('../../img/people.png')} alt="membership"/>
            <span className="pc-subtitle fs-16">멤버십</span>
          </div>
          <button 
          className={"Dropdown--expand" + (viewMembership ? " rotate" : "")} 
          onClick={toggleViewMembership}
          />
        </div>
        <div className={"Dropdown--content" + (viewMembership ? " active" : "")}>
          <ul>
            {membership.map((option, index) => (
              <li key={index}>
                {/* <input type="checkbox" onChange={() => toggleOption(option)}/>  */}
                <input type="checkbox" onClick={() => onClickFilterOptions(option)} /> 
                <span className="pc-subtitle fs-16">{option}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="Dropdown--menu-divider"/>

        {/* location */}
        <div className="Dropdown--menu-wrapper">
          <div className="Dropdown--menu-title">
            <img src={require('../../img/filter-location.png')} alt="membership"/>
            <span className="pc-subtitle fs-16">위치</span>
          </div>
          <button 
          className={"Dropdown--expand" + (viewLocation ? " rotate" : "")} 
          onClick={toggleViewLocation}
          />
        </div>
        <div className={"Dropdown--content" + (viewLocation ? " active" : "")}>
          { viewLocation && <CountrySelector /> }
        </div>
        <div className="Dropdown--menu-divider"/>

        {/* fields */}
        <div className="Dropdown--menu-wrapper">
          <div className="Dropdown--menu-title">
            <img src={require('../../img/filter-fields.png')} alt="membership"/>
            <span className="pc-subtitle fs-16">분야</span>
          </div>
          <button 
          className={"Dropdown--expand" + (viewFields ? " rotate" : "")} 
          onClick={toggleViewFields}
          />
        </div>
        <div className={"Dropdown--content" + (viewFields ? " active" : "")}>
          <ul>
            {fields.map((option, index) => (
              <li key={index}>
                {/* <input type="checkbox" onChange={() => toggleOption(option)}/>  */}
                <input type="checkbox" onClick={() => onClickFilterOptions(option)}/> 
                <span className="pc-subtitle fs-16">{option}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="Dropdown--menu-divider"/>
      </label>
    </div>
  )
}

export default Dropdown;
