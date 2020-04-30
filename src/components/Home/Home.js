import React, { useState } from 'react';
import { ImageUploader, ImagePreview } from '../../common/components';

const Home = () => {
  //state
  const [selectedFile, setFile] = useState(null);
  const [files, setFiles] = useState({});

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

  const handleSaveImages = () => {
    console.log(files);
  }

  return (
    <div className="home-container">
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