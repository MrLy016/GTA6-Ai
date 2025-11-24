import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { LoadingScreen } from './components/LoadingScreen';
import { generateGTAStyleImage } from './services/geminiService';
import { AppStatus, ErrorState } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<ErrorState>({ hasError: false, message: '' });

  const handleImageSelected = useCallback(async (base64: string) => {
    setOriginalImage(base64);
    setStatus(AppStatus.PROCESSING);
    setError({ hasError: false, message: '' });

    try {
      const resultBase64 = await generateGTAStyleImage(base64);
      setGeneratedImage(resultBase64);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError({ 
        hasError: true, 
        message: err instanceof Error ? err.message : "Failed to generate image. Please try again." 
      });
      setStatus(AppStatus.ERROR);
    }
  }, []);

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setOriginalImage(null);
    setGeneratedImage(null);
    setError({ hasError: false, message: '' });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gta-dark via-[#1a0b1a] to-gta-dark text-white overflow-x-hidden relative">
      
      {/* Background ambient light */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gta-purple opacity-20 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gta-orange opacity-10 blur-[120px] pointer-events-none"></div>

      <Header />

      <main className="container mx-auto px-4 pb-12 flex flex-col items-center relative z-10">
        
        {status === AppStatus.IDLE && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="text-center mb-8 max-w-2xl">
              <p className="text-xl md:text-2xl font-light text-gray-200 mb-2">
                Turn your photo into a realistic <span className="text-gta-pink font-bold">GTA VI</span> character.
              </p>
              <p className="text-sm text-gray-400">
                Using the advanced Gemini 2.5 Flash Nano Banana model for high-fidelity generation.
              </p>
            </div>
            <UploadZone onImageSelected={handleImageSelected} />
          </div>
        )}

        {status === AppStatus.PROCESSING && (
           <div className="w-full flex flex-col items-center">
             {originalImage && (
               <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white/20 mb-8 opacity-50">
                 <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
               </div>
             )}
             <LoadingScreen />
           </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-6 rounded-xl max-w-md text-center">
            <h3 className="text-xl font-bold mb-2">Wasted</h3>
            <p>{error.message}</p>
            <button 
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold transition"
            >
              Try Again
            </button>
          </div>
        )}

        {status === AppStatus.SUCCESS && generatedImage && originalImage && (
          <div className="w-full max-w-6xl flex flex-col items-center animate-slideUp">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
              {/* Original */}
              <div className="flex flex-col items-center">
                 <span className="text-gray-400 text-sm uppercase tracking-widest mb-2">Original</span>
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full aspect-[4/5] md:aspect-square">
                    <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                 </div>
              </div>

              {/* Result */}
              <div className="flex flex-col items-center">
                 <span className="text-gta-pink text-sm uppercase tracking-widest mb-2 font-bold">Grand Life Generated</span>
                 <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,0,153,0.3)] border border-gta-pink/30 w-full aspect-[4/5] md:aspect-square group">
                    <img src={generatedImage} alt="GTA Version" className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-display italic text-white/80">
                      GTA VI STYLE
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-gray-800 hover:bg-gray-700 border border-white/10 text-white font-medium transition"
              >
                New Image
              </button>
              <a 
                href={generatedImage} 
                download="grand-life-gta6.png"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-gta-pink to-gta-purple hover:from-pink-500 hover:to-purple-500 text-white font-bold shadow-lg transition transform hover:-translate-y-1"
              >
                Download Art
              </a>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default App;