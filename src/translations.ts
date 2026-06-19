export interface TranslationSet {
  title: string;
  subTitle: string;
  tagline: string;
  startBtn: string;
  activeStatus: string;
  backBtn: string;
  nextBtn: string;
  doneBtn: string;
  resetBtn: string;
  quickFillBtn: string;
  interestsLabel: string;
  interestsDesc: string;
  subjectsLabel: string;
  subjectsDesc: string;
  detailedTextLabel: string;
  detailedTextPlaceholder: string;
  charLimit: string;
  loadingTitle: string;
  loadingSubtitle: string;
  resultsTitle: string;
  recommendations: string;
  majorsStep: string;
  industriesStep: string;
  careersStep: string;
  noBookmarkMsg: string;
  majorBookmarkTitle: string;
  industryBookmarkTitle: string;
  careerBookmarkTitle: string;
  bookmarkHeader: string;
  bookmarkDesc: string;
  printBtn: string;
  backToListBtn: string;
  matchPower: string;
  recommendedMajorsLabel: string;
  relatedSubjectsLabel: string;
  turtleTipLabel: string;
  turtleAdviseLabel: string;
  nextIndustriesBtn: string;
  nextCareersBtn: string;
  questDifficulty: string;
  highschoolNeeds: string;
  secretLifeRecord: string;
  reExploreBtn: string;
  discriptionLabel: string;
  offlineNotice: string;
  langKo: string;
  langEn: string;
  portfolioAutoNotice: string;
  syncRate: string;
  funLevel: string;
  counselorBubbleIntro: string;
  counselorBubbleForm: string;
}

