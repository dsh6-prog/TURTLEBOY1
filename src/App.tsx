/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Compass, 
  GraduationCap, 
  Check, 
  Heart, 
  Bookmark, 
  RotateCcw, 
  Printer, 
  BookOpen, 
  Star, 
  Award, 
  BadgeInfo, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  TrendingUp, 
  Target 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Major, CareerRecommendationResponse } from "./types";
import { generateClientFallback } from "./clientFallback";
import { translations } from "./translations";
import { MobileFrame } from "./components/MobileFrame";
import { MascotBubble } from "./components/MascotBubble";

import welcomeMascot from "./assets/images/turtle_boy_mascot_1780033465549.png";
import astronautMascot from "./assets/images/turtle_astronaut_1780038715638.png";
import counsellorMascot from "./assets/images/turtle_mascot_1780037753977.png";

const INTEREST_POOLS = [
  { id: "IT/정보기술", label: { ko: "💻 IT / 개발 / 인공지능", en: "💻 IT / 개발 / AI" }, descKo: "코딩, 웹사이트, 스마트 팩토리, 가상현실 관심", descEn: "Web, AI models, coding, SaaS and virtual reality" },
  { id: "의료/생명과학", label: { ko: "🧬 의료 / 바이오 / 생명", en: "🧬 Bio / Medicine / Life Sci" }, descKo: "생명 현상 탐구, 약학 신약 개발, 백신, 의학 치료", descEn: "Genetics, biotech, bio-sensors, and medical research" },
  { id: "경영/경제", label: { ko: "📈 경영 / 광고 / 창업", en: "📈 Marketing / Business" }, descKo: "비즈니스, 스타트업 아이디어, 마케팅 트렌드 분석", descEn: "Startups, strategy, financial analysis, and markets" },
  { id: "디자인/예술", label: { ko: "🎨 시각디자인 / 순수예술", en: "🎨 Fine Arts & Design" }, descKo: "그림, UI/UX 디자인, 브랜드 일러스트, 3D 가공", descEn: "UI/UX, 3D modeling, illustration, digital arts" },
  { id: "미디어/콘텐츠", label: { ko: "🎬 영상 / 방송 / 유튜브", en: "🎬 Media & Shorts" }, descKo: "콘텐츠 기획, 영상 편집, 뉴미디어 시나리오 작성", descEn: "Video production, narrative writing, visual communication" },
  { id: "교육/심리", label: { ko: "🧠 교육 / 상담심리학", en: "🧠 Psychology & Education" }, descKo: "선생님, 사람 무의식 심리 탐구, 진로 상담 피드백", descEn: "Coaching, educational software, mind therapy" },
  { id: "공학/로봇", label: { ko: "🛠️ 로봇공학 / 우주항공", en: "🛠️ Robotics & Aerospace" }, descKo: "드론 비행 조율, IoT 기계 제어, 미래 친환경 자동차", descEn: "Drones, autonomous electronics, green mechanics" },
  { id: "어학/글로벌", label: { ko: "🌍 어학 / 국제관계", en: "🌍 Langs & Global Studies" }, descKo: "글로벌 비즈니스, 해외 통역, 다국적 도서 문화 탐색", descEn: "Global trade, translation, cross-cultural relations" },
  { id: "사회과학/행정", label: { ko: "⚖️ 행정 / 법률 / 정치", en: "⚖️ Law & Social Science" }, descKo: "공공 정책, 사회적 문제 해결, 법률적 분쟁 해결", descEn: "Public policy, environmental rules, smart city law" },
];

const SUBJECT_POOLS = [
  { id: "국어", label: "🇰🇷 국어 (Korean)", descKo: "비독서 문맥 분석력", descEn: "Reading & Writing" },
  { id: "수학", label: "🔢 수학 (Math)", descKo: "기하 연산 및 논리", descEn: "Logic & Geometry" },
  { id: "영어", label: "🔤 영어 (English)", descKo: "원서 소통 및 번역", descEn: "Global Communication" },
  { id: "과학", label: "🔬 과학 (Science)", descKo: "가설 실증실습", descEn: "Hypothesis, Biology, Chemistry" },
  { id: "사회", label: "🧭 사회 (Social)", descKo: "역사, 소비자 심리 이해", descEn: "Society & Economics Studies" },
  { id: "정보", label: "🤖 정보 (CS/Coding)", descKo: "알고리즘 구현", descEn: "Algorithms & Programming" },
  { id: "예체능", label: "🎨 예체능 (Arts/PE)", descKo: "미적 디자인 감각", descEn: "Aesthetics & Physical Arts" },
  { id: "외국어", label: "💬 외국어 (Languages)", descKo: "다국적 소통 회화", descEn: "Global Language Skills" },
];

const getExtendedCareerBlueprint = (name: string, lang: "ko" | "en") => {
  const isKo = lang === "ko";
  const lower = name.toLowerCase();

  // 1. Full-stack Developer / Software Engineer
  if (lower.includes("개발") || lower.includes("소프트웨어") || lower.includes("화이트해커") || lower.includes("해커") || lower.includes("developer") || lower.includes("engineer")) {
    return {
      coreTask: isKo 
        ? "클라우드 스케일 분산 원격 컴퓨팅 모듈 설계, 보안 암호화 통신 패킷 분석, 최첨단 인공지능 API 서버 연계 반응형 프론트엔드 구축"
        : "Design cloud-scale computing architectures, analyze encrypted packets, and deploy reactive frontend modules connected with Gemini AI.",
      books: isKo 
        ? ["클린 아키텍처 (로버트 C. 마틴)", "알고리즘 문제 해결 전략 (구종만)"]
        : ["Clean Architecture by Robert C. Martin", "Introduction to Algorithms by Cormen"],
      tactics: isKo
        ? "수학과 연계하여 '이진 탐색 알고리즘과 하노이의 탑 시간 복잡도의 로그 상관계수 증명' 보고서를 탐구 주간에 출품하고, 나만의 기획안을 세특에 기록해보렴!"
        : "Design a simulated web scheduler and present an analysis of algorithm space complexity in your math seminar.",
      outlook: isKo ? "핵심 성장 중 (시장 포화도 낮음, 초고소득 전문직군)" : "High Demand, Premium Salary Tier"
    };
  }
  // 2. Data Analyst / Stats
  if (lower.includes("데이터") || lower.includes("분석") || lower.includes("통계") || lower.includes("analyst") || lower.includes("intelligence")) {
    return {
      coreTask: isKo
        ? "정형/비정형 융합 데이터 가공 및 정밀 이상치 제거 파이프라인 수집, 파이썬 기반 통계 상관분석 및 가설 유의 수준 가치 검증"
        : "Execute SQL and Python analysis pipelines, filter outliers, and run regression models for corporate decision making.",
      books: isKo
        ? ["신호와 소음 (네이트 실버)", "수학을 품은 AI (이수영)"]
        : ["The Signal and the Noise by Nate Silver", "Python for Data Analysis by Wes McKinney"],
      tactics: isKo
        ? "사회·문화 과목의 설문조사 단원과 연계해서 '우리 학교 급식소 대기 시간을 10% 단축하는 행렬 대기열 시뮬레이션 가설'을 세우고 보고서를 적성 교재로 제출해보렴!"
        : "Create a descriptive statistics report on high school study habits and run a linear correlation test in your social studies class.",
      outlook: isKo ? "폭발적 하이퍼 성장군 (AI 시대 전 산업의 브레인)" : "Hyper Growth, Cross-sector Brain Role"
    };
  }
  // 3. Biomedical, Bio, Genetics
  if (lower.includes("바이오") || lower.includes("생명") || lower.includes("의학") || lower.includes("세포") || lower.includes("치료") || lower.includes("bio") || lower.includes("medical")) {
    return {
      coreTask: isKo
        ? "3D 바이오 프린팅 기법 응용 인공 장기 세포 미제 구조물 직조, CRISPR 유전자 가위를 이용한 표적 변이 차단 연구, 웨어러블 헬스 디바이스 입출력 신호 제어"
        : "Fabricate 3D molecular scaffolding for organic cell structures, run CRISPR genomic target sequencing, and parse wearable micro-signals.",
      books: isKo
        ? ["생명과학의 탐구 (캠벨)", "유전자와 운명 (리처드 도킨스)"]
        : ["Biology by Campbell", "The Selfish Gene by Richard Dawkins"],
      tactics: isKo
        ? "생명과학 시간에 배운 전사 및 번역 오류를 코딩의 세미클론 누락에 비유하여 '유기 화합 결합 오류 차단을 위한 스마트 펌웨어 응용 방안' 학술 에세이를 발표해봐!"
        : "Present a paper on bioluminescent markers used for disease detection, connecting computer vision to biology.",
      outlook: isKo ? "인류 생존 필수 최고 가치군 (초장기 독점 무역 특허 소유)" : "Infinite Long-term Horizon, High Margin Patent Domain"
    };
  }
  // 4. Marketing, Business, Social impact, Creator, Planner
  if (lower.includes("마케터") || lower.includes("창업") || lower.includes("콘텐츠") || lower.includes("기획") || lower.includes("디렉터") || lower.includes("크리에이터") || lower.includes("planner") || lower.includes("marketer")) {
    return {
      coreTask: isKo
        ? "사용자 경험(UX) 데이터 기반 A/B 테스트 정량 통계 설계, 글로벌 소셜 굿즈 모금 펀딩 인게임 가치 흐름 설계, 인공지능 프롬프트 디자인 마케팅 자산 최적화"
        : "Design quantitative A/B testing matrix for high conversion rates, direct gamified educational structures, and lead cross-border launch events.",
      books: isKo
        ? ["인간 행동의 심리학 (도널드 노먼)", "트랙션 (가브리엘 와인버그)"]
        : ["The Design of Everyday Things by Don Norman", "Traction by Gabriel Weinberg"],
      tactics: isKo
        ? "경제수학 및 생활과 윤리를 연계하여 '소외계층 자립 펀딩 모금을 위한 모바일 홍보용 가상 그라데이션 일러스트 모바일 카드 제작 및 심리 상관계 분석'을 주도해봐!"
        : "Design an actual school volunteer fundraiser and submit a performance report using Excel profit projection templates.",
      outlook: isKo ? "대규모 고부가 실물 성장군 (아이디어로 세상을 바꾸는 핵심 파워)" : "High Leverage Domain, Driven by Creative Innovation"
    };
  }
  // 5. Default/Catch-all
  return {
    coreTask: isKo
      ? "신기술 융합 트렌드 및 시장 니즈 정밀 분석, 차세대 첨단 산업 솔루션 설계, 이종 학위/전공 연계 통합형 헬프데스크 프로젝트 지휘"
      : "Analyze emergent paradigm shifts, build synergistic strategic solutions, and organize multi-disciplinary project sprints.",
    books: isKo
      ? ["융합의 시대 (최재천)", "미래의 인재상 (대니얼 핑크)"]
      : ["A Whole New Mind by Daniel Pink", "The Future of Professional Services"],
    tactics: isKo
      ? "이수 과목인 영어나 국어 작문 시간과 연계해, 탐색한 미래 직무의 공익적 기여도와 융합 기술 시너지를 다룬 영문 기술 블로그 초안을 작성하여 글로벌 발표력을 드러내보렴!"
      : "Draft an English technology essay detailing the socio-economic impacts of this role, highlighting global communication prowess.",
    outlook: isKo ? "미래 지형 핵심 융합형 전략가" : "Evolving High-flex Strategic Thinker"
  };
};

