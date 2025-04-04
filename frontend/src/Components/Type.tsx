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
  tokens: string;
  bonus: string;
  selected_level: string | null;
  created_at: string; // Для даты можно использовать строковый формат ISO
}

export interface GetInvitedUsersResponse {
  invited_users: InvitedUser[];
}

// Transactions
export interface CreateTransactionRequest {
  operation_type: 'deposit' | 'withdraw';
  amount: number; // Можно указать Decimal.js тип, если используешь его
  user_id: number;
}

// Тип для успешного ответа
export interface CreateTransactionResponse {
  message: string;
  transaction_id: number;
  status: 'completed' | 'waiting' | 'canceled';
  timestamp: string; // ISO дата-время, например: "2025-04-04T12:34:56.789Z"
}

// Leaders
interface LeaderUser {
  id: string; // Пользовательский ID как строка
  avatar: string;
  username: string; // Имя пользователя
  balance: number; // Баланс пользователя (число, так как в ответе это число)
  tokens: number; // Количество токенов (число, так как в ответе это число)
}

export interface Leader {
  id: string; // ID лидера как строка
  username: string; // Имя лидера
  avatar: string; // Ссылка на аватар
  balance: string; // Баланс в строковом формате (в ответе это строка)
  tokens: string; // Количество токенов в строковом формате (в ответе это строка)
}

export interface LeadersListResponse {
  user: LeaderUser; // Информация о текущем пользователе
  leaders: Leader[]; // Список лидеров
}

// Tasks
export interface Task {
  id: number;
  title: string;
  description: string;
  icon: string; // URL к иконке
  link: string; // Ссылка на выполнение задания
  reward_amount: number; // Награда за выполнение
}

// UPDATE USER
export interface UpdateUserRequest {
  username?: string;
  avatar?: string;
  telegram_id?: number;
  staking_stage?: number | null;
  wallet?: string | null;
  balance?: string;
  tokens?: string;
}

export interface UpdateUserResponse {
  id: number;
  username: string;
  avatar: string;
  telegram_id: number;
  staking_stage: number | null;
  wallet: string | null;
  balance: string;
  tokens: string;
}
