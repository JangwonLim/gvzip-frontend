import React, { useState, useEffect } from "react";
import './../Signup.css';
import './../ProfileInfo.css';
import './../../../../styles/defaultDesign.css';
import {
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";
import Introduction from "../../../../components/SignUpComponents/Introduction";
/* eslint-disable no-unused-vars */
function AlumniThirdPage({ formData, handleChange, goToNextPage, goToPreviousPage }) {
  const fieldOptions = [
    '영업', '경영/사무', '마케팅',
    '생산/제조', '연구/설계', 'IT/개발',
    '서비스', '무역/유통', '의료/제약',
    '예술/디자인', '교육', '건설',
    '미디어', '전문/특수직', '법률',
    '금융', '농림/어업', '기타'
  ]

  const [fields, setFields] = useState([]);
  const [isFieldFull, setIsFieldFull] = useState(false);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [isValidLocation, setIsValidLocation] = useState(false);
  // const [isThirdDone, setIsThirdDone] = useState(false);

  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  // Load countries on component mount
  useEffect(() => {
    async function fetchCountries() {
      const result = await GetCountries();
      setCountriesList(result);
    }
    fetchCountries();
  }, []);

  // Validate location based on current state
  useEffect(() => {
    if (!isLoadingState && !isLoadingCity) {
      if (country && state && city) {
        setIsValidLocation(true);
      } else if (country && state && cityList.length === 0) {
        setIsValidLocation(true);
      } else if (country && stateList.length === 0) {
        setIsValidLocation(true);
      } else {
        setIsValidLocation(false);
      }
    } else {
      setIsValidLocation(false);
    }
  }, [country, state, city, countriesList, stateList, cityList, isLoadingState, isLoadingCity]);

  // Update the country
  const onClickCountry = async (e) => {
    const selectedCountry = countriesList.find(
      (country) => country.id === parseInt(e.target.value, 10)
    );
    setCountry(selectedCountry.name);
    setCountryid(selectedCountry.id);
    setState('');
    setStateid(0);
    setCity('');
    setCityid(0);
    setCityList([]);
    setIsLoadingState(true); // Start loading state
    const result = await GetState(selectedCountry.id);
    setStateList(result);
    setIsLoadingState(false); // End loading state
    handleChange({ target: { name: 'country', value: selectedCountry.name } });
  };

  // Update the state
  const onClickState = async (e) => {
    const selectedState = stateList.find(
      (state) => state.id === parseInt(e.target.value, 10)
    );
    setState(selectedState.name);
    setStateid(selectedState.id);
    setCity('');
    setCityid(0);
    setIsLoadingCity(true); // Start loading city
    const result = await GetCity(countryid, selectedState.id);
    setCityList(result);
    setIsLoadingCity(false); // End loading city
    handleChange({ target: { name: 'state', value: selectedState.name } });
  };

  // Update the city
  const onClickCity = (e) => {
    const selectedCity = cityList.find(
      (city) => city.id === parseInt(e.target.value, 10)
    );
    setCity(selectedCity.name);
    setCityid(selectedCity.id);
    handleChange({ target: { name: 'city', value: selectedCity.name } });
  };

  const onClickFields = (option) => {
    setFields((prevFields) => {
      const fieldArray = [prevFields.field1, prevFields.field2, prevFields.field3];
  
      if (fieldArray.includes(option)) {
        // Remove the option if it's already selected
        fieldArray[fieldArray.indexOf(option)] = '';
      } else {
        // Add the option if it's not already selected and if there is space
        const emptyIndex = fieldArray.indexOf('');
        if (emptyIndex !== -1) {
          fieldArray[emptyIndex] = option;
        }
      }
  
      const newFields = {
        field1: fieldArray[0] || '',
        field2: fieldArray[1] || '',
        field3: fieldArray[2] || ''
      };
  
      // Update the isFieldFull state based on the newFields length
      setIsFieldFull(fieldArray.filter(field => field !== '').length === 3);
      handleChange({ target: { name: 'field1', value: newFields.field1 } });
      handleChange({ target: { name: 'field2', value: newFields.field2 } });
      handleChange({ target: { name: 'field3', value: newFields.field3 } });
  
      return newFields;
    });
  };

  const onClickNext = () => {
    console.log(formData);
  }

  return (
    <div className="Profile--content-container">
      {/* Location */}
      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>현재 활동 위치 </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <div className="Profile--content-section wide-gap">
          {/* Country selection */}
          <select
            id="country"
            className={"Profile--dropdown-menu" + (formData.country === "" ? " placeholder" : "")}
            onChange={(e) => onClickCountry(e)}
            value={countryid}
          >
            <option value="0" disabled>
              국가 선택
            </option>
            {countriesList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* State selection */}
          <select
            id="state"
            className={"Profile--dropdown-menu" + (state === "" ? " placeholder" : "")}
            onChange={(e) => onClickState(e)}
            value={stateid}
            disabled={!countryid || (stateList.length === 0)}
          >
            <option value="0" disabled>
              주 선택
            </option>
            {stateList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* City selection */}
          <select
            id="city"
            className={"Profile--dropdown-menu" + (city === "" ? " placeholder" : "")}
            onChange={(e) => onClickCity(e)}
            value={cityid}
            disabled={!stateid || (cityList.length === 0)}
          >
            <option value="0" disabled>
              도시 선택
            </option>
            {cityList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fields */}
      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>분야(최대 3개) </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <div className="Profile--button-container fields">
          {
            fieldOptions.map((option) => (
              <button 
                className={"Profile--button field" + ([fields.field1, fields.field2, fields.field3].includes(option) ? " selected" : "")}
                key={option}
                onClick={() => onClickFields(option)}
              >
                <span className="b7-16-sb">
                  {option}
                </span>
              </button>
            ))
          }
        </div>
      </div>
      
      {/* Introduction */}
      <Introduction 
        formData={formData}
        handleChange={handleChange}
        title={'한줄 소개'}
        placeholder={'ex. 지비집 프로덕트 디자이너, 지비대 학부생'}
      />

      <div className="Profile--button-container navigate">
        <button 
          className="Profile--navigate-button prev"
          onClick={goToPreviousPage}
        >
          <span className="h2-18-sb">이전</span>
        </button>
        <button 
          className="Profile--navigate-button"
          onClick={goToNextPage}
        >
          <span className="h2-18-sb">다음</span>
        </button>
      </div>
    </div>
  )
}

export default AlumniThirdPage;