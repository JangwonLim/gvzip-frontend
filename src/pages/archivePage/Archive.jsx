import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './Archive.css';
import './../../styles/defaultDesign.css';
/* eslint-disable no-unused-vars */
import Dropdown from "../../components/Filter/Dropdown";
import Card from "../../components/Card/Card";
import Modal from "../../components/ProfileDetail/Modal";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import FilterOption from "../../components/Filter/FilterOption";
import { getInfo } from "../../service/getService";
import { addFilters, clearFilters, deleteFilters, fetchFilters } from "../../redux/store";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import MobileFilterContent from "../../components/Filter/MobileFilterContent";


function Archive() {
  const [filterOptions, setFilterOptions] = useState([]);
  const [info, setInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
    

    setFilterData((prevState) => {
      const currentField = prevState[name];
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
    if (!hasMore) return;
    
    setIsLoading(true);

    try {
      const size = 9; // default
      const direction = 'ASC'; // default
      const responseData = await getInfo(
        page, size, direction, filterData.searchingWord,
        filterData.membership, filterData.campus, filterData.country,
        filterData.state, filterData.city, filterData.fields
      );

      if (responseData.message === "Success") {
        const newData = responseData.data;
        setInfo(prevInfo => [...prevInfo, ...newData]);

        // Check if more data is available
        if (newData.length < size) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch data. Please try again later: ', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }    
  }, [page, filterData.searchingWord, filterData.membership, filterData.campus, filterData.country, filterData.state, filterData.city, filterData.fields, hasMore]);

  // infinite scroll feature
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  // close the modal
  const closeModal = (e) => {
    if (e.target.className === 'Archive--modal-backdrop') {
      setModal(false);
    }
  };

  // set the current page
  const handlePageClick = (currPage) => {
    setPage(currPage);
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

  return(
    <div className="Archive--wrapper">
      <div className="Archive--container">

        {/* Filter button and Search Bar */}
        <div className="Archive--header-container">
          <button 
            className="Archive--filter-button"
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
        <div className="Archive--mid-section-container">
          <div className="Archive--filter-options-wrapper">
            <div className="Archive--filter-options-container">
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
                  className="Archive--filter-options-delete-button"
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
        <div className="Archive--cards-container">
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