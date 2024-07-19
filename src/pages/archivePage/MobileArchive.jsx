// import React from "react";
// import './Archive.css';
// import '../../defaultDesign.css';

// import SearchBar from "../../components/SearchBar/SearchBar";
// import FilterOption from "../../components/Filter/FilterOption";
// import Card from "../../components/Card/Card";

// function Archive() {
//   const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//   return(
//     <div className="Archive--wrapper">
//       <div className="Archive--container">

//         {/* Filter button and Search Bar */}
//         <div className="Archive--header-container">
//           <button 
//             className="Archive--filter-button"
//           >
//             <img
//               alt="filter-button"
//               src={require('../../assets/archive-filter-button.png')}
//             />
//             <span 
//               className="b1-12-m" 
//               style={{ color: "#2f2f2f"}}
//             >
//               필터
//             </span>
//           </button>

//           <SearchBar />
//         </div>

//         {/* Filter Options */}
//         <div className="Archive--mid-section-container">
//           <div className="Archive--filter-options-wrapper">
//             <div className="Archive--filter-options-container">
//               {
//                 filterOptions.map(item => 
//                   <FilterOption title={item} setFilterOptions={setFilterOptions} />
//                 )
//               }
//             </div>
            
//             <button className="Archive--filter-options-delete-button">모든 필터 지우기</button>
//           </div>

//           <span 
//             className="b0-10-m"
//             style={{ color: "#66707A"}}
//           >
//             검색결과 N명
//           </span>
//         </div>

//         {/* Cards */}
//         <div className="Archive--cards-container">
//           {
//             info.map((item, i) => {
//               return (
//                 <Card 
//                   key={i} 
//                   data={item}
//                   setModal={setModal} 
//                   setModalInfo={setModalInfo}
//                 />
//               )
//             })
//           }
//         </div>

//         { isLoading && <p>Loading...</p> }
//         <Pagination page={page} totalPages={totalPages} handlePageClick={handlePageClick} isFiltered={isFiltered} />
//       </div>

//       { modal && (
//         <div className="Archive--modal-backdrop" onClick={closeModal}>
//             <Modal info={modalInfo} setModal={setModal}/>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Archive;