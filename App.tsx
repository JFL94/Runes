import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import RuneCard from './components/RuneCard';
import Community from './components/Community';
import { AppTab, Rune } from './types';
import { RUNES } from './constants';
import { generateRuneInterpretation, generateRuneVisual } from './services/geminiService';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.HOME);
  const [selectedRunes, setSelectedRunes] = useState<Rune[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [interpretation, setInterpretation] = useState<string>("");
  const [loadingReading, setLoadingReading] = useState(false);
  
  // Image Generation State
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});

  // Home Screen: Daily Rune
  const [dailyRune, setDailyRune] = useState<Rune | null>(null);

  useEffect(() => {
    // Set a random daily rune on mount
    const random = RUNES[Math.floor(Math.random() * RUNES.length)];
    setDailyRune(random);
  }, []);

  const handleDrawRune = async () => {
    // Reset state for new reading
    setIsRevealed(false);
    setInterpretation("");
    setLoadingReading(true);
    
    // Shuffle and pick 1 rune (Simple 1-rune spread for MVP)
    const shuffled = [...RUNES].sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, 1);
    setSelectedRunes(drawn);

    // Simulate drawing delay for effect
    setTimeout(async () => {
        setIsRevealed(true);
        
        // 1. Generate Interpretation
        const reading = await generateRuneInterpretation(drawn);
        setInterpretation(reading);
        setLoadingReading(false);

        // 2. Trigger Image Generation for the drawn rune
        const runeId = drawn[0].id;
        if (!generatedImages[runeId]) {
            setLoadingImages(prev => ({ ...prev, [runeId]: true }));
            const imgUrl = await generateRuneVisual(drawn[0]);
            if (imgUrl) {
                setGeneratedImages(prev => ({ ...prev, [runeId]: imgUrl }));
            }
            setLoadingImages(prev => ({ ...prev, [runeId]: false }));
        }

    }, 1500);
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pb-24 text-center">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[100px]"></div>
       </div>

      <h1 className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-white to-violet-200 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-float">
        Runes 盧恩
      </h1>
      <p className="text-slate-400 mb-12 tracking-widest text-sm font-sans uppercase">開啟北歐智慧</p>

      {dailyRune && (
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-xs w-full mb-8 shadow-2xl">
          <h2 className="text-fuchsia-300 font-serif mb-2">今日符文</h2>
          <div className="text-4xl text-white mb-2">{dailyRune.symbol}</div>
          <h3 className="text-xl font-bold text-slate-200">{dailyRune.name}</h3>
          <p className="text-slate-400 text-sm mt-2">{dailyRune.meaning}</p>
        </div>
      )}

      <button 
        onClick={() => setCurrentTab(AppTab.DIVINATION)}
        className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-full text-white font-serif tracking-wider shadow-[0_0_30px_rgba(192,38,211,0.4)] hover:scale-105 transition-transform"
      >
        開始占卜
      </button>
    </div>
  );

  const renderDivination = () => (
    <div className="flex flex-col items-center min-h-screen px-4 pt-12 pb-28">
      <h2 className="text-2xl font-serif text-white mb-8 opacity-90">專注於你的問題...</h2>
      
      <div className="w-64 h-96 mb-8 relative">
        {selectedRunes.length > 0 ? (
          <RuneCard 
            rune={selectedRunes[0]} 
            revealed={isRevealed} 
            generatedImage={generatedImages[selectedRunes[0].id]}
            loadingImage={loadingImages[selectedRunes[0].id]}
          />
        ) : (
          <div 
             onClick={handleDrawRune}
             className="w-full h-full rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group"
          >
             <div className="text-center group-hover:scale-110 transition-transform">
                <div className="text-4xl mb-2 opacity-50">✨</div>
                <span className="text-slate-400 font-serif">點擊抽牌</span>
             </div>
          </div>
        )}
      </div>

      {loadingReading && (
        <div className="text-fuchsia-300 animate-pulse font-serif text-lg">
          正在詢問諾恩三女神...
        </div>
      )}

      {interpretation && (
        <div className="max-w-md bg-slate-900/60 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-2xl animate-float">
          <h3 className="text-fuchsia-400 font-serif mb-3 text-lg border-b border-white/10 pb-2">神諭以此示現</h3>
          <p className="text-slate-200 font-sans leading-relaxed text-sm text-justify">
            {interpretation}
          </p>
          <div className="mt-4 flex gap-2 justify-end">
             <button onClick={() => setSelectedRunes([])} className="text-xs text-slate-400 hover:text-white underline">
               重新占卜
             </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-fuchsia-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
         {/* Stars / Dust */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10">
        {currentTab === AppTab.HOME && renderHome()}
        {currentTab === AppTab.DIVINATION && renderDivination()}
        {currentTab === AppTab.COMMUNITY && <Community />}
      </div>

      <Navigation currentTab={currentTab} setTab={setCurrentTab} />
    </div>
  );
};

export default App;