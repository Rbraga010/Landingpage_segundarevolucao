import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

const names = [
  "Juliana Santos", "Rodrigo Oliveira", "Amanda Pereira", "Carlos Eduardo", 
  "Fernanda Lima", "Ricardo Silveira", "Beatriz Costa", "Marcos Vinícius",
  "Patrícia Gomes", "Tiago Almeida", "Larissa Rocha", "André Souza"
];

export const SocialProofPopup: React.FC = () => {
  const [currentName, setCurrentName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showPopup = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setCurrentName(randomName);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Initial delay before first popup
    const timer = setTimeout(() => {
      showPopup();
    }, 3000);

    // Repeated interval
    const interval = setInterval(() => {
      showPopup();
    }, 8000); // 8 seconds cycle (4 showing + 4 hidden)

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-6 z-[100] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 min-w-[320px]">
        {/* Hotmart-style Icon */}
        <div className="w-12 h-12 bg-[#FF4500] rounded-xl flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(255,69,0,0.3)]">
          <Flame className="w-7 h-7 fill-white" />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-white font-bold text-sm truncate">{currentName}</span>
            <span className="text-slate-500 text-[10px] uppercase tracking-tighter">Agora</span>
          </div>
          <p className="text-slate-400 text-[12px] leading-tight">
            garantiu a Imersão H.AI por <span className="text-green-400 font-bold">R$ 697,00</span>
          </p>
        </div>
      </div>
    </div>
  );
};
