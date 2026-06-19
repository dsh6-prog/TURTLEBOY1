import React from "react";
import { Sparkles, Wifi } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
  theme: "light" | "dark";
  lang: "ko" | "en";
  langToggle: () => void;
  themeToggle: () => void;
}

export function MobileFrame({ children, theme, lang, langToggle, themeToggle }: MobileFrameProps) {
  // Current time for phone status bar
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div id="mobile-wrap" className="w-full min-h-screen py-4 md:py-8 px-2 flex items-center justify-center transition-colors duration-300 bg-neutral-100 dark:bg-[#03010f] overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full filter blur-[100px] bg-emerald-400/10 dark:bg-emerald-500/5" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full filter blur-[100px] bg-sky-400/10 dark:bg-sky-500/5" />
      </div>

      {/* Main Pocket Device Mock */}
      <div 
        id="phone-shell"
        className={`relative w-full max-w-md md:max-w-md h-[88vh] md:h-[840px] max-h-[850px] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border transition-all duration-300 flex flex-col z-10 ${
          theme === "light" 
            ? "bg-stone-50 border-stone-200/90 shadow-stone-300/40" 
            : "bg-[#06041a] border-violet-950/80 shadow-black/80"
        }`}
      >
        {/* Device Notch/Dynamic Island Accent */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full bg-black z-50 flex items-center justify-center gap-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
          <span className="text-[9px] font-black text-emerald-400 font-mono tracking-widest leading-none">AI CORE</span>
        </div>

        {/* Device Status Bar */}
        <div className={`mt-1.5 pt-6 pb-2 px-6 flex items-center justify-between text-[11px] font-bold tracking-tight select-none z-30 ${
          theme === "light" ? "text-stone-500" : "text-neutral-400"
        }`}>
          <div className="font-mono flex items-center gap-1">
            <span>{currentTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[9px] uppercase font-black bg-emerald-550/10 text-emerald-500 px-1 py-0.5 rounded border border-emerald-500/20">LTE</span>
          </div>
        </div>

        {/* Global Control Row under Status Bar */}
        <div className={`px-5 py-2.5 border-b flex items-center justify-between z-30 transition-colors duration-200 ${
          theme === "light" 
            ? "bg-stone-100/50 border-stone-200/60" 
            : "bg-[#0a0724]/60 border-violet-950/40"
        }`}>
          {/* Logo badge with glow */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className={`text-[12px] font-black tracking-tight ${
              theme === "light" ? "text-stone-800" : "text-white"
            }`}>
              TURTLE COMPASS 🧭
            </span>
          </div>

          {/* Quick interactive controls */}
          <div className="flex items-center gap-2">
            {/* Lang Toggle Button */}
            <button
              onClick={langToggle}
              id="lang-toggler"
              className={`px-2.5 py-1 text-[10px] font-black rounded-full border transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                  : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              🌐 {lang === "ko" ? "EN" : "한글"}
            </button>

            {/* Light / Dark Toggler Button */}
            <button
              onClick={themeToggle}
              id="theme-toggler"
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-white border-stone-200 text-amber-500 hover:bg-stone-100"
                  : "bg-neutral-900 border-neutral-800 text-sky-400 hover:bg-neutral-800"
              }`}
              title="Light / Dark theme toggle"
            >
              {theme === "light" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Screen Content Wrapper - Scrollable */}
        <div className="flex-1 overflow-y-auto relative z-20 flex flex-col select-text scrollbar-thin">
          {children}
        </div>

        {/* Virtual Home Bar */}
        <div className="py-2.5 w-full flex justify-center shrink-0 z-30">
          <div className={`w-32 h-1.5 rounded-full ${
            theme === "light" ? "bg-stone-300" : "bg-neutral-800"
          }`} />
        </div>
      </div>
    </div>
  );
}
export default MobileFrame;
