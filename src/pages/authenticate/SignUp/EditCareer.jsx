import React, { useEffect, useState } from "react";
import './ProfileInfo.css';
import { validateYear } from "../../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { updateCareer } from "../../../redux/store";

function EditCareer({handleChange, index, closeEditEducation}) {
  const dispatch = useDispatch();

  const careers = useSelector((state) => state.careers.careers);

  const [careerData, setCareerData] = useState({
    companyName: "",
    position: "",
    startYear: "",
    duration: ""
  })
  const [isDataValid, setIsDataValid] = useState(false);

  useEffect(() => {
    setIsDataValid(
      careerData.companyName.length > 0 &&
      careerData.position.length > 0 &&
      careerData.duration.length > 0 &&
      validateYear(careerData.startYear)
    )
  },[careerData])

  const handleCareerData = (e) => {
    const { name, value } = e.target;

    if (name === "startYear") {
      if (/^\d*$/.test(value) && value.length <= 4) {
        setCareerData(prevState => ({
          ...prevState,
          [name]: parseInt(value)
        }));
      }
    } else {
      setCareerData((prevCareerData) => ({
        ...prevCareerData,
        [name]: value
      }));
    }
  }

  const updateCareerHandler = () => {
    // Update the local state and Redux state
    handleChange(null, 'update', index, careerData, 'careers');
    dispatch(updateCareer({ index, updatedCareer: careerData }));
    closeEditEducation();
  };

  useEffect(() => {
    if (careers[index]) {
      setCareerData(careers[index]);
    }
  }, [index, careers]);

  const generateDurationOptions = () => {
    const yearOptions = ["단기", "3개월 이하", "6개월 이하", '6개월~1년', '1년~2년', '2년~3년', '3년 이상', '5년 이상', '10년 이상', '30년 이상'];

    return (
      yearOptions.map((item, index) => (
        <option key={index} defaultValue={item}>
          {item}
        </option>
      ))
    )
  };

  return (
    <div className="Profile--content-container huge-gap">
      {/* Company Name */}
      <div className="Profile--content-section narrow-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>일한곳 </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <input 
          className="Profile--text-input-box"
          type="text" 
          placeholder={"일한 곳 입력"}
          name={"companyName"}
          defaultValue={careerData.companyName}
          onChange={handleCareerData}
        />
      </div>

      <div className="Profile--content-section narrow-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>포지션 </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <input 
          className="Profile--text-input-box"
          type="text" 
          placeholder={"포지션 입력"}
          name={"position"}
          defaultValue={careerData.position}
          onChange={handleCareerData}
        />
      </div>

      <div className="Profile--content-section narrow-gap">
        <span className="b7-16-sb" style={{ color: "#66707A"}}>시작 연도 </span>
        <span style={{ color: "#FE3C2A"}}>*</span>

        <input 
          className="Profile--text-input-box"
          type="text"
          placeholder={"YYYY"}
          name={"startYear"}
          defaultValue={careerData.startYear}
          onChange={handleCareerData}
          length={4}
        />
      </div>

      <div className="Profile--content-section wide-gap">
        <div>
          <span className="b7-16-sb" style={{ color: "#66707A"}}>일한 기간 </span>
          <span style={{ color: "#FE3C2A"}}>*</span>
        </div>

        <select 
          name="duration"
          className={`Profile--dropdown-menu${careerData.duration === "" ? " placeholder" : ""}`}
          defaultValue={careerData.duration}
          onChange={handleCareerData}
        >
          <option value="" disabled>
            일한 기간 선택
          </option>
          {generateDurationOptions()}
        </select>
      </div>

      <button 
        className="Profile--navigate-button"
        disabled={!isDataValid}
        onClick={updateCareerHandler}
        // onClick={console.log(careerData)}
      >
        <span className="h2-18-sb">저장</span>
      </button>
    </div>
  )
}

export default EditCareer;