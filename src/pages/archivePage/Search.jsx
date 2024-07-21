import React from "react";
import './Archive.css';
import './../../components/SearchBar/SearchBar.css';
import SearchBar from "../../components/SearchBar/SearchBar";

function Search({closeSearch, formData, handleChange, onEnterPress}) {
  return(
    <div className="Search--background">
      <div className="Search--container">
        <button className="Search--button" onClick={closeSearch}/>
        <SearchBar 
          formData={formData} 
          handleChange={handleChange}
          onEnterPress={onEnterPress}
        />
      </div>
    </div>
  )
}

export default Search;