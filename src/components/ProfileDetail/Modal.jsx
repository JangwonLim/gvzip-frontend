import React from "react";
import './Modal.css';
import '../../styles/defaultDesign.css';
import { handleCopyClipBoard } from "../../utils/usefulFunctions";

function Modal({info, setModal, setToast}) {

  const closeModal = () => {setModal(false)}

  const membership = () => {
    if (info.alumniType === 0) {
      return "졸업생";
    } else {
      return "인기모";
    }
  }

  const copyLink = (e) => {
    handleCopyClipBoard(e.target.textContent);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 500);
  }

  const fields = [info.field1 ?? '', info.field2 ?? '', info.field3 ?? ''].filter(Boolean).join(', ');;
  const location = [info.city ?? '', info.country ?? ''].filter(Boolean).join(', ');

  return(
    // <div className="Modal--container">
    //   <div className="Modal--header">
    //     <div className="Modal--close-button-container">
    //       <button 
    //         className="Modal--close-button" 
    //         onClick={closeModal}
    //       />
    //     </div>

    //     <div className="Modal--profile-picture-container">
    //       <img 
    //         className="Modal--profile-picture"
    //         src={info.profileImageURL}
    //         alt="profile-pic"
    //       />
    //     </div>
        
    //     <span 
    //       className="b0-10-m"
    //       style={{ color: "#2B3744" }}
    //     >{info.email}</span>

        //   <div 
        //   onClick={(e) => handleCopyClipBoard(e.target.textContent)}
        //   className="Modal--profile-header-link">
        //     <div className="Modal--profile-header-link-button"/>
        //     <span 
        //       className="b0-10-m link"
        //       style={{ color: "#2B3744"}}
        //     >
        //       https://music.youtube.com/watch?v=wHvgzbXpeL0
        //     </span>
        // </div>
    //   </div>

    //   <div className="Modal--content-container">

    //     {/* basic info */}
    //     <div className="Modal--basic-info">
    //       <span className="b0-10-m">{info.campus} {info.generation}회 {membership()}</span>

    //       <div className="Modal--basic-info narrow-gap">
    //         <span className="b7-16-sb">{info.korName} | {info.engName}</span>

    //         <span className="b1-12-m">{info.introduction}</span>
    //       </div>

    //       <div className="Modal--basic-info narrow-gap margin">
    //         <div className="Modal--basic-info narrow-gap row grey-text center">
    //           <img 
    //             className="Modal--basic-info-icon"
    //             src={require("../../assets/modal-job-icon.png")} 
    //             alt="job" 
    //           />
    //           <span className="b1-12-m">
    //             {fields}
    //           </span>
    //         </div>

    //         <div className="Modal--basic-info narrow-gap row grey-text center">
    //           <img 
    //             className="Modal--basic-info-icon"
    //             src={require("../../assets/modal-location-icon.png")} 
    //             alt="location" 
    //           />
    //           <span className="b1-12-m">
    //             {location}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
        
    //     {/* additional info */}
    //     {
    //       (info.educations.length > 0 || info.careers.length > 0) && (
    //         <div className="Modal--additional-info">

    //           {/* education */}
    //           { 
    //             info.educations.length > 0 && (
    //               <div className="Modal--basic-info">
    //                 <span  
    //                   className="Modal--addtional-info-title"
    //                 >
    //                   학력
    //                 </span>
    //                 {
    //                   info.educations.map((item, index) => {
    //                     return (
    //                       <div className="Modal--education-content">
    //                         <span 
    //                           className="Modal--additional-info-title black-text"
    //                         >
    //                           {item.schoolName}
    //                         </span>
    //                         <span 
    //                           className="b1-12-m"
    //                           style={{ color: "#A8B3BD" }}
    //                         >
    //                           {item.degree} {item.status} | {item.major}
    //                         </span>
    //                       </div>
    //                     )
    //                   })
    //                 }
    //               </div>
    //             )
    //           }
              
    //           {/* careers */}
    //           {
    //             info.careers.length > 0 && (
    //               <div className="Modal--basic-info">
    //                 <span  
    //                   className="Modal--addtional-info-title"
    //                 >
    //                   경력/경험
    //                 </span>

    //                 {
    //                   info.careers.map((item, index) => {
    //                     return (
    //                       <div className="Modal--education-content">
    //                         <span
    //                           className="Modal--additional-info-title black-text"
    //                         >
    //                           {item.companyName} | {item.position}
    //                         </span>
    //                         <span
    //                           className="b1-12-m"
    //                           style={{ color: "#A8B3BD" }}
    //                         >
    //                           {item.startYear}년 · {item.duration}년
    //                         </span>
    //                       </div>
    //                     )
    //                   })
    //                 }
    //               </div>
    //             )
    //           }
    //         </div>
    //       )
    //     }
    //   </div>
    // </div>
  <div className="Modal--container">
    <div className="Modal--header">
      <div className="Modal--close-button-container">
        <button 
          className="Modal--close-button" 
          onClick={closeModal}
        />
      </div>

      <div className="Modal--profile-picture-container">
        <img 
          className="Modal--profile-picture"
          src={info.profileImageURL || require("./../../assets/profile-pic-11.png")}
          alt="profile-pic"
        />
      </div>
      
      <div className="Modal--profile-header-content">
        <span 
          className="b0-10-m"
          style={{ color: "#2B3744" }}
        >
          {info.email}
        </span>
        
        {
          info.sns.length === 0 && (
            <div style={{ width: "auto", height: "19px"}}/>
          )
        }

        {
          info.sns.length > 0 && (
            <div 
              onClick={(e) => copyLink(e)}
              className="Modal--profile-header-link">
              <div className="Modal--profile-header-link-button"/>
              <span 
                className="b0-10-m link"
                style={{ color: "#2B3744"}}
              >
                {info.sns}
              </span>
            </div>
          )
        }
      </div>
    </div>

    <div className="Modal--content-container">

      {/* basic info */}
      <div className="Modal--basic-info">
        <span className="b0-10-m">{info.campus} {info.generation}회 {membership()}</span>

        <div className="Modal--basic-info narrow-gap">
          <span className="b7-16-sb">{info.korName} | {info.engName}</span>

          <span className="b1-12-m">{info.introduction}</span>
        </div>

        <div className="Modal--basic-info narrow-gap margin">
          <div className="Modal--basic-info narrow-gap row grey-text center">
            <img 
              className="Modal--basic-info-icon"
              src={require("../../assets/modal-job-icon.png")} 
              alt="job" 
            />
            <span className="b1-12-m">
              {fields}
            </span>
          </div>

          <div className="Modal--basic-info narrow-gap row grey-text center">
            <img 
              className="Modal--basic-info-icon"
              src={require("../../assets/modal-location-icon.png")} 
              alt="location" 
            />
            <span className="b1-12-m">
              {location}
            </span>
          </div>
        </div>
      </div>
      
      {/* additional info */}
      {
        (info.educations.length > 0 || info.careers.length > 0) && (
          <div className="Modal--additional-info">

            {/* education */}
            { 
              info.educations.length > 0 && (
                <div className="Modal--basic-info">
                  <span  
                    className="Modal--addtional-info-title"
                  >
                    학력
                  </span>
                  {
                    info.educations.map((item, index) => {
                      return (
                        <div className="Modal--education-content" key={index}>
                          <span 
                            className="Modal--additional-info-title b4-14-sb"
                          >
                            {item.schoolName}
                          </span>
                          <span
                            className="b1-12-m"
                          >
                            {item.major}
                          </span>
                          <span 
                            className="b1-12-m"
                            style={{ color: "#A8B3BD" }}
                          >
                            {item.degree} · {item.status}
                          </span>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
            
            {/* careers */}
            {
              info.careers.length > 0 && (
                <div className="Modal--basic-info">
                  <span  
                    className="Modal--addtional-info-title"
                  >
                    경력/경험
                  </span>
                  {
                    info.careers.map((item, index) => {
                      return (
                        <div className="Modal--education-content" key={index}>
                          <span
                            className="Modal--additional-info-title b4-14-sb"
                          >
                            {item.companyName}
                          </span>
                          <span className="b1-12-m">
                            {item.position}
                          </span>
                          <span
                            className="b1-12-m"
                            style={{ color: "#A8B3BD" }}
                          >
                            {item.startYear}년 · {item.duration}
                          </span>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        )
      }
    </div>
  </div>
  )
}

export default Modal;