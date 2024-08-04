import React from "react";
import '../../styles/defaultDesign.css';
import '../../pages/authenticate/SignUp/ProfileInfo.css';

function DateOfBirth({formData, handleBornYearChange, handleBornMonthChange, handleBornDayChange}) {
  return (
    <div className="Profile--content-section narrow-gap">
      <div>
        <span className="b7-16-sb" style={{ color: "#66707A"}}>생년월일 </span>
        <span style={{ color: "#FE3C2A"}}>*</span>
      </div>

      <div className="Profile--content-section narrow-gap row">
        <input 
          className="Profile--text-input-box center"
          placeholder="YYYY" 
          type="text" 
          minLength="4"
          maxLength="4" 
          pattern="^\d{4}$"
          name="bornYear"
          defaultValue={formData.bornYear}
          onChange={handleBornYearChange}
        />
        <input 
          className="Profile--text-input-box center" 
          placeholder="MM" 
          type="text" 
          minLength="2"
          maxLength="2"
          pattern="^(0[1-9]|1[0-2])$"
          name="bornMonth"
          defaultValue={formData.bornMonth}
          onChange={handleBornMonthChange}
        />
        <input 
          className="Profile--text-input-box center" 
          placeholder="DD" 
          type="text" 
          minLength="2"
          maxLength="2" 
          pattern="^(0[1-9]|[12][0-9]|3[01])$"
          name="bornDay"
          defaultValue={formData.bornDay}
          onChange={handleBornDayChange}
        />
      </div>
    </div>
  )
}

export default DateOfBirth;