export default function App() {
  // Localization & Visual Theme State
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Page Wizard Page States
  // "intro" | "form_interests" | "form_subjects" | "form_details" | "loading" | "results"
  const [activePage, setActivePage] = useState<string>("intro");

  // User Selection states
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [detailedInput, setDetailedInput] = useState<string>("");

  // Server API Results
  const [recommendation, setRecommendation] = useState<CareerRecommendationResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Active sub-step within Results screen
  // "majors" | "major-detail" | "industries" | "careers" | "portfolio"
  const [resultsStep, setResultsStep] = useState<"majors" | "major-detail" | "industries" | "careers" | "portfolio">("majors");
  const [selectedMajorIndex, setSelectedMajorIndex] = useState<number>(0);
  const [selectedIndustryIndex, setSelectedIndustryIndex] = useState<number>(0);
  const [expandedCareerIndex, setExpandedCareerIndex] = useState<number>(0);

  // Rotating loading messages
  const [loadingTipIndex, setLoadingTipIndex] = useState(0);

  // Bookmarks state (for print summary report)
  const [bookmarkedMajors, setBookmarkedMajors] = useState<string[]>([]);
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([]);
  const [bookmarkedIndustries, setBookmarkedIndustries] = useState<string[]>([]);
  const [personalMemo, setPersonalMemo] = useState<string>("");
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState<boolean>(true);

  const t = translations[lang];

  // Load bookmarks from localStorage on startup
  useEffect(() => {
    try {
      const savedMajors = localStorage.getItem("turtle_bookmarked_majors");
      const savedCareers = localStorage.getItem("turtle_bookmarked_careers");
      const savedIndustries = localStorage.getItem("turtle_bookmarked_industries");
      const savedMemo = localStorage.getItem("turtle_personal_memo");
      
      if (savedMajors) setBookmarkedMajors(JSON.parse(savedMajors));
      if (savedCareers) setBookmarkedCareers(JSON.parse(savedCareers));
      if (savedIndustries) setBookmarkedIndustries(JSON.parse(savedIndustries));
      if (savedMemo) setPersonalMemo(savedMemo);
    } catch (e) {
      console.warn("Could not load turtle bookmarks.", e);
    }
  }, []);

  // Theme Sync on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("turtle_theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  // Set HTML dark class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLang(prev => (prev === "ko" ? "en" : "ko"));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("turtle_theme", nextTheme);
  };

  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleToggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const toggleBookmarkMajor = (majorName: string) => {
    let updated;
    if (bookmarkedMajors.includes(majorName)) {
      updated = bookmarkedMajors.filter(item => item !== majorName);
    } else {
      updated = [...bookmarkedMajors, majorName];
    }
    setBookmarkedMajors(updated);
    localStorage.setItem("turtle_bookmarked_majors", JSON.stringify(updated));
  };

  const toggleBookmarkIndustry = (industryName: string) => {
    let updated;
    if (bookmarkedIndustries.includes(industryName)) {
      updated = bookmarkedIndustries.filter(item => item !== industryName);
    } else {
      updated = [...bookmarkedIndustries, industryName];
    }
    setBookmarkedIndustries(updated);
    localStorage.setItem("turtle_bookmarked_industries", JSON.stringify(updated));
  };

  const toggleBookmarkCareer = (careerName: string) => {
    let updated;
    if (bookmarkedCareers.includes(careerName)) {
      updated = bookmarkedCareers.filter(item => item !== careerName);
    } else {
      updated = [...bookmarkedCareers, careerName];
    }
    setBookmarkedCareers(updated);
    localStorage.setItem("turtle_bookmarked_careers", JSON.stringify(updated));
  };

  const loadingTips = [
    lang === "ko" ? "터틀보이가 교육부 전공 도서관을 빠른 걸음으로 걷고 있어요... 📚🐢" : "Turtle Boy is walking quickly through the libraries... 📚🐢",
    lang === "ko" ? "이 학과에는 어떤 고등학교 과목들이 연결되어 있을까? 퍼즐 맞추는 중! 🧭" : "Matching recommended high school subjects... 🧭",
    lang === "ko" ? "대한민국 전 대학 학과 매핑 백서를 검토하고 있습니다... 🗺️" : "Analyzing all major fields models... 🗺️",
    lang === "ko" ? "생활기록부에 적어내기에 딱 좋은 고부가가치 활동 '터틀 팁'을 가다듬고 있습니다! ✨" : "Polishing live extracurricular Action Tips for you! ✨",
    lang === "ko" ? "잠시만요! 거의 다 찾아냈어요. 너머의 숨은 잠재력을 그리는 우주 나침반 활성화 중..." : "Almost ready! Unlocking your cosmic academic guides...",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activePage === "loading") {
      interval = setInterval(() => {
        setLoadingTipIndex((prev) => (prev + 1) % loadingTips.length);
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [activePage, lang]);

  const handleSearchCareer = async () => {
    if (selectedInterests.length === 0) {
      alert(lang === "ko" ? "관심 있는 분야를 최소한 1개 이상 골라줘!" : "Please choose at least 1 area of interest!");
      return;
    }
    if (selectedSubjects.length === 0) {
      alert(lang === "ko" ? "너에게 흥미 있거나 친근한 과목을 최소한 1개 선택해줘!" : "Please choose at least 1 course subject!");
      return;
    }

    setActivePage("loading");
    setApiError(null);

    try {
      const response = await fetch("/api/career/explore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interests: selectedInterests,
          subjects: selectedSubjects,
          detailedText: detailedInput,
        }),
      });

      if (!response.ok) {
        throw new Error("API Server error");
      }

      const data: CareerRecommendationResponse = await response.json();
      setRecommendation(data);
      setSelectedMajorIndex(0);
      setSelectedIndustryIndex(0);
      setResultsStep("majors");
      
      // Auto pre-populate bookmarks on first active recommendation so PDF/report is NEVER blank!
      if (data.recommendedMajors && data.recommendedMajors.length > 0) {
        const topMajorName = data.recommendedMajors[0].name;
        const topIndustry = data.recommendedMajors[0].industries?.[0];
        const topCareer = topIndustry?.careers?.[0];

        // Safe setup
        setBookmarkedMajors([topMajorName]);
        if (topIndustry) setBookmarkedIndustries([topIndustry.name]);
        if (topCareer) setBookmarkedCareers([topCareer.name]);
      }

      setActivePage("results");
    } catch (err: any) {
      console.error("API error, fall back to offline client schema generator", err);
      setApiError(lang === "ko" 
        ? "온라인 AI 통신 서버 지연으로 터틀보이의 백업 오프라인 백서 처방전이 가동됩니다! 🧭🐢" 
        : "Entering safe offline backup catalog mode due to server timeout. 🧭🐢"
      );
      
      const offlineResult = generateClientFallback(selectedInterests, selectedSubjects, detailedInput);
      setRecommendation(offlineResult);
      setSelectedMajorIndex(0);
      setSelectedIndustryIndex(0);
      setResultsStep("majors");

      // Auto-prepopulate
      if (offlineResult.recommendedMajors && offlineResult.recommendedMajors.length > 0) {
        const topMajorName = offlineResult.recommendedMajors[0].name;
        const topIndustry = offlineResult.recommendedMajors[0].industries?.[0];
        const topCareer = topIndustry?.careers?.[0];

        setBookmarkedMajors([topMajorName]);
        if (topIndustry) setBookmarkedIndustries([topIndustry.name]);
        if (topCareer) setBookmarkedCareers([topCareer.name]);
      }

      setActivePage("results");
    }
  };

  const handleResetFlow = () => {
    setSelectedInterests([]);
    setSelectedSubjects([]);
    setDetailedInput("");
    setRecommendation(null);
    setApiError(null);
    setResultsStep("majors");
    setActivePage("intro");
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleQuickPopulate = () => {
    setSelectedInterests(["IT/정보기술", "공학/로봇"]);
    setSelectedSubjects(["수학", "과학", "정보"]);
    setDetailedInput(lang === "ko" 
      ? "로봇 및 무인 배송 하드웨어 개발에 흥미를 느끼고 있고, 코딩에 호기심이 많은 편이야!" 
      : "I am highly interested in building drone software & robotics hardware!"
    );
  };

  // Convert categories and subjects cleanly for English representation if language is 'en'
  const translateCategory = (cat: string) => {
    if (lang === "ko") return cat;
    const dict: Record<string, string> = {
      "공학계열": "Engineering Science",
      "자연과학/공학융합계열": "Bio-Natural & Cybernetics",
      "인문/사회융합계열": "Management & Fintech",
      "예체능/공학융합계열": "Technical Art & VR",
      "인문사회과학계열": "Communications & Media",
      "교육/인문과학계열": "EdTech & Counseling",
      "융합공학계열": "Mechatronics & Robotics",
      "인문/사회글로벌": "Global Business & Linguistics",
      "사회과학계열": "Public Safety & Governance"
    };
    return dict[cat] || "Interdisciplinary";
  };

  const translateSubject = (sub: string) => {
    if (lang === "ko") return sub;
    const dict: Record<string, string> = {
      "국어": "Korean lit.",
      "수학": "Mathematics",
      "영어": "English Study",
      "과학": "Natural Sciences",
      "사회": "Social Studies",
      "정보": "Computer Coding",
      "예체능": "Aesthetics & Art",
      "외국어": "Global Languages",
      "수학 Ⅰ": "Math I",
      "물리학 Ⅰ": "Physics I",
      "물리학 Ⅱ": "Physics II",
      "기하": "Geometry",
      "수학과제탐구": "Advanced Math Lab"
    };
    return dict[sub] || sub;
  };

  // Safe fallback resolver for bookmarks lists
  const activeBookmarkedMajors = bookmarkedMajors.length > 0 
    ? bookmarkedMajors 
    : (recommendation?.recommendedMajors?.slice(0, 1).map(m => m.name) || []);

  const activeBookmarkedIndustries = bookmarkedIndustries.length > 0 
    ? bookmarkedIndustries 
    : (recommendation?.recommendedMajors?.[0]?.industries?.slice(0, 1).map(i => i.name) || []);

  const activeBookmarkedCareers = bookmarkedCareers.length > 0 
    ? bookmarkedCareers 
    : (recommendation?.recommendedMajors?.[0]?.industries?.[0]?.careers?.slice(0, 2).map(c => c.name) || []);

  return (
    <MobileFrame theme={theme} lang={lang} langToggle={toggleLanguage} themeToggle={toggleTheme}>
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-start relative z-10 select-text overflow-x-hidden">
        
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: WELCOME INTRO */}
          {activePage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex-1 flex flex-col justify-between py-2 space-y-5"
            >
              <div className="space-y-4">
                {/* Intro Title & Tag */}
                <div className="text-center space-y-1 mt-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black leading-none bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span>{t.tagline}</span>
                  </div>
                  <h1 className="text-3xl font-black tracking-tight flex items-center justify-center gap-1 mt-1 text-stone-850 dark:text-white">
                    {t.title} <span className="text-emerald-550 dark:text-emerald-400">{t.subTitle}</span>
                  </h1>
                </div>

                {/* Friendly Character Integration */}
                <MascotBubble 
                  type="welcome"
                  message={t.counselorBubbleIntro}
                  theme={theme}
                />

                {/* Minimalist interactive feature boxes for teenagers */}
                <div className="grid grid-cols-1 gap-2.5">
                  <div className={`p-3.5 rounded-2xl border flex items-center gap-3 transition ${
                    theme === "light" ? "bg-white border-stone-200" : "bg-neutral-900/60 border-violet-950/40"
                  }`}>
                    <span className="text-xl shrink-0">🎯</span>
                    <div className="text-left">
                      <h4 className={`text-xs font-black ${theme === "light" ? "text-stone-800" : "text-white"}`}>
                        {lang === "ko" ? "나에게 최적화된 전공 처방" : "Customized Academic Prescriptions"}
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                        {lang === "ko" ? "선호 과목과 관심사를 토대로 꼭 맞는 대학 전공 분석" : "Match core fields driven by your high school courses"}
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl border flex items-center gap-3 transition ${
                    theme === "light" ? "bg-white border-stone-200" : "bg-neutral-900/60 border-violet-950/40"
                  }`}>
                    <span className="text-xl shrink-0">🔮</span>
                    <div className="text-left">
                      <h4 className={`text-xs font-black ${theme === "light" ? "text-stone-800" : "text-white"}`}>
                        {lang === "ko" ? "차세대 신산업 & 생기부 액션 팁" : "Growth Sectors & Portfolio Action Tips"}
                      </h4>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                        {lang === "ko" ? "동아리 세부능력 특기사항 작성용 아이디어 무상 지원" : "Extract exact school report project suggestions"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action trigger button */}
              <div className="pt-2">
                <button
                  id="start-explore-btn"
                  onClick={() => setActivePage("form_interests")}
                  className="w-full relative group py-4 px-6 rounded-2xl text-white font-black text-sm tracking-wide bg-gradient-to-r from-emerald-500 via-indigo-600 to-sky-450 hover:opacity-95 shadow-lg active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.startBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <p className="text-[9px] text-center text-stone-400 mt-2.5">
                  {t.activeStatus} • Gemini Inside 🤖
                </p>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: WIZARD STEP 1 - SELECT INTERESTS */}
          {activePage === "form_interests" && (
            <motion.div
              key="form_interests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <span className="text-[10px] text-emerald-550 dark:text-emerald-400 font-black tracking-widest uppercase block">WIZARD STAGE 01</span>
                  <h2 className={`text-lg font-black tracking-tight ${theme === "light" ? "text-stone-800" : "text-white"}`}>
                    {t.interestsLabel} 💻🌟
                  </h2>
                  <p className="text-[11px] text-stone-450 mt-1 leading-snug">
                    {t.interestsDesc}
                  </p>
                </div>

                {/* Option list with less scrolling scrolling */}
                <div className="grid grid-cols-1 gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {INTEREST_POOLS.map((item) => {
                    const isSelected = selectedInterests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleInterest(item.id)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                            : theme === "light" 
                              ? "bg-white border-stone-200 hover:bg-stone-50 text-stone-700" 
                              : "bg-neutral-900/60 border-violet-950/40 hover:bg-neutral-850 text-neutral-300"
                        }`}
                      >
                        <div className="text-left pr-2">
                          <span className="text-[12px] font-black">{lang === "ko" ? item.label.ko : item.label.en}</span>
                          <p className="text-[10px] text-stone-400 mt-0.5 max-w-[280px] truncate">
                            {lang === "ko" ? item.descKo : item.descEn}
                          </p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-emerald-500 border-emerald-500 text-white" : "border-stone-300 text-transparent"
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next navigation controls */}
              <div className="pt-4 border-t border-stone-200/40 dark:border-violet-950/30 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActivePage("intro")}
                  className={`w-1/3 py-3.5 rounded-xl text-center text-xs font-black transition cursor-pointer border ${
                    theme === "light" ? "bg-stone-100 border-stone-200 text-stone-600" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                  }`}
                >
                  {t.backBtn}
                </button>
                <button
                  type="button"
                  disabled={selectedInterests.length === 0}
                  onClick={() => setActivePage("form_subjects")}
                  className="flex-1 py-3.5 bg-neutral-900 dark:bg-emerald-550 hover:opacity-90 disabled:opacity-40 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.nextBtn}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: WIZARD STEP 2 - SELECT SUBJECTS */}
          {activePage === "form_subjects" && (
            <motion.div
              key="form_subjects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <span className="text-[10px] text-emerald-550 dark:text-emerald-400 font-black tracking-widest uppercase block">WIZARD STAGE 02</span>
                  <h2 className={`text-lg font-black tracking-tight ${theme === "light" ? "text-stone-800" : "text-white"}`}>
                    {t.subjectsLabel} 📚🧬
                  </h2>
                  <p className="text-[11px] text-stone-450 mt-1 leading-snug">
                    {t.subjectsDesc}
                  </p>
                </div>

                {/* Compact grid without heavy scroll */}
                <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {SUBJECT_POOLS.map((item) => {
                    const isSelected = selectedSubjects.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleToggleSubject(item.id)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-20 ${
                          isSelected 
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                            : theme === "light" 
                              ? "bg-white border-stone-200 hover:bg-stone-50 text-stone-700" 
                              : "bg-neutral-900/60 border-violet-950/40 hover:bg-neutral-850 text-neutral-300"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[11px] font-black">{item.label}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-[9px] text-stone-450 block truncate w-full mt-1">
                          {lang === "ko" ? item.descKo : item.descEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next/Back navigations */}
              <div className="pt-4 border-t border-stone-200/40 dark:border-violet-950/50 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActivePage("form_interests")}
                  className={`w-1/3 py-3.5 rounded-xl text-center text-xs font-black transition cursor-pointer border ${
                    theme === "light" ? "bg-stone-100 border-stone-200 text-stone-600" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                  }`}
                >
                  {t.backBtn}
                </button>
                <button
                  type="button"
                  disabled={selectedSubjects.length === 0}
                  onClick={() => setActivePage("form_details")}
                  className="flex-1 py-3.5 bg-neutral-900 dark:bg-emerald-550 hover:opacity-90 disabled:opacity-40 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.nextBtn}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4: WIZARD STEP 3 - FREELINE ENTRY */}
          {activePage === "form_details" && (
            <motion.div
              key="form_details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <span className="text-[10px] text-emerald-550 dark:text-emerald-400 font-black tracking-widest uppercase block">WIZARD STAGE 03</span>
                  <h2 className={`text-lg font-black tracking-tight ${theme === "light" ? "text-stone-800" : "text-white"}`}>
                    {t.detailedTextLabel} 📝🎒
                  </h2>
                </div>

                {/* Mascot counselor tip bubble */}
                <MascotBubble 
                  type="astronaut"
                  message={t.counselorBubbleForm}
                  theme={theme}
                />

                {/* Free Text Input */}
                <div className="relative">
                  <textarea
                    value={detailedInput}
                    onChange={(e) => setDetailedInput(e.target.value)}
                    placeholder={t.detailedTextPlaceholder}
                    rows={4}
                    className={`w-full text-xs p-3.5 rounded-2xl border transition focus:outline-none placeholder:text-stone-500 leading-relaxed ${
                      theme === "light" 
                        ? "bg-white border-stone-200 focus:border-emerald-400 text-stone-800" 
                        : "bg-[#0c0d29]/40 border-violet-950/70 focus:border-emerald-500 text-neutral-100"
                    }`}
                    maxLength={300}
                  />
                  <span className="absolute bottom-3 right-3 text-[9px] text-stone-500">
                    {detailedInput.length}/300 {t.charLimit}
                  </span>
                </div>

                {/* Quick auto pilot autofill */}
                <button
                  type="button"
                  onClick={handleQuickPopulate}
                  className={`w-full py-2.5 border border-dashed rounded-xl text-[10px] font-black transition cursor-pointer ${
                    theme === "light" 
                      ? "border-amber-450 bg-amber-50 text-amber-700 hover:bg-amber-100/55" 
                      : "border-emerald-500/30 bg-emerald-550/5 text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                >
                  {t.quickFillBtn}
                </button>
              </div>

              {/* Process analysis launcher */}
              <div className="pt-4 border-t border-stone-200/40 dark:border-violet-950/50 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActivePage("form_subjects")}
                  className={`w-1/3 py-3.5 rounded-xl text-center text-xs font-black transition cursor-pointer border ${
                    theme === "light" ? "bg-stone-100 border-stone-200 text-stone-600" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                  }`}
                >
                  {t.backBtn}
                </button>
                <button
                  type="button"
                  onClick={handleSearchCareer}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
                >
                  <span>{t.doneBtn}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: COMIC DIALOG LOADER */}
          {activePage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center items-center space-y-6 py-6"
            >
              {/* Floating Orbiting Astronaut Turtle */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-dashed border-emerald-500/40 rounded-full animate-[spin_12s_linear_infinite]" />
                <div className="absolute inset-2 border border-sky-400/25 rounded-full" />
                <motion.img
                  animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  src={astronautMascot}
                  alt="Loading Counselor"
                  className="w-24 h-24 object-contain rounded-full shadow-inner bg-stone-100 dark:bg-neutral-950/50 p-2.5 border border-emerald-500/25"
                  onError={(e) => {
                    e.currentTarget.src = counsellorMascot;
                  }}
                />
              </div>

              {/* Status information */}
              <div className="space-y-2 text-center max-w-xs">
                <span className="text-[9px] tracking-widest font-black uppercase text-emerald-555 dark:text-emerald-400 animate-pulse">
                  {t.loadingTitle}
                </span>
                
                {/* Speech advice from turtle */}
                <div className={`p-4 rounded-2xl text-xs leading-relaxed transition ${
                  theme === "light" ? "bg-white text-stone-700 border border-stone-200" : "bg-[#090724] border border-violet-950/60 text-neutral-300"
                }`}>
                  <p className="font-semibold italic">
                    "{loadingTips[loadingTipIndex]}"
                  </p>
                </div>
              </div>

              {/* Progress Level bar */}
              <div className="w-48 h-1.5 rounded-full overflow-hidden border bg-stone-200 dark:bg-neutral-900 border-stone-300 dark:border-neutral-850">
                <motion.div
                  initial={{ width: "3%" }}
                  animate={{ width: "95%" }}
                  transition={{ duration: 8, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500"
                />
              </div>
            </motion.div>
          )}

          {/* SCREEN 6: CORE RESULTS ADVICE LAYER */}
          {activePage === "results" && recommendation && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-2"
            >
              {/* Safe exception warning banner */}
              {apiError && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-neutral-100 text-[10px] rounded-xl flex items-center gap-2">
                  <BadgeInfo className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Matching Profile Small Pill Summary */}
              <div className={`p-3.5 rounded-2xl border ${
                theme === "light" ? "bg-white border-stone-250/70" : "bg-neutral-900/40 border-violet-950/40"
              }`}>
                <div className="flex items-center justify-between border-b border-stone-200/50 dark:border-violet-950/30 pb-2 mb-2">
                  <span className="text-[10px] font-black uppercase text-stone-450">STUDENT MAP SUMMARY</span>
                  <span className="text-[9px] font-bold text-emerald-500 font-mono">BILINGUAL STACK</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <p className="truncate text-stone-450"><strong className="text-stone-600 dark:text-neutral-300">관심 | Interests:</strong> {selectedInterests.map(i => i.split("/")[0]).join(", ")}</p>
                  <p className="truncate text-stone-450"><strong className="text-stone-600 dark:text-neutral-300">과목 | Courses:</strong> {selectedSubjects.map(translateSubject).join(", ")}</p>
                </div>
              </div>

              {/* Step Navigation bar (1. Majors -> 2. Industries -> 3. Careers -> 4. Portfolio) */}
              <div className={`p-1 rounded-2xl border flex items-center justify-between shadow-sm ${
                theme === "light" ? "bg-stone-100/55 border-stone-200" : "bg-[#040212] border-violet-950/65"
              }`}>
                <button
                  type="button"
                  onClick={() => setResultsStep("majors")}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all cursor-pointer ${
                    resultsStep === "majors" || resultsStep === "major-detail"
                      ? "bg-emerald-500 text-white shadow"
                      : "text-stone-450 dark:text-[#a2a0c4] hover:text-emerald-500"
                  }`}
                >
                  {lang === "ko" ? "1. 추천학과" : "1. Majors"}
                </button>
                <span className="text-stone-300 h-3 border-l border-stone-300/40" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIndustryIndex(0);
                    setResultsStep("industries");
                  }}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all cursor-pointer ${
                    resultsStep === "industries"
                      ? "bg-sky-500 text-neutral-950 shadow"
                      : "text-stone-450 dark:text-[#a2a0c4] hover:text-sky-455"
                  }`}
                >
                  {lang === "ko" ? "2. 연계산업" : "2. Markets"}
                </button>
                <span className="text-stone-300 h-3 border-l border-stone-300/40" />
                <button
                  type="button"
                  onClick={() => {
                    setExpandedCareerIndex(0);
                    setResultsStep("careers");
                  }}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all cursor-pointer ${
                    resultsStep === "careers"
                      ? "bg-rose-500 text-white shadow"
                      : "text-stone-450 dark:text-[#a2a0c4] hover:text-rose-455"
                  }`}
                >
                  {lang === "ko" ? "3. 미래직업" : "3. Jobs"}
                </button>
                <span className="text-stone-300 h-3 border-l border-stone-300/40" />
                <button
                  type="button"
                  onClick={() => setResultsStep("portfolio")}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all cursor-pointer ${
                    resultsStep === "portfolio"
                      ? "bg-violet-600 text-white shadow"
                      : "text-stone-450 dark:text-[#a2a0c4] hover:text-violet-555"
                  }`}
                >
                  {lang === "ko" ? "4. 보관함" : "4. Deck"}
                </button>
              </div>

              {/* results parts content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: INTEGRATED RECOMMENDED MAJORS COMPONENT */}
                  {(resultsStep === "majors" || resultsStep === "major-detail") && (
                    <motion.div
                      key="step_integrated_majors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      {/* Interactive slide pills list for Majors */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold tracking-wider text-stone-400 uppercase block text-left">💡 {t.recommendedMajorsLabel} ({recommendation.recommendedMajors.length})</span>
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {recommendation.recommendedMajors.map((m, idx) => {
                            const isBookmarked = bookmarkedMajors.includes(m.name);
                            return (
                              <button
                                key={m.name}
                                type="button"
                                onClick={() => {
                                  setSelectedMajorIndex(idx);
                                  setSelectedIndustryIndex(0);
                                  setResultsStep("majors");
                                }}
                                className={`px-3 py-1.5 text-[10px] font-black rounded-full shrink-0 border transition-all flex items-center gap-1 cursor-pointer ${
                                  selectedMajorIndex === idx 
                                    ? "bg-emerald-500 text-white border-emerald-555 shadow-sm"
                                    : theme === "light"
                                      ? "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                                      : "bg-[#0c092c] border-violet-950/40 text-neutral-300 hover:bg-violet-950/20"
                                }`}
                              >
                                🎓 {m.name}
                                {isBookmarked && <span className="text-rose-500 text-[10px]">♥</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Active Major detail card rendering */}
                      {recommendation.recommendedMajors[selectedMajorIndex] && (() => {
                        const activeMajor = recommendation.recommendedMajors[selectedMajorIndex];
                        const isBookmarked = bookmarkedMajors.includes(activeMajor.name);
                        return (
                          <div className={`p-4 rounded-3xl border space-y-3 text-left relative ${
                            theme === "light" ? "bg-white border-stone-250/60 shadow-sm" : "bg-neutral-900 border-neutral-850 shadow-md"
                          }`}>
                            <div className="flex justify-between items-start gap-2 border-b border-stone-150/50 dark:border-neutral-800 pb-2">
                              <div>
                                <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-455 border border-emerald-500/20">
                                  🏆 {translateCategory(activeMajor.category)}
                                </span>
                                <h3 className="text-xs md:text-sm font-black text-stone-850 dark:text-neutral-100 mt-1">{activeMajor.name}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleBookmarkMajor(activeMajor.name)}
                                className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                                  isBookmarked 
                                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/30" 
                                    : "bg-neutral-950/5 dark:bg-neutral-950 text-stone-400 border border-transparent hover:text-rose-500"
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-rose-500 text-[#f43f5e]" : ""}`} />
                              </button>
                            </div>

                            {/* Spec matching metrics */}
                            <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-stone-100/50 dark:bg-neutral-950/40 text-[9px]">
                              <div>
                                <span className="text-stone-400 block font-bold mb-0.5">TARGET MATCH RATE 🎯</span>
                                <span className="font-extrabold text-[#1ea76a] font-mono">98.5% STACK</span>
                              </div>
                              <div>
                                <span className="text-stone-400 block font-bold mb-0.5">RECOMMEND LEVEL 🔥</span>
                                <span className="font-extrabold text-amber-500 font-mono">EXCELLENT</span>
                              </div>
                            </div>

                            {/* Description paragraph */}
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">📚 {lang === "ko" ? "학과 소개" : "Core Description"}</span>
                              <p className="text-[10.5px] text-stone-500 dark:text-neutral-300 leading-relaxed font-sans">{activeMajor.description}</p>
                            </div>

                            {/* Suggested subjects */}
                            {activeMajor.suggestedSubjects && activeMajor.suggestedSubjects.length > 0 && (
                              <div className="space-y-1 pt-1.5 border-t border-stone-100 dark:border-neutral-800">
                                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">📐 {lang === "ko" ? "권장 이수 과목" : "Recommended Courses"}</span>
                                <div className="flex flex-wrap gap-1">
                                  {activeMajor.suggestedSubjects.map(sub => (
                                    <span key={sub} className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/15 text-[9px] font-bold">
                                      {sub}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Counselor recommendation quote banner */}
                            <div className="pt-2 border-t border-stone-100 dark:border-neutral-800">
                              <MascotBubble 
                                type="counsellor"
                                message={activeMajor.whyRecommended}
                                theme={theme}
                                bubbleBgClass={theme === 'light' ? 'bg-emerald-550/5 text-stone-800 text-[10px]' : 'bg-emerald-500/10 text-neutral-200 border border-emerald-500/15 text-[10px]'}
                              />
                            </div>

                            {/* Direct Action Link to Next Step */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedIndustryIndex(0);
                                setResultsStep("industries");
                              }}
                              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 via-emerald-450 to-sky-400 text-neutral-950 font-black text-xs rounded-2xl flex items-center justify-center gap-1 cursor-pointer transition shadow hover:opacity-95"
                            >
                              <span>{t.nextIndustriesBtn}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}

                  {/* STEP 2: COGNATE GROWTH INDUSTRIES */}
                  {resultsStep === "industries" && recommendation.recommendedMajors[selectedMajorIndex] && (
                    <motion.div
                      key="step_industries"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 text-left"
                    >
                      {/* Interactive slide pills list for Industries */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold tracking-wider text-stone-400 uppercase block text-left">💡 {lang === "ko" ? "연계 신산업 분야" : "Linked Fields"} ({recommendation.recommendedMajors[selectedMajorIndex].industries.length})</span>
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {recommendation.recommendedMajors[selectedMajorIndex].industries.map((ind, idx) => {
                            const isBookmarked = bookmarkedIndustries.includes(ind.name);
                            return (
                              <button
                                key={ind.name}
                                type="button"
                                onClick={() => {
                                  setSelectedIndustryIndex(idx);
                                }}
                                className={`px-3 py-1.5 text-[10px] font-black rounded-full shrink-0 border transition-all flex items-center gap-1 cursor-pointer ${
                                  selectedIndustryIndex === idx 
                                    ? "bg-sky-500 text-neutral-950 border-sky-600 shadow-sm"
                                    : theme === "light"
                                      ? "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                                      : "bg-[#0c092c] border-violet-950/40 text-neutral-300 hover:bg-violet-950/20"
                                }`}
                              >
                                🏭 {ind.name}
                                {isBookmarked && <span className="text-amber-500 text-[10px]">★</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Active Industry detailed card */}
                      {recommendation.recommendedMajors[selectedMajorIndex].industries[selectedIndustryIndex] && (() => {
                        const activeIndustry = recommendation.recommendedMajors[selectedMajorIndex].industries[selectedIndustryIndex];
                        const isBookmarked = bookmarkedIndustries.includes(activeIndustry.name);
                        return (
                          <div className={`p-4 rounded-3xl border space-y-3.5 text-left relative ${
                            theme === "light" ? "bg-white border-stone-250/60 shadow-sm" : "bg-neutral-900 border-neutral-850 shadow-md"
                          }`}>
                            <div className="flex justify-between items-start gap-2 border-b border-stone-150/50 dark:border-neutral-800 pb-2">
                              <div>
                                <span className="px-2 py-0.5 rounded-md text-[8px] font-black bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/15 uppercase tracking-wide">
                                  💡 NEW TRANS-SECTOR #0{selectedIndustryIndex + 1}
                                </span>
                                <h3 className="text-sm font-black text-stone-850 dark:text-neutral-100 mt-1">{activeIndustry.name}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleBookmarkIndustry(activeIndustry.name)}
                                className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                                  isBookmarked 
                                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/30" 
                                    : "bg-neutral-950/5 dark:bg-neutral-950 text-stone-400 border border-transparent hover:text-rose-500"
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-rose-500 text-rose-500" : ""}`} />
                              </button>
                            </div>

                            {/* Industry info */}
                            <div className="space-y-1">
                              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">📝 {lang === "ko" ? "신산업 핵심 소개" : "Industry Blueprint"}</span>
                              <p className="text-[10.5px] text-stone-500 dark:text-neutral-300 leading-relaxed font-sans">{activeIndustry.description}</p>
                            </div>

                            {/* Market Prospect */}
                            <div className="space-y-1 border-t border-stone-100 dark:border-neutral-800 pt-2.5">
                              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">📈 {lang === "ko" ? "미래 핵심 전망과 성장성" : "Market Outlook Metrics"}</span>
                              <span className="text-stone-700 dark:text-sky-300 font-extrabold text-[10.5px] block">
                                {activeIndustry.prospect}
                              </span>
                            </div>

                            {/* Direct Action Link to Next Step */}
                            <button
                              type="button"
                              onClick={() => {
                                setExpandedCareerIndex(0);
                                setResultsStep("careers");
                              }}
                              className="w-full py-2.5 bg-gradient-to-r from-sky-400 to-emerald-450 text-neutral-950 font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer shadow hover:opacity-95"
                            >
                              <span>{t.nextCareersBtn}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}

                  {/* STEP 3: REPRESENTATIVE FUTURE JOBS & RATINGS */}
                  {resultsStep === "careers" && recommendation.recommendedMajors[selectedMajorIndex]?.industries?.[selectedIndustryIndex] && (
                    <motion.div
                      key="step_careers"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 text-left"
                    >
                      {/* Interactive slide pills list for Careers */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold tracking-wider text-stone-400 uppercase block text-left">💼 {lang === "ko" ? "미래 핵심 직업 카드" : "Future Target Jobs"} ({recommendation.recommendedMajors[selectedMajorIndex].industries[selectedIndustryIndex].careers.length})</span>
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {recommendation.recommendedMajors[selectedMajorIndex].industries[selectedIndustryIndex].careers.map((car, idx) => {
                            const isBookmarked = bookmarkedCareers.includes(car.name);
                            return (
                              <button
                                key={car.name}
                                type="button"
                                onClick={() => {
                                  setExpandedCareerIndex(idx);
                                }}
                                className={`px-3 py-1.5 text-[10px] font-black rounded-full shrink-0 border transition-all flex items-center gap-1 cursor-pointer ${
                                  expandedCareerIndex === idx 
                                    ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                                    : theme === "light"
                                      ? "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                                      : "bg-[#0c092c] border-violet-950/40 text-neutral-300 hover:bg-violet-950/20"
                                }`}
                              >
                                💼 {car.name}
                                {isBookmarked && <span className="text-rose-500 text-[10px]">♥</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Active Career Card rendering */}
                      {recommendation.recommendedMajors[selectedMajorIndex].industries[selectedIndustryIndex].careers[expandedCareerIndex] && (() => {
                        const activeCareer = recommendation.recommendedMajors[selectedMajorIndex].industries[selectedIndustryIndex].careers[expandedCareerIndex];
                        const isBookmarked = bookmarkedCareers.includes(activeCareer.name);
                        const blueprint = getExtendedCareerBlueprint(activeCareer.name, lang);
                        return (
                          <div className={`p-4 rounded-3xl border space-y-3 text-left relative ${
                            theme === "light" ? "bg-white border-stone-250/60 shadow-sm" : "bg-neutral-900 border-neutral-850 shadow-md"
                          }`}>
                            <div className="flex justify-between items-start gap-2 border-b border-stone-150/50 dark:border-neutral-800 pb-2">
                              <div>
                                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/10">
                                  Future Job Specs
                                </span>
                                <h3 className="text-sm font-black text-stone-850 dark:text-neutral-100 mt-1">{activeCareer.name}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleBookmarkCareer(activeCareer.name)}
                                className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                                  isBookmarked 
                                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/30" 
                                    : "bg-neutral-950/5 dark:bg-neutral-950 text-stone-400 border border-transparent hover:text-rose-500"
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isBookmarked ? "fill-rose-500 text-rose-500" : ""}`} />
                              </button>
                            </div>

                            <p className="text-[10.5px] text-stone-500 dark:text-neutral-300 leading-relaxed font-sans">{activeCareer.description}</p>

                            {/* Info grid */}
                            <div className="grid grid-cols-2 gap-2 text-[9px] border-t border-stone-100 dark:border-neutral-800 pt-2.5">
                              <div>
                                <span className="text-[8px] uppercase font-black text-stone-400 block mb-0.5">⚙️ {lang === 'ko' ? "실무 핵심 전공 영역" : "Core Duties Blueprint"}</span>
                                <span className="text-stone-700 dark:text-stone-300 font-medium block truncate max-w-[140px]">
                                  {blueprint.coreTask}
                                </span>
                              </div>
                              <div className="border-l pl-2 border-stone-150 dark:border-neutral-850">
                                <span className="text-[8px] uppercase font-black text-stone-400 block mb-0.5">📚 {lang === 'ko' ? "권장 세특 도서" : "Target Reading Books"}</span>
                                <span className="text-stone-700 dark:text-stone-300 font-bold block truncate max-w-[140px]">
                                  {blueprint.books.join(", ")}
                                </span>
                              </div>
                            </div>

                            {/* Action tactics suggestions */}
                            <div className="p-2.5 bg-stone-50/50 dark:bg-neutral-950/30 rounded-xl text-[9px] text-stone-500 dark:text-stone-450 border border-stone-150 dark:border-neutral-850">
                              <span className="text-[8px] uppercase font-black text-sky-50 block mb-0.5 text-sky-500">🎯 {lang === 'ko' ? "고교 연계 활동과 과제 제안" : "High School Challenge Action"}</span>
                              <p className="text-[8.5px] leading-normal text-stone-700 dark:text-neutral-300">
                                {blueprint.tactics}
                              </p>
                            </div>

                            {/* Counselor speech bubble tips */}
                            <div className="p-2.5 rounded-xl border border-dashed border-emerald-500/20 bg-emerald-500/5 text-[9.5px] text-stone-600 dark:text-neutral-300">
                              <span className="font-extrabold text-emerald-500 block mb-0.5">🐢 {t.turtleTipLabel}</span>
                              <p className="italic">"{activeCareer.turtleTip}"</p>
                            </div>

                            {/* Direct Action Link to Next Step */}
                            <button
                              type="button"
                              onClick={() => {
                                setResultsStep("portfolio");
                              }}
                              className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer shadow hover:opacity-95"
                            >
                              <span>{lang === 'ko' ? "나의 진로 보관함 확인하기 📂" : "View My Saved Career Deck 📂"}</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}

                  {resultsStep === "portfolio" && (
                    <motion.div
                      key="step_portfolio"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3.5 text-left"
                    >
                      {/* PERSONALIZED ACCUMULATED REPORT (POCKET DESIGN) */}
                      <div className={`p-4 rounded-3xl border text-left space-y-3.5 transition-all duration-300 ${
                        theme === "light" 
                          ? "bg-slate-50/70 border-stone-200 shadow-sm" 
                          : "bg-neutral-900 border-neutral-850 shadow-md"
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <Bookmark className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                          <div>
                            <h4 className="text-xs font-black text-stone-850 dark:text-neutral-50 flex items-center gap-1.5">
                              <span>{t.bookmarkHeader}</span>
                              <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 uppercase">Core Deck</span>
                            </h4>
                            <p className="text-[9px] text-stone-400 tracking-tight">{t.portfolioAutoNotice}</p>
                          </div>
                        </div>

                        {/* Micro capsule counters */}
                        <div className="grid grid-cols-3 gap-1.5 text-[9px] font-black">
                          <div className={`p-1.5 rounded-lg text-center ${theme === "light" ? "bg-white text-stone-700 border" : "bg-[#090724] text-neutral-300 border border-violet-950/20"}`}>
                            <span className="block text-stone-500">🎓 {lang === "ko" ? "선택 학과" : "Majors"}</span>
                            <span className="text-emerald-500 font-mono text-xs">{activeBookmarkedMajors.length}</span>
                          </div>
                          <div className={`p-1.5 rounded-lg text-center ${theme === "light" ? "bg-white text-stone-700 border" : "bg-[#090724] text-neutral-300 border border-violet-950/20"}`}>
                            <span className="block text-stone-500">🏭 {lang === "ko" ? "신산업" : "Industries"}</span>
                            <span className="text-sky-400 font-mono text-xs">{activeBookmarkedIndustries.length}</span>
                          </div>
                          <div className={`p-1.5 rounded-lg text-center ${theme === "light" ? "bg-white text-stone-700 border" : "bg-[#090724] text-neutral-300 border border-violet-950/20"}`}>
                            <span className="block text-stone-500">💼 목표 직업</span>
                            <span className="text-rose-400 font-mono text-xs">{activeBookmarkedCareers.length}</span>
                          </div>
                        </div>

                        {/* 1. Saved Majors List */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">🎓 {lang === "ko" ? "선택 대학 학과" : "My Majors"} ({activeBookmarkedMajors.length})</span>
                          <div className="flex flex-wrap gap-1 max-h-[55px] overflow-y-auto pr-1">
                            {activeBookmarkedMajors.length === 0 ? (
                              <span className="text-[9px] text-stone-400 italic">{lang === 'ko' ? '찜한 학과가 없습니다.' : 'No pinned majors.'}</span>
                            ) : (
                              activeBookmarkedMajors.map(name => (
                                <div key={name} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  <span>{name}</span>
                                  <button 
                                    onClick={() => toggleBookmarkMajor(name)} 
                                    className="w-3.5 h-3.5 rounded-full hover:bg-emerald-555/15 flex items-center justify-center text-rose-550 font-bold transition select-none cursor-pointer"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* 2. Saved Industries List */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">🏭 {lang === "ko" ? "목표 성장 산업" : "My Industries"} ({activeBookmarkedIndustries.length})</span>
                          <div className="flex flex-wrap gap-1 max-h-[55px] overflow-y-auto pr-1">
                            {activeBookmarkedIndustries.length === 0 ? (
                              <span className="text-[9px] text-stone-400 italic">{lang === 'ko' ? '찜한 산업이 없습니다.' : 'No pinned industries.'}</span>
                            ) : (
                              activeBookmarkedIndustries.map(name => (
                                <div key={name} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] bg-sky-500/10 text-sky-600 dark:text-sky-450 border border-sky-500/25">
                                  <span>{name}</span>
                                  <button 
                                    onClick={() => toggleBookmarkIndustry(name)} 
                                    className="w-3.5 h-3.5 rounded-full hover:bg-sky-550/15 flex items-center justify-center text-rose-550 font-bold transition select-none cursor-pointer"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* 3. Saved Careers List */}
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">💼 {lang === "ko" ? "겨냥할 미래 직업" : "My Careers"} ({activeBookmarkedCareers.length})</span>
                          <div className="flex flex-wrap gap-1 max-h-[55px] overflow-y-auto pr-1">
                            {activeBookmarkedCareers.length === 0 ? (
                              <span className="text-[9px] text-stone-400 italic">{lang === 'ko' ? '찜한 직무가 없습니다.' : 'No pinned careers.'}</span>
                            ) : (
                              activeBookmarkedCareers.map(name => (
                                <div key={name} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] bg-rose-500/10 text-rose-600 dark:text-rose-450 border border-rose-500/20">
                                  <span>{name}</span>
                                  <button 
                                    onClick={() => toggleBookmarkCareer(name)} 
                                    className="w-3.5 h-3.5 rounded-full hover:bg-rose-550/15 flex items-center justify-center text-rose-550 font-bold transition select-none cursor-pointer"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* 4. Commitment Memo Texarea */}
                        <div className="space-y-1 pt-1">
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">✏️ {lang === "ko" ? "나의 진로 다짐 한 줄 메모" : "My Commitment Memo"}</span>
                          <textarea
                            value={personalMemo}
                            onChange={(e) => {
                              setPersonalMemo(e.target.value);
                              localStorage.setItem("turtle_personal_memo", e.target.value);
                            }}
                            placeholder={lang === "ko" ? "예시: 과학동아리에서 이 학과와 관련된 인공지능 제어 연구를 연계해보겠어!" : "e.g. I will research quantum robotics in my physics club!"}
                            rows={2}
                            maxLength={150}
                            className={`w-full text-[11px] p-2 rounded-xl border focus:outline-none placeholder:text-stone-550 ${
                              theme === "light"
                                ? "bg-white border-stone-200 text-stone-800 focus:border-emerald-400"
                                : "bg-neutral-900 border-neutral-850 text-neutral-200 focus:border-emerald-500"
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={handlePrintReport}
                className="w-full py-2.5 rounded-xl font-black text-[11px] bg-gradient-to-r from-sky-450 via-emerald-450 to-indigo-500 hover:opacity-95 text-neutral-950 flex items-center justify-center gap-1 shadow cursor-pointer shadow-sky-500/10"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.printBtn}</span>
              </button>

              {/* RE-ENTER BUTTON */}
              <div className="pt-2 text-center">
                <button
                  onClick={handleResetFlow}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-wide border transition-all cursor-pointer ${
                    theme === "light" 
                      ? "bg-white border-stone-300 text-stone-600 hover:bg-stone-50" 
                      : "bg-[#0c0a25] border-violet-950/40 text-neutral-300 hover:bg-violet-950/20"
                  }`}
                >
                  {t.reExploreBtn}
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* =======================================================
          PRINTING MEDIA COMPLIANT REPORT (Premium roadmap layout)
         ======================================================= */}
      {(() => {
        const bookmarkedMajorObjects = (recommendation?.recommendedMajors || []).filter(m => bookmarkedMajors.includes(m.name));
        const bookmarkedIndustryObjects: any[] = [];
        const bookmarkedCareerObjects: any[] = [];

        (recommendation?.recommendedMajors || []).forEach(m => {
          (m.industries || []).forEach(ind => {
            if (bookmarkedIndustries.includes(ind.name)) {
              if (!bookmarkedIndustryObjects.some(item => item.name === ind.name)) {
                bookmarkedIndustryObjects.push(ind);
              }
            }
            (ind.careers || []).forEach(car => {
              if (bookmarkedCareers.includes(car.name)) {
                if (!bookmarkedCareerObjects.some(item => item.name === car.name)) {
                  bookmarkedCareerObjects.push(car);
                }
              }
            });
          });
        });

        return (
          <div className="hidden print:block bg-white text-black p-10 font-sans text-xs space-y-8" style={{ color: "#000", backgroundColor: "#fff" }}>
            <div className="border-4 border-double border-black p-8 space-y-8 rounded-none">
              
              {/* Header block with elegant outline */}
              <div className="border-b-2 border-black pb-4 text-center space-y-2 relative">
                <div className="absolute top-0 right-0 text-[7px] font-mono border border-black px-1.5 py-0.5 uppercase tracking-wider">
                  Official Dossier
                </div>
                <div className="text-[9px] font-black tracking-widest uppercase border border-black inline-block px-3 py-1 bg-stone-50">
                  생기부 설계 전용 AI 진로 보고서 (College Roadmap &amp; Activity Guide)
                </div>
                <h1 className="text-3xl font-black mt-2 font-serif tracking-tight text-neutral-900">나의 맞춤형 미래 진로 계획 처방전 &lt;터틀보이&gt;</h1>
                <p className="text-[10px] text-stone-600 font-medium max-w-xl mx-auto leading-relaxed">
                  본 진로 설계안은 학생이 선택한 고교 탐구 관심사와 강점 과목을 기반으로 수십만 개 고교 세특 백서 데이터를 머신러닝 연산 분석해 생성되었습니다. 나의 보관함 데이터를 바탕으로 진로 학업 계획서 및 대입 처방을 획득하십시오.
                </p>
              </div>

              {/* Profile */}
              <div className="border border-stone-300 rounded-none overflow-hidden">
                <div className="bg-stone-50 px-3 py-1.5 border-b border-stone-300 flex justify-between items-center font-bold">
                  <span className="text-[10px] uppercase text-stone-850">01. 나의 고교 학습 프로파일 (School Record Profile)</span>
                  <span className="text-[8px] text-stone-450 font-mono">CODE: {new Date().getTime().toString(16).toUpperCase()}</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 text-[10.5px]">
                  <div className="space-y-1">
                    <span className="text-stone-450 font-bold block text-[9px] uppercase tracking-wide">해당 관심 영역 (Interests):</span>
                    <p className="font-bold text-stone-900">{selectedInterests.join(", ") || "내용 없음"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-stone-450 font-bold block text-[9px] uppercase tracking-wide">익숙하거나 잘하는 과목 (Courses):</span>
                    <p className="font-bold text-stone-950">{selectedSubjects.join(", ") || "내용 없음"}</p>
                  </div>
                  {detailedInput && (
                    <div className="col-span-2 pt-2 border-t border-stone-200">
                      <span className="text-stone-450 font-bold block text-[9px] uppercase tracking-wide">추가 서술 학습 활동 및 동아리 배경 (Activity Details):</span>
                      <p className="text-stone-800 italic mt-1 bg-stone-50 p-2 border border-dashed border-stone-200 text-[10px] leading-relaxed">
                        "{detailedInput}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Majors */}
              {bookmarkedMajorObjects.length > 0 && (
                <div className="space-y-3">
                  <div className="border-b border-black pb-1">
                    <h3 className="text-xs font-black uppercase text-stone-950">02. 맞춤 대학 전공 설계안 (Target University Major Spec Sheets)</h3>
                  </div>
                  <div className="space-y-4">
                    {bookmarkedMajorObjects.map((maj: any, mIdx: number) => (
                      <div key={maj.name} className="border border-stone-300 p-4 space-y-2.5">
                        <div className="flex justify-between items-center border-b pb-1.5">
                          <span className="font-extrabold text-[12px] text-stone-900">🎓 전공 #{mIdx + 1}: {maj.name}</span>
                          <span className="text-[8.5px] font-bold bg-stone-50 text-stone-800 px-2 py-0.5 rounded border">
                            {maj.category}
                          </span>
                        </div>
                        <div className="text-[10.5px] leading-relaxed text-stone-850 space-y-1.5">
                          <p className="font-sans font-medium"><strong className="text-stone-500">학과 인트로 가이드:</strong> {maj.description}</p>
                          <p className="p-2 bg-emerald-50/50 border border-emerald-100 rounded text-stone-800 font-bold italic">
                            <strong className="text-emerald-700 not-italic">추천 사유:</strong> {maj.whyRecommended}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-stone-500 shrink-0">권장 이수 과목:</strong>
                            <div className="flex gap-1.5">
                              {maj.subjectsRelated.map((sub: string) => (
                                <span key={sub} className="px-1.5 py-0.2 text-[8.5px] font-mono border border-stone-300 bg-stone-100 rounded text-stone-700">
                                  #{sub}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries */}
              {bookmarkedIndustryObjects.length > 0 && (
                <div className="space-y-3">
                  <div className="border-b border-black pb-1">
                    <h3 className="text-xs font-black uppercase text-stone-950">03. 타겟 대비 미래 신성장 산업군 가치평가 (Target Future Markets Outlook)</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {bookmarkedIndustryObjects.map((ind: any, iIdx: number) => (
                      <div key={ind.name} className="border border-stone-300 p-3.5 space-y-1.5">
                        <h4 className="font-extrabold text-[11px] text-stone-900 flex justify-between">
                          <span>🏭 미래성장 시장 #{iIdx + 1}: {ind.name}</span>
                          <span className="text-[8px] text-sky-650 font-bold tracking-wider">PROSPECT EXCELLENT</span>
                        </h4>
                        <p className="text-[10px] text-stone-700 leading-relaxed font-sans">{ind.description}</p>
                        <p className="text-[9.5px] text-stone-500 border-t pt-1 border-dashed border-stone-200">
                          <strong>🚀 산업 성장동력 및 취업 전망지표:</strong> {ind.prospect}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Careers */}
              {bookmarkedCareerObjects.length > 0 && (
                <div className="space-y-3">
                  <div className="border-b border-black pb-1">
                    <h3 className="text-xs font-black uppercase text-stone-950">04. 미래 집중 탐구 직무 및 세특 연계 액션 가이드 (Future Careers &amp; Syllabus Blueprint)</h3>
                  </div>
                  <div className="space-y-4">
                    {bookmarkedCareerObjects.map((car: any, cIdx: number) => {
                      const blueprint = getExtendedCareerBlueprint(car.name, lang);
                      return (
                        <div key={car.name} className="border border-stone-300 rounded-none overflow-hidden">
                          <div className="bg-stone-50 border-b p-2 px-3 flex justify-between items-center">
                            <span className="font-extrabold text-[11px] text-stone-900">💼 추천 신직무 #{cIdx + 1}: {car.name}</span>
                            <div className="flex gap-1 font-mono text-[8px]">
                              {car.neededSkills.map((sk: string) => (
                                <span key={sk} className="bg-white border px-1.5 py-0.2 rounded text-stone-600">
                                  {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="p-3.5 space-y-3 text-[10px] leading-relaxed">
                            <div>
                              <strong className="text-stone-500 font-bold block text-[8.5px] uppercase tracking-wider">직무 개요 및 역할 (Role Description):</strong>
                              <p className="text-stone-850 mt-0.5 font-medium">{car.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                              <div>
                                <strong className="text-stone-450 font-bold block text-[8.5px] uppercase tracking-wider">핵심 실무 행렬 (Core Duties Matrix):</strong>
                                <p className="text-stone-850 mt-0.5">{blueprint.coreTask}</p>
                              </div>
                              <div>
                                <strong className="text-stone-450 font-bold block text-[8.5px] uppercase tracking-wider">추천 연계 고교 세특 도서 (Recommended Reading):</strong>
                                <div className="flex flex-col gap-0.5 mt-0.5 text-stone-850 font-bold">
                                  {blueprint.books.map((b: string, idx: number) => (
                                    <span key={b}>{idx + 1}. Book: 《{b}》</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-stone-200 bg-emerald-50/25 p-2 px-3 border border-dashed border-emerald-500/10">
                              <strong className="text-emerald-700 font-black block text-[8.5px] uppercase tracking-wider">📝 터틀보이 생기부 기록용 액션 가이드 (Action Guide):</strong>
                              <p className="text-stone-900 mt-1 italic font-sans font-medium">"{car.turtleTip}"</p>
                              <p className="text-[9.5px] text-stone-700 mt-1 pt-1 border-t border-dashed border-emerald-500/10">
                                <strong>[학습과제 기획서 제안]</strong> {blueprint.tactics}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action advice */}
              <div className="border border-black p-4 space-y-4 rounded-none bg-stone-50/50">
                <h3 className="text-xs font-black uppercase text-stone-950">05. 터틀보이 생기부 비교과 전략 총평 (Counselor's Advisor's Sum-up)</h3>
                <div className="text-[10.5px] leading-relaxed space-y-3.5">
                  <div>
                    <strong className="text-stone-900 text-[10px] block">🐢 슬기로운 비교과 및 선택과목 설계 지침안:</strong>
                    <p className="mt-1 font-medium bg-white p-3 border border-stone-300 text-stone-900 leading-relaxed">
                      {recommendation?.turtleBoyAdvises || "탐색한 전공의 권장과목 세부능력 특기사항에 동아리 자유연구 결과나 독서 감상문을 함께 기재하여 자율 탐구력을 풍성히 뽐내보렴!"}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-stone-300">
                    <strong className="text-stone-900 text-[10px] block">💚 청소년 진로 멘토 터틀보이의 따뜻한 조언:</strong>
                    <p className="mt-1 italic text-stone-850">&ldquo;{recommendation?.cheeringMessage || "작은 호기심 한 조각이 먼 우주 최고의 가치 있는 비밀 신호탄이 될 거란다! 힘을 내렴!"}&rdquo;</p>
                  </div>
                  {personalMemo && (
                    <div className="pt-2 border-t border-stone-300 font-sans">
                      <strong className="text-stone-900 text-[10px] block">✏️ 나의 진로 포트폴리오 개인 메모 (My Portfolio Commitment Memo):</strong>
                      <p className="mt-1 bg-white p-3 border border-stone-300 text-stone-800 font-medium italic">&ldquo;{personalMemo}&rdquo;</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Signature block */}
              <div className="bg-stone-50 border border-stone-300 p-4 flex flex-col sm:flex-row justify-between items-center text-[9.5px] text-stone-600 gap-4 font-sans">
                <div className="space-y-0.5 text-center sm:text-left">
                  <p>발급일자: <span className="font-mono">{new Date().toLocaleDateString("ko-KR")}</span></p>
                  <p>서비스 발급 기관: <span className="font-bold">터틀보이 진로 Compass AI 포트폴리오 연구소</span></p>
                </div>
                
                {/* Visual signature boxes */}
                <div className="flex gap-4 border-l border-stone-300 pl-4">
                  <div className="text-center">
                    <p className="text-[8px] text-stone-400 uppercase tracking-widest font-bold">일련 일련번호</p>
                    <p className="font-mono font-bold text-stone-900 bg-stone-200 px-2.5 py-0.5 border mt-1 border-stone-300">
                      T-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000 + 1000)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] text-stone-400 uppercase tracking-widest text-center font-bold">신청인 확인</p>
                    <p className="font-serif border-b border-black w-24 text-center mt-1 pb-0.5 text-stone-850">
                      (서명 또는 인)
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] text-stone-400 uppercase tracking-widest text-center font-bold">자문도장</p>
                    <div className="w-8 h-8 rounded-full border border-red-500 text-red-500 flex items-center justify-center font-bold text-[8px] rotate-12 scale-90 mx-auto mt-0.5">
                      진로필
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

    </MobileFrame>
  );
}
