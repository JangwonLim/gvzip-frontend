import React from "react";
import '../../styles/defaultDesign.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function Year({formData, handleChange, options, title, placeholder}) {
  const getSelectProps = (title) => {
    switch (title) {
      case "졸업년도":
        return {
          name: "graduationYear",
          className: `Profile--dropdown-menu${formData.graduationYear === "" ? " placeholder" : ""}`,
          value: formData.graduationYear,
          onChange: handleChange,
        };
      case "입학년도":
        return {
          name: "entranceYear",
          className: `Profile--dropdown-menu${formData.entranceYear === "" ? " placeholder" : ""}`,
          value: formData.entranceYear,
          onChange: handleChange,
        };
      case "졸업 예정년도":
        return {
          name: "expectedGraduationYear",
          className: `Profile--dropdown-menu${formData.expectedGraduationYear === "" ? " placeholder" : ""}`,
          value: formData.expectedGraduationYear,
          onChange: handleChange,
        };
      default:
        return {};
    }
  };

  const selectProps = getSelectProps(title);

  // console.log(selectProps)

  return (
    <div className="Profile--content-section wide-gap">
      <div>
        <span className="b7-16-sb" style={{ color: "#66707A"}}>{title} </span>
        <span style={{ color: "#FE3C2A"}}>*</span>
      </div>

      <select {...selectProps}>
        <option value={0} disabled>
          {placeholder}
        </option>
        {options()}
      </select>
    </div>
  )
}

export default Year;