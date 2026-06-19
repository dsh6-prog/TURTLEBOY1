export interface Career {
  name: string;
  description: string;
  neededSkills: string[];
  turtleTip: string;
}

export interface Industry {
  name: string;
  description: string;
  prospect: string;
  careers: Career[];
}

export interface Major {
  name: string;
  category: string;
  description: string;
  whyRecommended: string;
  subjectsRelated: string[];
  industries: Industry[];
}

export interface CareerRecommendationResponse {
  studentProfile: {
    interests: string;
    subjects: string;
    detailedText?: string;
  };
  recommendedMajors: Major[];
  cheeringMessage: string;
  turtleBoyAdvises: string;
}

export interface SavedRoadmap {
  id: string;
  date: string;
  interests: string[];
  subjects: string[];
  majors: Major[];
}
