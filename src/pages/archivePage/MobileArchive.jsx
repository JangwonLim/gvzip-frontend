// import React from "react";
// import './Archive.css';
// import '../../defaultDesign.css';

// import SearchBar from "../../components/SearchBar/SearchBar";
// import FilterOption from "../../components/Filter/FilterOption";
// import Card from "../../components/Card/Card";

// function MobileArchive() {
//   const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//   return(
//     <div className="MobileArchive--wrapper">
//       <div className="MobileArchive--container">

//         {/* Filter button and Search Bar */}
//         <div className="MobileArchive--header-container">
//           <button 
//             className="MobileArchive--filter-button"
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
//         <div className="MobileArchive--mid-section-container">
//           <div className="MobileArchive--filter-options-wrapper">
//             <div className="MobileArchive--filter-options-container">
//               {
//                 filterOptions.map(item => 
//                   <FilterOption title={item} setFilterOptions={setFilterOptions} />
//                 )
//               }
//             </div>
            
//             <button className="MobileArchive--filter-options-delete-button">모든 필터 지우기</button>
//           </div>

//           <span 
//             className="b0-10-m"
//             style={{ color: "#66707A"}}
//           >
//             검색결과 N명
//           </span>
//         </div>

//         {/* Cards */}
//         <div className="MobileArchive--cards-container">
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

// export default MobileArchive;