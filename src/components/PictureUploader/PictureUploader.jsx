import React, { useState, useRef, useEffect } from 'react';
import './PictureUploader.css';

const PictureUploader = ({picFile, onChangePicture}) => {
    // const [isDragging, setIsDragging] = useState(false);
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    // const containerRef = useRef(null);

    // const handleMouseDown = (e) => {
    //   if (picFile) {
    //       setIsDragging(true);
    //       setStartPosition({
    //           x: e.clientX - position.x,
    //           y: e.clientY - position.y
    //       });
    //   }
    // };

    // const handleMouseMove = (e) => {
    //     if (isDragging) {
    //         const container = containerRef.current;
    //         const containerRect = container.getBoundingClientRect();
    //         const newX = e.clientX - startPosition.x;
    //         const newY = e.clientY - startPosition.y;

    //         // Calculate max allowed positions to keep image within bounds
    //         const minX = containerRect.width - containerRect.width * 1.5; 
    //         const minY = containerRect.height - containerRect.height * 1.5;

    //         const restrictedX = Math.max(Math.min(newX, 0), minX);
    //         const restrictedY = Math.max(Math.min(newY, 0), minY);

    //         setPosition({
    //           x: restrictedX,
    //           y: restrictedY
    //         });
    //     }
    // };

    // const handleMouseUp = () => {
    //     setIsDragging(false);
    // };

    // useEffect(() => {
    //     if (isDragging) {
    //         document.addEventListener('mousemove', handleMouseMove);
    //         document.addEventListener('mouseup', handleMouseUp);
    //     } else {
    //         document.removeEventListener('mousemove', handleMouseMove);
    //         document.removeEventListener('mouseup', handleMouseUp);
    //     }

    //     return () => {
    //         document.removeEventListener('mousemove', handleMouseMove);
    //         document.removeEventListener('mouseup', handleMouseUp);
    //     };
    // }, [isDragging]);
// 
    // const handleLabelClick = (e) => {
    //     if (picFile) {
    //         e.preventDefault(); // Prevent file input click if there's already an image
    //     }
    // };

    return (
        <div className="PictureUploader--container">
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
          />

          <label htmlFor="file-input">
            <div 
              // htmlFor='file-input'
              className="PictureUploader--preview" 
              // ref={containerRef}
              // onClick={handleLabelClick}
              // onMouseDown={handleMouseDown} 
              style={{
                backgroundImage: `url(${picFile})`,
                cursor: picFile ? "grab" : "pointer"
              }}
            >
              {
                !picFile && (
                  <label htmlFor="file-input" className='PictureUploader--upload-label'>
                    <img 
                      alt="camera-icon" 
                      src={require('../../assets/camera-icon.png')}
                    />
                  </label>
                )

              }
            </div>
          </label>
        </div>
    );
};

export default PictureUploader;