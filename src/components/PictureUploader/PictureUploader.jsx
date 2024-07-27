import React from 'react';
import './PictureUploader.css';

const PictureUploader = ({picFile, onChangePicture}) => {
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
              className="PictureUploader--preview" 
              style={{
                backgroundImage: `url(${picFile})`,
                cursor: picFile ? "grab" : "pointer"
              }}
            >
              {
                !picFile && (
                  <label htmlFor="file-input" className='PictureUploader--upload-label'>
                    <img 
                      className='PictureUploader--upload-label-picture'
                      alt="img-uploader" 
                      src={require('../../assets/image-uploader.png')}
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