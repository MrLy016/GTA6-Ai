import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-6 flex justify-center items-center z-10 relative">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-display italic font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          GRAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-gta-pink to-gta-purple">LIFE</span>
        </h1>
        <p className="text-white/80 mt-2 font-medium tracking-widest uppercase text-xs md:text-sm">
          Vice City Generator • Powered by Gemini
        </p>
      </div>
    </header>
  );
};