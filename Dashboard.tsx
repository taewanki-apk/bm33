
import React from 'react';
import { getDDay, formatCurrency } from '../utils';
import { FIRST_ROUND_DATE, INITIAL_BALANCE } from '../constants';
import { Transaction } from '../types';

interface DashboardProps {
    transactions: Transaction[];
    memberCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, memberCount }) => {
  const dday = getDDay(FIRST_ROUND_DATE);
  
  const currentBalance = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, INITIAL_BALANCE);

  return (
    <div className="space-y-6">
      {/* D-Day Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium">첫 라운딩 디데이</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
                {dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day' : `완료`}
            </h2>
            <p className="text-xs text-gray-400 mt-1">2026년 3월 8일 (일)</p>
        </div>
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-[10px] uppercase font-bold">멤버 수</p>
            <p className="text-xl font-bold text-gray-800">{memberCount}명</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-[10px] uppercase font-bold">진행 회차</p>
            <p className="text-xl font-bold text-gray-800">0 / 5회</p>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="bg-stone-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <p className="text-stone-400 text-xs font-medium mb-1">총무 관리 잔액</p>
            <h3 className="text-2xl font-bold">{formatCurrency(currentBalance)}</h3>
            <div className="mt-4 flex items-center space-x-2 text-[10px] text-stone-300">
                <span className="bg-stone-700 px-2 py-1 rounded">기초: {formatCurrency(INITIAL_BALANCE)}</span>
                <span>•</span>
                <span>최근 업데이트 1분 전</span>
            </div>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <h4 className="font-bold text-sm">연간 라운딩 일정</h4>
            <span className="text-xs text-green-600 font-medium">2026 Schedule</span>
        </div>
        <div className="divide-y divide-gray-50">
            {[3, 5, 7, 9, 11].map((month) => (
                <div key={month} className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                            {month}월
                        </div>
                        <span className="text-sm font-medium text-gray-700">제 {month === 3 ? '1' : month === 5 ? '2' : month === 7 ? '3' : month === 9 ? '4' : '5'}회 정기 모임</span>
                    </div>
                    <span className="text-[10px] text-gray-400">예정</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
