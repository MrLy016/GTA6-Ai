import React, { useCallback } from 'react';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageSelected(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-1 relative group">
      {/* Neon Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gta-pink via-gta-purple to-gta-blue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
      
      <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center text-center h-64 transition-transform transform group-hover:scale-[1.02]">
        <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">Upload Your Photo</h3>
        <p className="text-gray-400 text-sm mb-6">Supports JPG, PNG. Make sure your face is clear.</p>
        
        <label className="cursor-pointer bg-gradient-to-r from-gta-pink to-gta-orange hover:from-pink-500 hover:to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1">
          <span>SELECT FILE</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};