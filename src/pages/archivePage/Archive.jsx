import React, { useState, useEffect, useMemo } from "react";
import './Archive.css';
import './../../styles/defaultDesign.css';
/* eslint-disable no-unused-vars */
import Card from "../../components/Card/Card";
import Modal from "../../components/ProfileDetail/Modal";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterOption from "../../components/Filter/FilterOption";
import { getInfo } from "../../service/getService";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import MobileFilterContent from "../../components/Filter/MobileFilterContent";
import debounce from 'lodash.debounce';
import Search from "./Search";
import NoResult from "./NoResult";
import { useAuth } from "../../utils/AuthContext";
import PopUp from "../../components/PopUp/PopUp";


function Archive() {
  const [filterOptions, setFilterOptions] = useState([]);
  const [info, setInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [totalNumber, setTotalNumber] = useState(0);

  const { isAuthenticated, loading } = useAuth();

  const initialFilterData = {
    searchingWord: "",
    membership: [],
    campus: [],
    country: "",
    state: "",
    city: "",
    fields: ""
  };

  const [filterData, setFilterData] = useState(initialFilterData);

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

  const resetFilter = () => {
    setFilterData(initialFilterData);
  }

  const contentProps = {
    data: filterData,
    handleChange: handleChange
  }

  /* functions */
  // fetch the archive data from the database
  const fetchArchData = useMemo(
    () => debounce(async (page, filterData) => {
      if (!hasMore) return;

      setIsLoading(true);

      try {
        const size = 9;
        const direction = 'ASC';
        const responseData = await getInfo(
          page, size, direction, filterData.searchingWord,
          filterData.membership, filterData.campus, filterData.country,
          filterData.state, filterData.city, filterData.fields
        );

        if (responseData && responseData.isSuccess) {
          const newData = responseData.data.profiles;
          setInfo(prevInfo => [...prevInfo, ...newData]);
          setTotalNumber(responseData.data.totalElements);

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
    }, 300),
    [hasMore]
  );

  useEffect(() => {
    fetchArchData(page, filterData);
  }, [fetchArchData, page, filterData]);
  
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1 && !isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 100);
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  // close the modal
  const closeModal = (e) => {
    if (e.target.className === 'Archive--modal-backdrop') {
      setModal(false);
    }
  };

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleFilterChange = () => {
    setPage(1); // 새로운 필터가 적용될 때 페이지를 초기화
    setInfo([]); // 기존 데이터를 초기화
    setHasMore(true); // 더 많은 데이터가 있음을 표시
    setIsBottomSheetOpen(false); // 바텀시트 닫음

    Object.values(filterData).forEach((value) => {
      if (Array.isArray(value)) {
        value.map(item => setFilterOptions((prevFilterData) => [...prevFilterData, item]))
      } else if (value) {
        setFilterOptions((prevFilterData) => [...prevFilterData, value]);
      }
    })
  };

  const clearAllFilters = () => {
    setPage(1); // 새로운 필터가 적용될 때 페이지를 초기화
    setInfo([]); // 기존 데이터를 초기화
    setHasMore(true); // 더 많은 데이터가 있음을 표시
    setFilterData(initialFilterData);
    setFilterOptions([]);
  };

  const toggleSearch = () => {
    setSearch(!search);
  }

  const handleEnterPress = () => {
    setSearch(false);
    setPage(1); // 새로운 필터가 적용될 때 페이지를 초기화
    setInfo([]); // 기존 데이터를 초기화
    setHasMore(true); // 더 많은 데이터가 있음을 표시
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="Archive--popup-backdrop">
        <PopUp purpose={"로그인"} />
      </div>
    );
  }

  return(
    <>
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

            <SearchBar 
              openSearch={toggleSearch}
              formData={filterData} 
              handleChange={handleChange}
            />
          </div>

          {/* Filter Options */}
          <div className="Archive--mid-section-container">
            <div className="Archive--filter-options-wrapper">
              <div className="Archive--filter-options-container">
                {
                  filterOptions.length > 0 && (
                    filterOptions.map((item, index) => (
                      <FilterOption 
                        title={item} 
                        setFilterOptions={setFilterOptions}
                        setFilterData={setFilterData}
                        setPage={setPage}
                        setInfo={setInfo}
                        setHasMore={setHasMore}
                      />
                    ))
                  )
                }
              </div>
              {
                (filterOptions.length > 0) && (
                  <button 
                    onClick={clearAllFilters}
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
              검색결과 {totalNumber}명
            </span>
          </div>

          {/* Cards */}
          <div className="Archive--cards-container">
            {
              isLoading ? (
                <p>Loading...</p>
              ) : (
                (filterData.searchingWord.length > 0 && info.length === 0) ? (
                  <NoResult searchingWord={filterData.searchingWord}/>
                ) : (
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
                )
            )}
          </div>

        </div>
      
        {/* Modal */}
        { modal && (
          <div className="Archive--modal-backdrop" onClick={closeModal}>
            <Modal info={modalInfo} setModal={setModal}/>
          </div>
        )}

        {
          isBottomSheetOpen && (
            <BottomSheet
              Content={MobileFilterContent}
              isBottomSheetOpen={isBottomSheetOpen}
              closeBottomSheet={closeBottomSheet}
              contentProps={contentProps}
              onClickFilterOptions={handleFilterChange}
              resetFilter={resetFilter}
            />
          )
        }
      </div>

      {
        search && (
          <Search 
            closeSearch={toggleSearch}
            formData={filterData}
            handleChange={handleChange}
            onEnterPress={handleEnterPress}
          />
        )
      }

      { 
        !isAuthenticated && (
          <div className="Archive--popup-backdrop">
            <PopUp purpose={"로그인"}/>
          </div>
        )
      }
    </>
  )
}

export default Archive;