import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="loading-container flex justify-center items-center">
      <div className="sun animate-spin rounded-full bg-yellow-500 w-16 h-16"></div>
    </div>
  );
};

export default LoadingAnimation;
