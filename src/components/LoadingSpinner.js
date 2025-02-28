import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-yellow-500 border-gray-700 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300 text-sm">Loading FX Demo...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;