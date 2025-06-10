// components/Spinner.tsx
import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-700 bg-opacity-50 backdrop-blur-xl flex items-center justify-center">
      <div
        className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"
        style={{
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
        }}
      ></div>
    </div>
  );
};

export default Spinner;
