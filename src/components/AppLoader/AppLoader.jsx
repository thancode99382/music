import React from 'react';

function AppLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4 border-4 rounded-full border-t-green-500 border-neutral-700 animate-spin"></div>
        <h2 className="text-xl font-bold text-white">Loading Spotify...</h2>
        <p className="mt-2 text-gray-400">Please wait while we set up your music</p>
      </div>
    </div>
  );
}

export default AppLoader;
