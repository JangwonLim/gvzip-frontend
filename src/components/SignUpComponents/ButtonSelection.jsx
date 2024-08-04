import React from "react";
import '../../styles/defaultDesign.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function ButtonSelection({formData, handleChange, title, name, list, isMandatory, color}) {
  return (
    <div className="Profile--content-section wide-gap">
      <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
        {
          title === "멤버십" && (
            <img 
              style={{ height: "16px", width: "16px", marginTop: "2px" }}
              src={require('../../assets/filter-membership.png')} 
              alt={name}
            />
          )
        }
        {
          title === "캠퍼스" && (
            <img 
              style={{ height: "16px", width: "16px", marginTop: "2px" }}
              src={require('../../assets/filter-campus.png')} 
              alt={name} 
            />
          )
        }
        <span className="b7-16-sb" style={color === "black" ? {} : { color: "#66707A" }}>{title}</span>
        
        {
          isMandatory && (
            <span style={{ color: "#FE3C2A"}}>*</span>
          )
        }
      </div>

      <div className="Profile--button-container">
        {
          list.map((element) => (
            <button
              className={"Profile--button" + ((Array.isArray(formData[name]) ? formData[name].includes(element) : formData[name] === element) ? " selected" : "")}
              key={element}
              defaultValue={element}
              name={name}
              onClick={handleChange}
            >
              <span className="b7-16-sb">{element}</span>
            </button>
          ))
        }
      </div>
    </div>
  )
}
export default ButtonSelection;

// function Campus({formData, handleChange, title}) {
//   const campusList = ['음성', '문경', '미국'];

//   return (
//     <div className="Profile--content-section wide-gap">
//       <div>
//         <span className="b7-16-sb" style={{ color: "#66707A"}}>{title} </span>
//         <span style={{ color: "#FE3C2A"}}>*</span>
//       </div>

//       <div className="Profile--button-container">
//         {
//           campusList.map((element) => (
//             <button
//               className={"Profile--button" + (formData.campus === element ? " selected" : "")}
//               key={element}
//               value={element}
//               name="campus"
//               onClick={handleChange}
//             >
//               <span className="b7-16-sb">{element}</span>
//             </button>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default Campus;