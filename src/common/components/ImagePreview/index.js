import React, { useEffect, useRef, memo, useState, useCallback } from 'react';
import CropImage from '../CropImage';
import './style.scss';

const ImagePreview = ({
  image = null,
  width = 380,
  height = 380,
  type = "Gallery",
  getFile = () => { }
}) => {
  const [dataUrlImage, setDataUrlImage] = useState(null);
  const [openCropModal, toggleModal] = useState(false);

  const canvas = useRef(null);

  const setPreview = useCallback((img, x, y, cropWidth, cropHeight, canvas) => {
    const dataUriToFile = (dataUri = null) => {
      if (dataUri && dataUri.split(',')[0].indexOf('base64') >= 0) {
        const byteString = window.atob(dataUri.split(',')[1]);
        let ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], { type: 'image/jpeg' });
        return new File([blob], `img_${type}_${new Date().getTime()}_${width}x${height}.jpg`, { type: "image/jpeg" });
      }
    }
    const ctx = canvas.current.getContext('2d');
    ctx.drawImage(
      img,
      x,
      y,
      cropWidth,
      cropHeight,
      0,
      0,
      width,
      height
    );
    const dataUri = canvas.current.toDataURL("image/jpeg", 1.0);
    const file = dataUriToFile(dataUri);
    getFile({ file, key: `${width}x${height}` });
    // eslint-disable-next-line
  }, [width, height, type]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        setPreview(img, 0, 0, width, height, canvas);
        setDataUrlImage(img);
      }
    } else {
      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
    }
    // eslint-disable-next-line
  }, [image, width, height]);

  const handleCropChange = (crop) => {
    setPreview(dataUrlImage, crop.x, crop.y, crop.width, crop.height, canvas);
  }

  return (
    <div className="image-preview-container">
      <span className="image-resolution">{width} x {height}</span>
      <canvas
        width={width}
        height={height}
        ref={canvas}
      />
      {
        openCropModal ?
          <CropImage
            width={width}
            height={height}
            onCrop={handleCropChange}
            image={image}
            toggle={() => toggleModal(!openCropModal)} /> : ''
      }
      {
        image ?
          <div className="crop-option-overlay">
            <button type="button" className="primary" onClick={() => toggleModal(!openCropModal)}>
              resize
            </button>
          </div> : ''
      }
    </div>
  );
}

export default memo(ImagePreview);