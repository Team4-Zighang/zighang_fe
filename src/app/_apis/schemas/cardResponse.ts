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
      companyImageUrl: string;
      companyName: string;
      title: string;
      career: string;
      recruitmentType: string;
      academicConditions: string;
      address: string;
    };
  };
  cardOpenTime: string;
}

export interface CardShowOpenResponse {
  timestamp: string;
  position: string;
  cardJobPosting: {
    companyImageUrl: string;
    companyName: string;
    title: string;
    career: string;
    recruitmentType: string;
    academicConditions: string;
    address: string;
  };
  cardOpenTime: string;
}