export const translations: Record<"ko" | "en", TranslationSet> = {
  ko: {
    title: "터틀보이",
    subTitle: "진로 Compass 🧭",
    tagline: "청소년의 꿈을 향한 느리지만 확실한 발걸음",
    startBtn: "진로 처방전 시작하기!",
    activeStatus: "실시간 생성형 지수 연동",
    backBtn: "이전으로",
    nextBtn: "다음으로 ➔",
    doneBtn: "터틀보이 나침반 가동! 🚀",
    resetBtn: "다시 입력",
    quickFillBtn: "예시로 빠르게 채우기 ⚡",
    interestsLabel: "관심분야 선택하기",
    interestsDesc: "가장 눈길이 가고 마음이 끌리는 분야를 골라줘! (복수 선택 가능)",
    subjectsLabel: "교과목 선택하기",
    subjectsDesc: "평소 발표를 잘 하거나 흥미있게 참여한 과목을 골라줘! (복수 선택 가능)",
    detailedTextLabel: "내 성격이나 동아리 수다 들려주기",
    detailedTextPlaceholder: "예) 기후변화 탐구 동아리를 하고 있어 / 컴퓨터 프로그래밍은 기초는 아는데 아직 어려워 / 소설 읽는 걸 좋아해!",
    charLimit: "자",
    loadingTitle: "수백 개의 미래 직업 검색 중...",
    loadingSubtitle: "터틀보이가 교육부 전공 도서관을 빠른 걸음으로 걷고 있어요... 🐢📚",
    resultsTitle: "오늘 터틀보이가 그린 너의 진로 처방전! 🗺️✨",
    recommendations: "특별 주치의 추천 전공 처방",
    majorsStep: "1. 추천 학과",
    industriesStep: "2. 연계 신산업",
    careersStep: "3. 미래 직업",
    noBookmarkMsg: "카드의 하트 아이콘을 누르면 찜한 목록이 표시됩니다.",
    majorBookmarkTitle: "🎓 찜한 대학교 학과",
    industryBookmarkTitle: "🏭 찜한 신성장 산업",
    careerBookmarkTitle: "💼 목표하는 미래 직업",
    bookmarkHeader: "나의 진로 나침반 보관함 🗃️",
    bookmarkDesc: "처방 결과 중 저장하고 싶은 학과, 산업, 직업을 모아보고 인쇄할 수 있습니다.",
    printBtn: "나의 진로 포트폴리오 PDF로 저장 / 인쇄",
    backToListBtn: "목록으로 돌아가기",
    matchPower: "진로 종합 매칭 리포트 📊",
    recommendedMajorsLabel: "터틀보이 추천 대학 전공 카드",
    relatedSubjectsLabel: "이수 권장 고교과목",
    turtleTipLabel: "생기부 연계 한 줄 꿀팁",
    turtleAdviseLabel: "터틀보이 전문가 한마디 🐢💛",
    nextIndustriesBtn: "이 전공이 이끄는 신산업 월드로 🚀",
    nextCareersBtn: "직업 퀘스트 하러가기 ➔",
    questDifficulty: "퀘스트 난이도",
    highschoolNeeds: "이 직무에 도움될 파워 스템 역량",
    secretLifeRecord: "비용 없이 든든한 비교과 장부 배포",
    reExploreBtn: "처음부터 다시 디자인하기 🔄",
    discriptionLabel: "학과 초간단 분석 가이드",
    offlineNotice: "네트워크 나침반 지연으로 안전 오프라인 백서 모드로 구동됩니다. 🧭",
    langKo: "한국어",
    langEn: "English",
    portfolioAutoNotice: "활동한 전공 및 직업이 포트폴리오 결과에 실시간으로 실립니다.",
    syncRate: "내 진로 싱크로율",
    funLevel: "전공 재미 지수",
    counselorBubbleIntro: "안녕! 난 너의 든든한 진로 길잡이 터틀보이얌. 내가 너의 학교생활기록부와 미래 계획을 우주 최고로 반짝이게 만들어 줄게! 💫",
    counselorBubbleForm: "고민할 필요 없이 평소 관심사를 편하게 골라봐. 정답이 없으니 편안하게 생각하자구! 🎒✨",
  },
  en: {
    title: "Turtle Boy",
    subTitle: "Career Compass 🧭",
    tagline: "Slow yet steady strides towards your dreams",
    startBtn: "Start Career Consultation!",
    activeStatus: "Live AI Model Synced",
    backBtn: "Back",
    nextBtn: "Next ➔",
    doneBtn: "Launch Compass! 🚀",
    resetBtn: "Reset",
    quickFillBtn: "Quick Autofill ⚡",
    interestsLabel: "Select Your Interests",
    interestsDesc: "Choose the areas that spark your curiosity the most! (Multi-choice)",
    subjectsLabel: "Select Favorite Subjects",
    subjectsDesc: "Choose the school classes you enjoyed participating in most! (Multi-choice)",
    detailedTextLabel: "Tell Turtle Boy about your school vibes",
    detailedTextPlaceholder: "e.g. I participate in a green biology club / I love reading fantasy novels and writing short stories!",
    charLimit: "chars",
    loadingTitle: "Scanning Hundreds of Future Jobs...",
    loadingSubtitle: "Turtle Boy is briskly walking through the University Libraries... 🐢📚",
    resultsTitle: "Your Customized Career Prescription! 🗺️✨",
    recommendations: "Targeted Major Recommendation Profile",
    majorsStep: "1. Majors",
    industriesStep: "2. Industries",
    careersStep: "3. Future Jobs",
    noBookmarkMsg: "Click the heart icons on cards to collect your favorites here.",
    majorBookmarkTitle: "🎓 Pinned University Majors",
    industryBookmarkTitle: "🏭 Pinned Growth Industries",
    careerBookmarkTitle: "💼 Target Future Careers",
    bookmarkHeader: "My Career Compass Portfolio Locker 🗃️",
    bookmarkDesc: "Collect, customize, and print the majors, industries, and jobs that inspire you.",
    printBtn: "Save Portfolio as PDF / Print",
    backToListBtn: "Back to List",
    matchPower: "Career Matching Alignment Power 📊",
    recommendedMajorsLabel: "Recommended University Majors",
    relatedSubjectsLabel: "Recommended High School Subjects",
    turtleTipLabel: "School Activity Action Tip",
    turtleAdviseLabel: "Turtle Boy's Expert Advice 🐢💛",
    nextIndustriesBtn: "Explore Related Industries 🚀",
    nextCareersBtn: "Go to Job Quests ➔",
    questDifficulty: "Quest Difficulty",
    highschoolNeeds: "High School Target STEM Capacities",
    secretLifeRecord: "Secret Portfolio Activity Tip",
    reExploreBtn: "Re-explore / Test Again 🔄",
    discriptionLabel: "Major Brief Outlook",
    offlineNotice: "Server response delayed. Operating on safe offline advisory guidelines. 🧭",
    langKo: "한국어",
    langEn: "English",
    portfolioAutoNotice: "Discovered majors and jobs are continuously synced to your portfolio.",
    syncRate: "My Career Sync Rate",
    funLevel: "Major Joy Index",
    counselorBubbleIntro: "Hey there! I am Turtle Boy, your warm counselor. Let's make an incredible cosmic map of your high school activities and future dreams together! 💫",
    counselorBubbleForm: "No pressure at all! Just select the areas and classes you usually find interesting. There is no wrong answer! 🎒✨",
  }
};
