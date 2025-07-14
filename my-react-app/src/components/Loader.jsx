import React from 'react';

const Loader = ({ size = 'medium', color = 'blue' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const colorClasses = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500',
    black: 'border-black',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="text-center">
      <Loader size="large" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

export const ButtonLoader = ({ color = 'white' }) => (
  <Loader size="small" color={color} />
);

export default Loader;