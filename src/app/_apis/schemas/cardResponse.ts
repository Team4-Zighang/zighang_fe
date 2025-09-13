export interface CardResponse {
  success: boolean;
  timestamp: string;
  data: boolean;
}

export interface CardShowResponse {
  timestamp: string;
  data: {
    position: string;
    cardJobPosting: {
      jobPostingId: number;
      companyImageUrl: string;
      companyName: string;
      title: string;
      career: string;
      recruitmentType: string;
      academicConditions: string;
      address: string;
      isScrap: boolean;
    };
  };
  cardOpenTime: string;
}

export interface CardShowOpenResponse {
  timestamp: string;
  position: string;
  cardJobPosting: {
    jobPostingId: number;
    companyImageUrl: string;
    companyName: string;
    title: string;
    career: string;
    recruitmentType: string;
    academicConditions: string;
    address: string;
    isScrap: boolean;
  };
  cardOpenTime: string;
}

export interface CardReplaceResponse {
  success: boolean;
  timestamp: string;
  data: boolean;
}

export interface CardScrapResponse {
  success: boolean;
  timestamp: string;
  scrapCount: number;
}

export interface ScrapResponse {
  success: boolean;
  timestamp: string;
  data: boolean;
}
