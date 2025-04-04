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

// Staking Details
export interface UserStakingDetails {
  id: number;
  user: string;
  staking_level: number;
  amount: string;
  percentage: number;
  start_date: string; // Время в ISO 8601 формате
  end_date: string; // Время в ISO 8601 формате
  daily_earning: number;
  daily_percentage: number;
  current_day: number;
  total_days: number;
  now_date: string; // Время в ISO 8601 формате
}

// REFFERAL SYSTEM
export interface InvitedUser {
  id: string;
  username: string;
  staking_stage: number;
  avatar: string;
  wallet: string | null;
  telegram_id: number;
  balance: string; // Можно использовать string, если это число с десятичными знаками
  selected_level: string | null;
  created_at: string; // Для даты можно использовать строковый формат ISO
}

export interface GetInvitedUsersResponse {
  invited_users: InvitedUser[];
}
