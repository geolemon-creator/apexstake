export interface FrendID {
  id: number;
  img: string;
  title: string;
  coins: number;
  bonus: number;
  ton: number;
}

export interface LeaderID {
  id: number;
  img: string;
  title: string;
  coins: number;
  bonus: number;
  ton: number;
}

export interface levelID {
  id: number;
  title: string;
  percent: number;
  img: string;
  schedule: string;
  ton: number;
}

export interface TermsID {
  id: number;
  date: number;
  period: string;
  ending: number;
  repayment: number;
  dateRepayment: string;
  bid: number;
  ton: string;
}

export interface TansactionsID {
  id: number;
  title: string;
  date: string;
  price: number;
  img: string;
}

export interface MediaID {
  id: number;
  title: string;
  coin: number;
  img: string;
}

export interface LevelModalProps {
  isLevelsListOpen: boolean;
  levelsList: LevelData[];
  selectedLevel: number | null;
  handleSelect: (id: number) => void;
  handleCloseLevelsList: () => void;
}

export interface StakingStage {
  id: number;
  stage: number;
  staking_time: number;
}

export interface LevelData {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  staking_duraton: number;
  full_rate: number;
  min_deposite: number;
  max_deposite: number;
  img: string; // Или другой тип, если `expertDiamond` — это import изображения
  level: number;
  stage: StakingStage;
  percentage: number;
}

// respoonses
export interface GetLevelsListResponse {
  levels: LevelData[];
}
