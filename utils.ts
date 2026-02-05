
import { Member } from './types';

export const calculateAverageHandicap = (member: Member): number => {
  if (member.scores.length === 0) return member.initialHandicap;
  const totalScore = member.initialHandicap + member.scores.reduce((sum, s) => sum + s.score, 0);
  const count = 1 + member.scores.length;
  return Math.round((totalScore / count) * 10) / 10;
};

export const getDDay = (targetDate: string): number => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
};
