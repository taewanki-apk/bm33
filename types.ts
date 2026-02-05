
export interface ScoreEntry {
  roundId: string;
  score: number;
  date: string;
}

export interface Member {
  id: string;
  name: string;
  initialHandicap: number;
  scores: ScoreEntry[];
  isGuest?: boolean;
}

export interface Round {
  id: string;
  month: number;
  date: string;
  teams: Team[];
  isCompleted: boolean;
}

export interface Team {
  id: number;
  memberIds: string[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export enum TabType {
  DASHBOARD = 'DASHBOARD',
  ROUNDS = 'ROUNDS',
  RANKING = 'RANKING',
  ACCOUNTING = 'ACCOUNTING'
}
