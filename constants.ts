
import { Member, Round } from './types';

export const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: '주광규', initialHandicap: 84, scores: [] },
  { id: '2', name: '박연서', initialHandicap: 102, scores: [] },
  { id: '3', name: '감병섭', initialHandicap: 91, scores: [] },
  { id: '4', name: '강원희', initialHandicap: 100, scores: [] },
  { id: '5', name: '구성재', initialHandicap: 95, scores: [] },
  { id: '6', name: '금두만', initialHandicap: 100, scores: [] },
  { id: '7', name: '김영민', initialHandicap: 83, scores: [] },
  { id: '8', name: '김용', initialHandicap: 87, scores: [] },
  { id: '9', name: '김재형', initialHandicap: 86, scores: [] },
  { id: '10', name: '김재훈', initialHandicap: 100, scores: [] },
  { id: '11', name: '민승배', initialHandicap: 90, scores: [] },
  { id: '12', name: '박기홍', initialHandicap: 88, scores: [] },
  { id: '13', name: '백지훈', initialHandicap: 98, scores: [] },
  { id: '14', name: '신재승', initialHandicap: 96, scores: [] },
  { id: '15', name: '심종선', initialHandicap: 92, scores: [] },
  { id: '16', name: '원대영', initialHandicap: 125, scores: [] },
  { id: '17', name: '이태현', initialHandicap: 102, scores: [] },
  { id: '18', name: '조장원', initialHandicap: 84, scores: [] },
  { id: '19', name: '조해성', initialHandicap: 86, scores: [] },
  { id: '20', name: '강창균', initialHandicap: 96, scores: [] },
  { id: '21', name: '최민규', initialHandicap: 88, scores: [] },
  { id: '22', name: '황두식', initialHandicap: 111, scores: [] },
  { id: '23', name: '황준환', initialHandicap: 95, scores: [] },
  { id: '24', name: '조봉현', initialHandicap: 84, scores: [] },
  { id: '25', name: '이원배', initialHandicap: 100, scores: [] },
  { id: '26', name: '김태완', initialHandicap: 96, scores: [] },
  { id: '27', name: '조형익', initialHandicap: 95, scores: [] },
  { id: '28', name: '이주천', initialHandicap: 95, scores: [] },
];

export const ROUND_SCHEDULES: Round[] = [
  { id: '2026-03', month: 3, date: '2026-03-08', teams: Array.from({length: 6}, (_, i) => ({id: i+1, memberIds: []})), isCompleted: false },
  { id: '2026-05', month: 5, date: '2026-05-10', teams: Array.from({length: 6}, (_, i) => ({id: i+1, memberIds: []})), isCompleted: false },
  { id: '2026-07', month: 7, date: '2026-07-12', teams: Array.from({length: 6}, (_, i) => ({id: i+1, memberIds: []})), isCompleted: false },
  { id: '2026-09', month: 9, date: '2026-09-13', teams: Array.from({length: 6}, (_, i) => ({id: i+1, memberIds: []})), isCompleted: false },
  { id: '2026-11', month: 11, date: '2026-11-08', teams: Array.from({length: 6}, (_, i) => ({id: i+1, memberIds: []})), isCompleted: false },
];

export const INITIAL_BALANCE = 4312627;
export const FIRST_ROUND_DATE = '2026-03-08';
