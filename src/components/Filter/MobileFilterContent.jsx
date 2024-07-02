import React, {useState, useEffect} from "react";
import '../../pages/authenticate/SignUp/ProfileInfo.css';
import '../../styles/defaultDesign.css';
import ButtonSelection from "../SignUpComponents/ButtonSelection";
import {
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";

function MobileFilterContent({contentProps}) {
  const memberList = ["동문", "인기모"];
  const campusList = ["음성", "문경", "미국"];

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  /* eslint-disable no-unused-vars */
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  const fieldOptions = [
    '영업', '경영/사무', '마케팅',
    '생산/제조', '연구/설계', 'IT/개발',
    '서비스', '무역/유통', '의료/제약',
    '예술/디자인', '교육', '건설',
    '미디어', '전문/특수직', '법률',
    '금융', '농림/어업', '기타'
  ]

  // Load countries on component mount
  useEffect(() => {
    async function fetchCountries() {
      const result = await GetCountries();
      setCountriesList(result);
    }
    fetchCountries();
  }, []);

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
    contentProps.handleChange({ target: { name: 'country', value: selectedCountry.name } });
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
    contentProps.handleChange({ target: { name: 'state', value: selectedState.name } });
  };

  // Update the city
  const onClickCity = (e) => {
    const selectedCity = cityList.find(
      (city) => city.id === parseInt(e.target.value, 10)
    );
    setCity(selectedCity.name);
    setCityid(selectedCity.id);
    contentProps.handleChange({ target: { name: 'city', value: selectedCity.name } });
  };

  return(
    <div className="Profile--content-container">
      {/* Membership */}
      <ButtonSelection 
        formData={contentProps.data}
        handleChange={contentProps.handleChange}
        title={"멤버십"}
        name={"alumniType"}
        list={memberList}
        isMandatory={false}
        color={"black"}
        image={"../../assets/filter-membership.png"}
      />
      
      {/* Campus */}
      <ButtonSelection 
        formData={contentProps.data}
        handleChange={contentProps.handleChange}
        title={"캠퍼스"}
        name={"campus"}
        list={campusList}
        isMandatory={false}
        color={"black"}
        image={"../../assets/filter-campus.png"}
      />

      {/* Location */}
      <div className="Profile--content-section wide-gap">
        <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
          <img 
            style={{ height: "16px", width: "16px", marginTop: "2px" }}
            src={require("../../assets/filter-location.png")} 
            alt="location"
          />
          <span className="b7-16-sb">위치</span>
        </div>
        {/* Country selection */}
        <select
          id="country"
          className={"Profile--dropdown-menu" + (country === "" ? " placeholder" : "")}
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

      {/* Fields */}
      <div className="Profile--content-section wide-gap">
        <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
          <img src={require("../../assets/filter-fields.png")} alt="fields" />
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

      <button
        className="Profile--navigate-button"
      >
        <span className="b7-16-sb">필터 적용</span>
      </button>
    </div>
  )
}

export default MobileFilterContent;