import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-[99999]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
