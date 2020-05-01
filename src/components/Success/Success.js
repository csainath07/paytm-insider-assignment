import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Success = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      history.push('/');
    }
  }, [history, location]);

  return (
    <div className="success-container">
      <div className="heading">
        <h4>Images uploaded successfully!</h4>
      </div>
      <div className="previews">
        {
          location.state && location.state.map((image, key) => {
            return <a
              href={image.secure_url}
              title={image.public_id}
              target="_blank"
              rel="noopener noreferrer">
              <img key={key} src={image.secure_url} alt={image.public_id} />
            </a>
          })
        }
      </div>
    </div>
  );
}

export default Success;