import React, { useEffect, useRef } from "react";
import './SearchBar.css';

function SearchBar({openSearch, formData, handleChange, onEnterPress}) {
  const inputRef = useRef(null);

  console.log(formData)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEnterPress();
    }
  };

  return (
    <div className="SearchBar-container" onClick={openSearch}>
      <button type="submit" className="SearchBar--icon"/>
      <input 
        className="SearchBar--input pc-body fs-16"  
        placeholder="프로필 검색"
        name="searchingWord"
        type="search"
        ref={inputRef}
        value={formData.searchingWord}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </div> 
  )
}

export default SearchBar;