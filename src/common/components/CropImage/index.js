import React, { useState, useEffect, memo } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style.scss';

const CropImage = ({
  title = "Crop Image",
  image,
  width = 380,
  height = 380,
  toggle = () => { },
  onCrop = () => { }
}) => {
  const [src, setSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    width,
    height
  });

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        setSrc(e.target.result);
      }
    }
  }, [image]);

  const onImageLoad = (image) => {
    setImageRef(image);
  }

  const onCropComplete = (crop) => {
    setCrop(crop);
  }

  const handleOnCrop = () => {
    if (imageRef) {
      // console.log(imageRef);
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      onCrop({
        x: crop.x * scaleX,
        y: crop.y * scaleY,
        width: crop.width * scaleX,
        height: crop.height * scaleY
      });
      toggle();
    }
  }

  return (
    <div className="crop-image-modal-container">
      <div className="crop-image-modal">
        <div className="crop-modal-header">
          <span>{title}</span>
        </div>
        <div className="crop-modal-body">
          <ReactCrop
            src={src}
            crop={crop}
            locked
            onImageLoaded={onImageLoad}
            onComplete={onCropComplete}
            onChange={(c) => setCrop(c)}
          />
        </div>
        <div className="crop-modal-footer">
          <button type="button" className="secondary" onClick={toggle}>Cancel</button>
          <button type="button" className="primary" onClick={handleOnCrop}>Crop</button>
        </div>
      </div>
    </div>
  );
}

export default memo(CropImage);