import React from "react";
import { motion } from "motion/react";
import welcomeMascot from "../assets/images/turtle_boy_mascot_1780033465549.png";
import astronautMascot from "../assets/images/turtle_astronaut_1780038715638.png";
import counsellorMascot from "../assets/images/turtle_mascot_1780037753977.png";

export type MascotType = "welcome" | "astronaut" | "counsellor";

interface MascotBubbleProps {
  type: MascotType;
  message: string;
  theme: "light" | "dark";
  bubbleBgClass?: string;
  className?: string;
}

const MASCOT_IMAGES: Record<MascotType, string> = {
  welcome: welcomeMascot,
  astronaut: astronautMascot,
  counsellor: counsellorMascot
};

const MASCOT_NAMES = {
  welcome: "터틀보이 • Turtle Boy",
  astronaut: "스페이스 터틀 • Explorer",
  counsellor: "터틀 멘토 • Counselor"
};

export function MascotBubble({ type, message, theme, bubbleBgClass, className = "" }: MascotBubbleProps) {
  const imageSrc = MASCOT_IMAGES[type];
  const nameLabel = MASCOT_NAMES[type];

  // Floating animations
  const floatTransition = {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  };

  return (
    <div className={`flex items-start gap-4 p-4.5 rounded-3xl transition-all duration-300 relative overflow-visible ${className} ${
      theme === "light" 
        ? "bg-white/60 dark:bg-black/20 backdrop-blur-md border border-stone-200/40 shadow-sm" 
        : "bg-[#090724]/30 backdrop-blur-md border border-violet-950/20 shadow-lg"
    }`}>
      {/* Cartoon Avatar Frame */}
      <motion.div 
        animate={{ y: [0, -4, 0] }}
        transition={floatTransition}
        className="relative shrink-0"
      >
        <div className={`w-14 h-14 rounded-full overflow-hidden shadow-inner flex items-center justify-center p-0.5 border-2 ${
          theme === "light" 
            ? "bg-stone-50 border-emerald-400 shadow-stone-250/50" 
            : "bg-[#0b0a23] border-emerald-500 shadow-neutral-900"
        }`}>
          <img
            src={imageSrc}
            alt={nameLabel}
            className="w-full h-full object-contain rounded-full bg-transparent transform scale-110"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback placeholder if files fails
              e.currentTarget.src = "https://picsum.photos/seed/turtlemascot/150/150";
            }}
          />
        </div>
        {/* Active badge */}
        <span className="absolute bottom-1 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0c0a25] animate-pulse" />
      </motion.div>

      {/* Bubble Chat layout */}
      <div className="flex-1 space-y-1.5 select-text">
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-black tracking-wider uppercase ${
            theme === "light" ? "text-emerald-600 font-bold" : "text-emerald-400"
          }`}>
            {nameLabel}
          </span>
          <span className={`text-[8px] tracking-widest px-2 py-0.5 rounded-full font-black ${
            theme === "light" ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50" : "bg-emerald-955/20 text-emerald-350 border border-emerald-500/20"
          }`}>
            LIVE BUDDY
          </span>
        </div>

        {/* Dynamic Bubble Container */}
        <div 
          className={`relative p-3.5 rounded-2xl text-xs md:text-[13px] leading-relaxed font-black transition-all duration-200 ${
            bubbleBgClass || (theme === "light"
              ? "bg-emerald-500/5 text-stone-750 border border-emerald-100"
              : "bg-emerald-550/5 text-neutral-150 border border-emerald-500/10")
          }`}
        >
          {/* Tip decoration */}
          <div className={`absolute top-3 left-[-5px] w-2.5 h-2.5 rotate-45 border-l border-b transition-all duration-200 ${
            theme === "light"
              ? "bg-white border-emerald-100"
              : "bg-[#111135]/5 border-emerald-500/10"
          }`} style={{ borderLeftColor: 'inherit', borderBottomColor: 'inherit' }} />
          
          <p className="whitespace-pre-wrap leading-relaxed font-sans font-medium text-[11px] md:text-xs">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MascotBubble;
