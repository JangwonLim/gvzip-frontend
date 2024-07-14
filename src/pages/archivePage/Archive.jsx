import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './Archive.css';
import './../../styles/defaultDesign.css';
/* eslint-disable no-unused-vars */
import Dropdown from "../../components/Filter/Dropdown";
import Card from "../../components/Card/Card";
import Modal from "../../components/ProfileDetail/Modal";
import Button from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import FilterOption from "../../components/Filter/FilterOption";
import { getInfo } from "../../service/getService";
import { addFilters, clearFilters, deleteFilters, fetchFilters } from "../../redux/store";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import MobileFilterContent from "../../components/Filter/MobileFilterContent";


function Archive() {
  const [membership, setMembership] = useState([]);
  const [campus, setCampus] = useState(null);
  const [fields, setFields] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [info, setInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFilter] = useState(false);
  const [animating, setAnimating] = useState(false);
  // const [hasMore, setHasMore] = useState(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [filterData, setFilterData] = useState({
    searchingWord: "",
    membership: [],
    campus: [],
    country: "",
    state: "",
    city: "",
    fields: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    // let newValue = "";
    

    setFilterData((prevState) => {
      const currentField = prevState[name];
      // if (name === "membership" && value === "동문") {
      //   newValue = "true";
      //   value = newValue;
      // } else if (name === "membership" && value === "인기모") {
      //   newValue = "false";
      //   value = newValue;
      // }
      if (Array.isArray(currentField)) {
        // 배열인 경우
        return {
          ...prevState,
          [name]: currentField.includes(value)
            ? currentField.filter((item) => item !== value)
            : [...currentField, value],
        };
      } else {
        // 단수 값인 경우
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  useEffect(() => {
    console.log(filterData);
  }, [filterData])

  const contentProps = {
    data: filterData,
    handleChange: handleChange
  }

  /* redux */
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filter.filters);

  /* functions */
  // fetch the archive data from the database
  const fetchArchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const size = 9; // default
      const direction = 'ASC'; // default
      const responseData = await getInfo(
        page, size, direction, filterData.searchingWord,
        filterData.membership, filterData.campus, filterData.country,
        filterData.state, filterData.city, filterData.fields
      );
      /* need to implement setting the total page */
      // if (isFiltered) {
      //   setInfo(responseData.data);
      // } else {
      //   setInfo(prevInfo => [...prevInfo, ...responseData.data]);
      // }

      console.log(responseData)
      if (responseData.data.message === "Success") {
        setInfo(prevInfo => [...prevInfo, ...responseData.data]);
      }
    } catch (error) {
      console.error('Failed to fetch data. Please try again later: ', error);
    } finally {
      setIsLoading(false);
    }    
  }, [page, filterData.searchingWord, filterData.membership, filterData.campus, filterData.country, filterData.state, filterData.city, filterData.fields]);

  // close the modal
  const closeModal = (e) => {
    if (e.target.className === 'Archive--modal-backdrop') {
      setModal(false);
    }
  };

  // set the current page
  const handlePageClick = (currPage) => {
    setPage(currPage-1);
  };

  // Filter animation
  const handleFilterClick = () => {
    if (isFiltered) {
      setAnimating(true);
      setTimeout(() => {
        setIsFilter(false);
        setAnimating(false);
      }, 300);
    } else {
      setIsFilter(true);
    }
  }

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // toggle filter options
  const onClickFilterOptions = (newOption) => {
    if (filters.includes(newOption)) {
      dispatch(deleteFilters(newOption));
    } else {
      dispatch(addFilters(newOption));
    }
  };

  // clear filter options
  const deleteAllFilters = () => {
    dispatch(clearFilters)
  }

  useEffect(() => {
    fetchArchData();
  }, [fetchArchData]);

  // ************** 6/10 필터 redux랑 연결시키는 거 하고 있었음
  // useEffect(() => {
  //   console.log(filters)
  // }, [filters])

  return(
    // <div>
    //   <div>          
    //     <div className="Archive--content-wrapper">
    //       { 
    //         (isFiltered || animating) &&
    //         <div>
    //           <div className={"Archive--filter-animation" + (!animating ? " slideIn" : " slideOut")}>
    //             <Dropdown 
    //             handleFilterClick={handleFilterClick}
    //             onClickFilterOptions={onClickFilterOptions}
    //             className="Archive--filter"/>
    //           </div>
    //         </div>
    //       }
          
    //       <div className={ "Archive--content-container" + (animating ? " active" : "") }>
    //         <div className={"Archive--header" + (filterOptions.length > 0 ? " filtered" : "")}>
    //           {
    //             !isFiltered &&
    //               <Button
    //                 radius="30px"
    //                 color="black"
    //                 bg="#d9d9d9"
    //                 width="124px"
    //                 height="52px"
    //                 padding="0"
    //                 margin="0 96px 0 0"
    //                 onClick={handleFilterClick}
    //               >
    //                 <div className="Archive--header-filter-container">
    //                   <img className="Archive--header-filter" src={require('./../../img/filter.png')} alt="filter"/>
    //                   <span className="pc-subtitle fs-16">필터</span>
    //                 </div>
    //               </Button>
    //           }
    //           <SearchBar isFiltered={isFiltered}/>
    //           <Button
    //             radius="30px"
    //             color="black"
    //             bg="#d9d9d9"
    //             width="130px"
    //             height="52px"
    //             padding="0"
    //             margin="0 0 0 20px"
    //           ></Button>
    //         </div>
            
    //         {
    //           (filterOptions.length > 0) && 
    //           <div className="Archive--filter-options">
    //             <div className="Archive--filter-options-wrapper">
    //               {
    //                 filterOptions.map(item => 
    //                   <FilterOption title={item} setFilterOptions={setFilterOptions} />
    //                 )
    //               }
    //             </div>

    //             <button className="Archive--filter-reset">
    //               <span className="Archive--filter-reset-content">모든 필터 지우기</span>
    //             </button>
    //           </div>
    //         }

    //         <div className="Archive--results-number">
    //           <span className="Archive--filter-reset-content">검색결과 {}명</span>
    //         </div>

    //         <div className="Archive--cards">
    //           {
    //             info.map(function(item, i) {
    //               return (
    //                 <Card 
    //                 key={i} 
    //                 data={item}
    //                 setModal={setModal} 
    //                 setModalInfo={setModalInfo}
    //                 />
    //               )
    //             })
    //           }
    //         </div>

    //         { isLoading && <p>Loading...</p> }
    //         <Pagination page={page} totalPages={totalPages} handlePageClick={handlePageClick} isFiltered={isFiltered} />
            
    //       </div>              
    //     </div>
    //     { modal && (
    //       <div className="Archive--modal-backdrop" onClick={closeModal}>
    //           <Modal info={modalInfo} setModal={setModal}/>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="MobileArchive--wrapper">
      <div className="MobileArchive--container">

        {/* Filter button and Search Bar */}
        <div className="MobileArchive--header-container">
          <button 
            className="MobileArchive--filter-button"
            onClick={openBottomSheet}
          >
            <img
              alt="filter-button"
              src={require('../../assets/archive-filter-button.png')}
            />
            <span 
              className="b1-12-m" 
              style={{ color: "#2f2f2f"}}
            >
              필터
            </span>
          </button>

          <SearchBar />
        </div>

        {/* Filter Options */}
        <div className="MobileArchive--mid-section-container">
          <div className="MobileArchive--filter-options-wrapper">
            <div className="MobileArchive--filter-options-container">
              {
                filterOptions.map(item => 
                  <FilterOption title={item} setFilterOptions={setFilterOptions} />
                )
              }
            </div>
            {
              (filterOptions.length > 0) && (
                <button 
                  onClick={deleteAllFilters}
                  className="MobileArchive--filter-options-delete-button"
                >
                  모든 필터 지우기
                </button>
              )
            }
            
          </div>

          <span 
            className="b0-10-m"
            style={{ color: "#66707A"}}
          >
            검색결과 {info.length}명
          </span>
        </div>

        {/* Cards */}
        <div className="MobileArchive--cards-container">
          {
            info.map((item, i) => {
              return (
                <Card 
                  key={i} 
                  data={item}
                  setModal={setModal}
                  setModalInfo={setModalInfo}
                />
              )
            })
          }
        </div>

        { isLoading && <p>Loading...</p> }

        {/* Pagination */}
        <Pagination 
          page={page} 
          totalPages={totalPages} 
          handlePageClick={handlePageClick} 
          isFiltered={isFiltered} 
        />
      </div>
      
      {/* Modal */}
      { modal && (
        <div className="Archive--modal-backdrop" onClick={closeModal}>
          <Modal info={modalInfo} setModal={setModal}/>
        </div>
      )}

      <BottomSheet
        Content={MobileFilterContent}
        isBottomSheetOpen={isBottomSheetOpen}
        closeBottomSheet={closeBottomSheet}
        contentProps={contentProps}
      />
    </div>
  )
}

export default Archive;