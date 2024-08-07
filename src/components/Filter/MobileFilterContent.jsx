/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import '../../pages/authenticate/SignUp/ProfileInfo.css';
import '../../styles/defaultDesign.css';
import ButtonSelection from "../SignUpComponents/ButtonSelection";
import {
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";

function MobileFilterContent({contentProps, onClickFilterOptions, resetFilter}) {
  const memberList = ["동문", "인기모"];
  const campusList = ["음성", "문경", "미국"];

  const { data, handleChange } = contentProps;

  const [country, setCountry] = useState(data.country || '');
  const [state, setState] = useState(data.state || '');
  const [city, setCity] = useState(data.city || '');

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  const [isAnyFilterSelected, setIsAnyFilterSelected] = useState(false);

  const fieldOptions = [
    '영업', '경영/사무', '마케팅',
    '생산/제조', '연구/설계', 'IT/개발',
    '서비스', '무역/유통', '의료/제약',
    '예술/디자인', '교육', '건설',
    '미디어', '전문/특수직', '법률',
    '금융', '농림/어업', '기타'
  ]

  useEffect(() => {
    setIsAnyFilterSelected(
      contentProps.data["membership"].length > 0 ||
      contentProps.data["campus"].length > 0 ||
      contentProps.data["country"].length > 0 ||
      contentProps.data["state"].length > 0 ||
      contentProps.data["fields"].length > 0
    )
  }, [contentProps]);

  useEffect(() => {
    async function fetchCountries() {
      const result = await GetCountries();
      setCountriesList(result);

      // 초기 formData에 따라 초기 state 설정
      if (data.country) {
        const selectedCountry = result.find(country => country.name === data.country);
        if (selectedCountry) {
          setCountryid(selectedCountry.id);
          setCountry(selectedCountry.name);
          loadStates(selectedCountry.id);
        }
      }
    }
    fetchCountries();
  }, [data.country]);

  useEffect(() => {
    async function syncStateAndCity() {
      if (data.state && countryid) {
        const states = await GetState(countryid);
        setStateList(states);
        const selectedState = states.find(state => state.name === data.state);
        if (selectedState) {
          setStateid(selectedState.id);
          setState(selectedState.name);
          loadCities(countryid, selectedState.id);
        }
      }
    }
    syncStateAndCity();
  }, [countryid, data.state]);

  useEffect(() => {
    if (data.city && stateid) {
      async function syncCity() {
        const cities = await GetCity(countryid, stateid);
        setCityList(cities);
        const selectedCity = cities.find(city => city.name === data.city);
        if (selectedCity) {
          setCityid(selectedCity.id);
          setCity(selectedCity.name);
        }
      }
      syncCity();
    }
  }, [stateid, data.city, countryid]);

  // useEffect(() => {
  //   if (!isLoadingState && !isLoadingCity) {
  //     if (country && state && city) {
  //       setIsValidLocation(true);
  //     } else if (country && state && cityList.length === 0) {
  //       setIsValidLocation(true);
  //     } else if (country && stateList.length === 0) {
  //       setIsValidLocation(true);
  //     } else {
  //       setIsValidLocation(false);
  //     }
  //   } else {
  //     setIsValidLocation(false);
  //   }
  // }, [country, state, city, countriesList, stateList, cityList, isLoadingState, isLoadingCity, setIsValidLocation]);

  const loadStates = async (countryId) => {
    setIsLoadingState(true);
    const result = await GetState(countryId);
    setStateList(result);
    setIsLoadingState(false);
  };

  const loadCities = async (countryId, stateId) => {
    setIsLoadingCity(true);
    const result = await GetCity(countryId, stateId);
    setCityList(result);
    setIsLoadingCity(false);
  };

  const onClickCountry = async (e) => {
    const selectedCountry = countriesList.find(country => country.id === parseInt(e.target.value, 10));
    setCountry(selectedCountry.name);
    setCountryid(selectedCountry.id);
    setState('');
    setStateid(0);
    setCity('');
    setCityid(0);
    setCityList([]);
    await loadStates(selectedCountry.id);
    handleChange({ target: { name: 'country', value: selectedCountry.name } });
    handleChange({ target: { name: 'state', value: '' } });
    handleChange({ target: { name: 'city', value: '' } });
  };

  const onClickState = async (e) => {
    const selectedState = stateList.find(state => state.id === parseInt(e.target.value, 10));
    setState(selectedState.name);
    setStateid(selectedState.id);
    setCity('');
    setCityid(0);
    await loadCities(countryid, selectedState.id);
    handleChange({ target: { name: 'state', value: selectedState.name } });
    handleChange({ target: { name: 'city', value: '' } });
  };

  const onClickCity = (e) => {
    const selectedCity = cityList.find(city => city.id === parseInt(e.target.value, 10));
    setCity(selectedCity.name);
    setCityid(selectedCity.id);
    handleChange({ target: { name: 'city', value: selectedCity.name } });
  };

  const handleResetFilter = () => {
    resetFilter();
    setCountry('');
    setState('');
    setCity('');
    setCountryid(0);
    setStateid(0);
    setCityid(0);
    // setCountriesList([]);
    // setStateList([]);
    // setCityList([]);
  };

  return(
    <div className="Profile--content-container">
      {/* Membership */}
      <div style={{ fontWeight: "500"}}>
        <ButtonSelection 
          formData={contentProps.data}
          handleChange={contentProps.handleChange}
          title={"멤버십"}
          name={"membership"}
          list={memberList}
          isMandatory={false}
          color={"black"}
        />
      </div>
      
      {/* Campus */}
      <ButtonSelection 
        formData={contentProps.data}
        handleChange={contentProps.handleChange}
        title={"캠퍼스"}
        name={"campus"}
        list={campusList}
        isMandatory={false}
        color={"black"}
      />

      {/* Location */}
      <div className="Profile--content-section wide-gap">
        <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
          <span className="b7-16-sb">위치</span>
        </div>

        {/* Country selection */}
        <select
          id="country"
          className={"Profile--dropdown-menu" + (data.country === "" ? " placeholder" : "")}
          onChange={onClickCountry}
          value={countryid}
        >
          <option value="0" disabled>국가 선택</option>
          {countriesList.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        {/* State selection */}
        <select
          id="state"
          className={"Profile--dropdown-menu" + (state === "" ? " placeholder" : "")}
          onChange={onClickState}
          value={stateid}
          disabled={!countryid || stateList.length === 0}
        >
          <option value="0" disabled>주 선택</option>
          {stateList.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        {/* City selection */}
        <select
          id="city"
          className={"Profile--dropdown-menu" + (city === "" ? " placeholder" : "")}
          onChange={onClickCity}
          value={cityid}
          disabled={!stateid || cityList.length === 0}
        >
          <option value="0" disabled>도시 선택</option>
          {cityList.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* Fields */}
      <div className="Profile--content-section wide-gap">
        <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
          {/* <img src={require("../../assets/filter-fields.png")} alt="fields" /> */}
          <span className="b7-16-sb">분야</span>
        </div>

        <select 
          name="fields"
          className={`Profile--dropdown-menu${contentProps.data.fields === "" ? " placeholder" : ""}`}
          value={contentProps.data.fields}
          onChange={contentProps.handleChange}
        >
          <option value="" disabled>
            분야 선택
          </option>
          {fieldOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="MobileFilterContent--button-container">
        <button
          onClick={handleResetFilter}
          className={"MobileFilterContent--button-reset " + (!isAnyFilterSelected ? "disable" : "")}
          disabled={!isAnyFilterSelected}
        >
          <img src={require("./../../assets/reset-black.png")} alt="reset" />
        </button>
        <button
          onClick={() => onClickFilterOptions()}
          className={"MobileFilterContent--button " + (!isAnyFilterSelected ? "disable" : "")}
          disabled={!isAnyFilterSelected}
        >
          <span className="b7-16-sb">필터 적용</span>
        </button>
      </div>
    </div>
  )
}

export default MobileFilterContent;