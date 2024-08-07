import React from "react";
import '../../styles/defaultDesign.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function ButtonSelection({formData, handleChange, title, name, list, isMandatory, color}) {
  const handleClick = (event, element) => {
    event.preventDefault(); // 이벤트의 기본 동작 방지
    handleChange({
      target: {
        name: name,
        value: element,
      },
    });
  };

  return (
    <div className="Profile--content-section wide-gap">
      <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
        <span className="b7-16-sb" style={color === "black" ? {} : { color: "#66707A" }}>{title}</span>
        
        {
          isMandatory && (
            <span style={{ color: "#FE3C2A"}}>*</span>
          )
        }
      </div>

      <div className="Profile--button-container">
        {
          list.map((element) => {
            const isSelected = Array.isArray(formData[name]) ? formData[name].includes(element) : formData[name] === element;
            console.log(formData[name]);
            console.log(element);
            return (
            <button
              className={`Profile--button${isSelected ? " selected" : ""}`}
              key={element}
              value={element}
              name={name}
              onClick={(e) => handleClick(e, element)}
            >
              <span className="b7-16-sb">{element}</span>
            </button>
          )})
        }
      </div>
    </div>
  )
}
export default ButtonSelection;