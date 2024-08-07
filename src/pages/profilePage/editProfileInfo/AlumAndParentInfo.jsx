import React, { useEffect, useState } from "react";
import './editProfileInfo.css';
import './../../../styles/defaultDesign.css';
import PictureUploader from "../../../components/PictureUploader/PictureUploader";
import Introduction from "../../../components/SignUpComponents/Introduction";
import Email from "../../../components/SignUpComponents/Email";
import HistoryDetail from "../../../components/HistoryDetail/HistoryDetail";
import './../../authenticate/SignUp/ProfileInfo.css';
import { GetCity, GetCountries, GetState } from "react-country-state-city/dist/cjs";
import { useGoBack } from "../../../utils/usefulFunctions";
import EditBottomSheet from "../../../components/BottomSheet/EditBottomSheet";

function AlumAndParentInfo({toggleEducation, toggleCareer, userInfo, handleImageChange, handleChange, updateProfile, previewImage, handleEmail, newUserInfo, educationNumber, setEducationNumber, openEditEducation, careerNumber, setCareerNumber, openEditCareer, isValidEmail}) {

  const [educationMenu, setEducationMenu] = useState(false);
  const [careerMenu, setCareerMenu] = useState(false);

  const openEducationMenu = (e) => {
    setEducationMenu(true);
    setEducationNumber(e.target.id);
  }

  const closeEducationMenu = (e) => {
    e.preventDefault();
    setEducationMenu(false);
  }

  const openCareerMenu = (e) => {
    setCareerMenu(true);
    setCareerNumber(e.target.id);
  }

  const closeCareerMenu = (e) => {
    e.preventDefault();
    setCareerMenu(false);
  }

  return (
    <div className="EditProfileInfo--container">
      <div className="EditProfileInfo--picture">
        <span className="b7-16-sb">사진</span>

        <PictureUploader
          picFile={previewImage}
          onChangePicture={handleImageChange}
        />
      </div>

      <Introduction
        formData={userInfo}
        handleChange={handleChange}
        title={"한줄 소개"}
        placeholder={"한줄 소개를 입력해 주세요."}
        name={"introduction"}
      />

      <div className="EditProfileInfo--basic-info">
        <div className="EditProfileInfo--basic-info-category b6-16-m">
          <span>이름</span>
          <span>생년월일</span>
          <span>성별</span>
          <span>캠퍼스</span>
          {
            userInfo.graduationYear && (
              <span>졸업년도</span>
            )
          }
        </div>
        <div className="EditProfileInfo--basic-info-content b7-16-sb">
          <span>{userInfo.korName} | {userInfo.engName}</span>
          <span>{userInfo.bornYear}년 {userInfo.bornMonth}월 {userInfo.bornDay}일</span>
          <span>{userInfo.sex}</span>
          <span>{userInfo.campus}</span>
          {
            userInfo.graduationYear && (
              <span>{userInfo.graduationYear}</span>
            )
          }
        </div>
      </div>

      <div className="EditProfileInfo--additional-info">
        <Email
          formData={userInfo}
          handleEmail={handleEmail}
          isValidEmail={isValidEmail}
        />

        <div className="Profile--content-section wide-gap">
          <span className="b7-16-sb" style={{ color: "#66707A"}}>학력</span>
          {
            newUserInfo.educations.length > 0 && (
              newUserInfo.educations.map((data, index) => {
                return (
                  <HistoryDetail 
                    title={data.schoolName} 
                    detail1={data.degree} 
                    detail2={data.status} 
                    content={data.major} 
                    index={index}
                    openEdit={openEducationMenu}
                  />
                )
              }
            ))
          }

          <button 
            className="Profile--add-education"
            onClick={toggleEducation}
          >
            <span className="b6-16-m">학력 추가</span>
            <img 
              alt="add-education"
              src={require("./../../../assets/profile-add-edu.png")}
            />
          </button>
        </div>

        {/* Career */}
        <div className="Profile--content-section wide-gap">
          <div>
            <span className="b7-16-sb" style={{ color: "#66707A"}}>경력/경험</span>
          </div>

          {
            newUserInfo.careers.length > 0 && (
              newUserInfo.careers.map((data, index) => {
                return (
                  <HistoryDetail 
                    title={data.companyName} 
                    detail1={data.startYear+"년"} 
                    detail2={data.duration} 
                    content={data.position} 
                    index={index}
                    openEdit={openCareerMenu}
                  />
                )
              }
            ))
          }
          
          <button 
            className="Profile--add-education"
            onClick={toggleCareer}
          >
            <span className="b6-16-m">경험/경력 추가</span>
            <img 
              alt="add-education"
              src={require("./../../../assets/profile-add-edu.png")}
            />
          </button>
        </div>

        <Location formData={userInfo} handleChange={handleChange}/>

        <Fields formData={userInfo} handleChange={handleChange}/>

        <div className="Profile--content-section wide-gap">
          <span className="b7-16-sb" style={{ color: "#66707A"}}>링크</span>

          <input 
            className="Profile--text-input-box"
            type="text" 
            placeholder={"나를 소개하는 링크 입력"}
            name={"sns"}
            defaultValue={userInfo['sns']}
            onChange={handleChange}
          />
        </div>

        <div className="ProfilePage--button-container">
          <button 
            onClick={useGoBack()}
            className="ProfilePage--button"
          >
            <span className="h2-18-sb">취소</span>
          </button>
          <button 
            onClick={updateProfile}
            className="ProfilePage--button black"
            disabled
          >
            <span className="h2-18-sb">저장</span>
          </button>
        </div>

        {
          educationMenu && (
            <div 
              className="EditBottomSheet--modal-background"
              onClick={(e) => closeEducationMenu(e)}
            >
              <EditBottomSheet
                closeEdit={closeEducationMenu}
                openEditEducation={openEditEducation}
                handleChange={handleChange}
                index={educationNumber}
                type={"education"}
              />
            </div>
          )
        }
        {
          careerMenu && (
            <div 
              className="EditBottomSheet--modal-background"
              onClick={(e) => closeCareerMenu(e)}
            >
              <EditBottomSheet
                closeEdit={closeCareerMenu}
                openEditEducation={openEditCareer}
                handleChange={handleChange}
                index={careerNumber}
                type={"career"}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

function Fields({formData, handleChange}) {
  const fieldOptions = [
    '영업', '경영/사무', '마케팅',
    '생산/제조', '연구/설계', 'IT/개발',
    '서비스', '무역/유통', '의료/제약',
    '예술/디자인', '교육', '건설',
    '미디어', '전문/특수직', '법률',
    '금융', '농림/어업', '기타'
  ]

  const [fields, setFields] = useState([]);

  useEffect(() => {
    setFields({
      field1: formData.field1 || '',
      field2: formData.field2 || '',
      field3: formData.field3 || ''
    });
  }, [formData]);

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
      handleChange({ target: { name: 'field1', value: newFields.field1 } });
      handleChange({ target: { name: 'field2', value: newFields.field2 } });
      handleChange({ target: { name: 'field3', value: newFields.field3 } });
  
      return newFields;
    });
  };

  return (
    <div className="Profile--content-section wide-gap">
      <div>
        <span className="b7-16-sb" style={{ color: "#66707A"}}>분야(최대 3개) </span>
        <span style={{ color: "#FE3C2A"}}>*</span>
      </div>

      <div className="Profile--button-container fields">
        {
          fieldOptions.map((option, index) => (
            <button 
              className={"Profile--button field" + ([fields.field1, fields.field2, fields.field3].includes(option) ? " selected" : "")}
              key={option}
              onClick={() => onClickFields(option)}
              value={option}
            >
              <span className="b7-16-sb">
                {option}
              </span>
            </button>
          ))
        }
      </div>
    </div>
  )
}

function Location({formData, handleChange}) {
  const [country, setCountry] = useState(formData.country || '');
  const [state, setState] = useState(formData.state || '');
  const [city, setCity] = useState(formData.city || '');

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [isValidLocation, setIsValidLocation] = useState(false);
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

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countriesList.find(
        (country) => country.name === formData.country
      );
      if (selectedCountry) {
        setCountryid(selectedCountry.id);
        setCountry(selectedCountry.name);
        loadStates(selectedCountry.id);
      }
    }
    if (formData.state) {
      const selectedState = stateList.find(
        (state) => state.name === formData.state
      );
      if (selectedState) {
        setStateid(selectedState.id);
        setState(selectedState.name);
        loadCities(countryid, selectedState.id);
      }
    }
    if (formData.city) {
      const selectedCity = cityList.find(
        (city) => city.name === formData.city
      );
      if (selectedCity) {
        setCityid(selectedCity.id);
        setCity(selectedCity.name);
      }
    }
  }, [formData, countriesList, stateList, cityList, countryid]);

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
    await loadStates(selectedCountry.id);
    handleChange({ target: { name: 'country', value: selectedCountry.name } });
    handleChange({ target: { name: 'state', value: '' } });
    handleChange({ target: { name: 'city', value: '' } });
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
    await loadCities(countryid, selectedState.id);
    handleChange({ target: { name: 'state', value: selectedState.name } });
    handleChange({ target: { name: 'city', value: '' } });
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


  return (
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
  )
}

export default AlumAndParentInfo;