import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="success-container">

    </div>
  );
}

export default Success;