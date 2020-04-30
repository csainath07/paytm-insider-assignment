import React, { useState, useRef, memo } from 'react';
import './style.scss';

const ImageUploader = ({
  getFile = () => { }
}) => {
  //state
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  //input file element reference
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      validateImage(files[0]);
    } else {
      setFile(null);
      getFile(null);
    }
  }

  // validate image resolution is 1024x1024
  const validateImage = (file) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          if (this.width === 1024 && this.height === 1024) {
            getFile(file);
            setError(null);
            setFile(file);
          } else {
            inputRef.current.value = "";
            setError("Image resolution must be 1024x1024");
          }
        }
      }
    } else {
      inputRef.current.value = "";
      setError("Please Select Image!");
    }
  }

  const handleReset = () => {
    inputRef.current.value = "";
    setFile(null);
    getFile(null);
  }

  return (
    <div className="image-upload-container">
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={inputRef}
        onChange={handleFileChange}
      />
      {
        error ?
          <div className="error">
            <p>{error}</p>
          </div> : ''
      }
      {
        !file ?
          <div className="upload-button">
            <button
              type="button"
              className="primary"
              onClick={() => inputRef.current.click()}
            >Upload</button>
            <p className="note"><strong>Note:</strong> Image file (.jpeg, .png) only with 1024x1024 resolution</p>
          </div> :
          <button
            type="button"
            className="secondary"
            onClick={handleReset}
          >Reset</button>
      }
    </div>
  );
}

export default memo(ImageUploader);