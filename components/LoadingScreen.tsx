import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);
  
  const tips = [
    "Loading Vice City textures...",
    "Rendering sunset lighting...",
    "Applying 4K upscale...",
    "Simulating ray-traced reflections...",
    "Generating realistic skin shaders..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-gta-pink rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-2 border-4 border-gta-blue rounded-full animate-spin border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
      </div>
      
      <h2 className="text-2xl font-display italic font-bold text-white tracking-wider mb-2 animate-pulse">
        GENERATING
      </h2>
      <p className="text-gta-orange font-medium text-sm uppercase tracking-widest">
        {tips[tipIndex]}
      </p>
    </div>
  );
};