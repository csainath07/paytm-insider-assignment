import React, { memo } from 'react';
import './style.scss';

const Loading = ({
  text = "Loading..."
}) => {
  return (
    <div className="loading-container">
      <span>{text}</span>
    </div>
  );
}

export default memo(Loading);