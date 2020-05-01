import React, { useState } from 'react';
import { ImageUploader, ImagePreview, Loading } from '../../common/components';
import { useHistory } from 'react-router-dom';

const Home = () => {
  //state
  const [selectedFile, setFile] = useState(null);
  const [files, setFiles] = useState({});
  const [error, toggleError] = useState(false);
  const [isLoading, toggleLoading] = useState(false);
  const history = useHistory();

  const sizes = [{
    type: "Gallery",
    width: 380,
    height: 380
  }, {
    type: "Horizontal",
    width: 755,
    height: 450
  }, {
    type: "Vertical",
    width: 365,
    height: 450
  }, {
    type: "HorizontalSmall",
    width: 365,
    height: 212
  }];

  const handleFileChange = (file) => {
    setFile(file);
  }

  const handleSaveImages = async () => {
    toggleLoading(true);
    try {
      const fd = new FormData();
      for (let key in files) {
        fd.append("images", files[key]);
      }
      const response = await fetch('http://localhost:8000/api/file/upload', {
        method: 'post',
        body: fd
      });
      const { data } = await response.json();
      toggleError(false);
      history.push({
        pathname: '/success',
        state: data
      });
    } catch (err) {
      toggleError(true);
      toggleLoading(false);
    }
  }

  return (
    <div className="home-container">
      {
        isLoading ?
          <Loading text="Uploading..." /> : ''
      }
      {
        error ?
          <div className="main-error">
            <div className="error">
              <p>Image Uploading Fail!</p>
            </div>
          </div> : ''
      }
      <ImageUploader
        file={selectedFile}
        getFile={handleFileChange}
      />
      <div className="image-previews">
        {
          sizes.map((size, key) =>
            <ImagePreview
              image={selectedFile}
              width={size.width}
              height={size.height}
              type={size.type}
              getFile={({ file, key }) => setFiles(f => ({ ...f, [key]: file }))}
              key={key} />)
        }
      </div>
      <div className="save-button">
        <button
          type="button"
          className="primary"
          disabled={!selectedFile}
          onClick={handleSaveImages}>Save</button>
      </div>
    </div>
  );
}

export default Home;