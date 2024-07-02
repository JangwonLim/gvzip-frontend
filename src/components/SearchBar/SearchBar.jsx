import React, {useState} from "react";
import './SearchBar.css';


function SearchBar({isFiltered}) {
  const [isDropdownView, setDropdownView] = useState(false);
  const [title, setTitle] = useState('전체');
  const allOptions = ['국가', '이름', '대학교명']; // All possible options
  const [searchList, setSearchList] = useState([...allOptions]);

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView)
  }

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false)
    }, 200);
  }

  const handleTitle = (newTitle) => {
    setTitle(newTitle);

    if (newTitle === '전체') {
      setSearchList([...allOptions]);
    } else {
      const updatedSearchList = ['전체', ...allOptions.filter(option => option !== newTitle)];
      setSearchList(updatedSearchList);
    }
    
  }

  return (
    <div className={"SearchBar-container" + (isFiltered ? " active" : "")}>
        <button type="submit" className="SearchBar--icon"/>
        <input className="SearchBar--input pc-body fs-16"  placeholder="프로필 검색"/>
    </div> 
  )
}

export default SearchBar;