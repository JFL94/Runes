import React, { useState } from 'react';
import { Rune } from '../types';

interface RuneCardProps {
  rune: Rune;
  revealed?: boolean;
  onClick?: () => void;
  generatedImage?: string | null;
  loadingImage?: boolean;
}

const RuneCard: React.FC<RuneCardProps> = ({ rune, revealed = false, onClick, generatedImage, loadingImage }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative w-full aspect-[3/4] cursor-pointer perspective-1000 group transition-transform duration-500`}
    >
      <div className={`relative w-full h-full duration-700 preserve-3d transition-all ${revealed ? 'rotate-y-180' : ''}`}>
        
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden border border-white/10 shadow-xl">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 opacity-90"></div>
           {/* Mystical Pattern */}
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-fuchsia-400/30 flex items-center justify-center animate-pulse-slow">
                <span className="text-3xl text-fuchsia-300 opacity-50">ᚱ</span>
              </div>
           </div>
        </div>

        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-slate-800">
          {generatedImage ? (
            <img src={generatedImage} alt={rune.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900 p-4 relative">
                {loadingImage ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-sm">
                        <div className="w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : null}
                <div className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-violet-400 mb-2 drop-shadow-lg font-serif">
                  {rune.symbol}
                </div>
                <h3 className="text-xl font-serif text-white mb-1">{rune.name}</h3>
                <p className="text-xs text-center text-slate-300 font-sans opacity-80">{rune.meaning}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          )}
          
          {/* Overlay Text even on Image */}
          {generatedImage && (
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                 <div className="text-2xl text-white font-serif drop-shadow-md text-center">{rune.symbol}</div>
                 <div className="text-lg text-white font-serif text-center">{rune.name}</div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RuneCard;
