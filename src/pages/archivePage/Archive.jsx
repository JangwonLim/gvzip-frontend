import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './Archive.css';
import './../../styles/defaultDesign.css';
/* eslint-disable no-unused-vars */
import Card from "../../components/Card/Card";
import Modal from "../../components/ProfileDetail/Modal";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterOption from "../../components/Filter/FilterOption";
import { getInfo } from "../../service/getService";
import { addFilters, clearFilters, deleteFilters, fetchFilters } from "../../redux/store";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import MobileFilterContent from "../../components/Filter/MobileFilterContent";
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';


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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const navigate = useNavigate();

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

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 필터 데이터를 로드합니다.
  // useEffect(() => {
  //   dispatch(fetchFilters());
  // }, [dispatch]);

  // Redux 상태의 필터 데이터를 로컬 상태에 설정합니다.
  useEffect(() => {
    if (filters) {
      console.log("filters: ", filters)
      setFilterData(filters);
      console.log("filterData: ", filterData);
    }
  }, [filters, filterData]);

  /* functions */
  // fetch the archive data from the database

  const fetchArchData = useCallback(async () => {
    if (!hasMore) return;

    setIsLoading(true);

    try {
      console.log(filterData)
      const size = 9;
      const direction = 'ASC';
      const responseData = await getInfo(
        page, size, direction, filterData.searchingWord,
        filterData.membership, filterData.campus, filterData.country,
        filterData.state, filterData.city, filterData.fields
      );

      if (responseData && responseData.isSuccess) {
        const newData = responseData.data;
        setInfo(prevInfo => [...prevInfo, ...newData]);

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
  }, [page, filterData, hasMore]);

  // 필터 데이터나 페이지가 변경될 때마다 fetchArchData 함수 호출
  useEffect(() => {
    fetchArchData();
  }, [fetchArchData, page]);
  
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

  const handleFilterChange = (newFilters) => {
    dispatch(addFilters(newFilters));
    setPage(1); // 새로운 필터가 적용될 때 페이지를 초기화
    setInfo([]); // 기존 데이터를 초기화
    setHasMore(true); // 더 많은 데이터가 있음을 표시
  };

  // clear filter options
  const deleteAllFilters = () => {
    dispatch(clearFilters);
    // fetchArchData();
  }

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

        <button onClick={() => navigate('/member')}>button</button>

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
        onClickFilterOptions={handleFilterChange}
      />
    </div>
  )
}

export default Archive;