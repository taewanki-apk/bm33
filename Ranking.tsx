
import React from 'react';
import { Member } from '../types';
import { calculateAverageHandicap } from '../utils';

interface RankingProps {
    members: Member[];
}

const Ranking: React.FC<RankingProps> = ({ members }) => {
  const sortedMembers = [...members].sort((a, b) => calculateAverageHandicap(a) - calculateAverageHandicap(b));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-gray-800">2026 실시간 핸디 랭킹</h3>
        <span className="text-[10px] text-gray-400">Total {members.length} Players</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <div className="col-span-2">순위</div>
            <div className="col-span-4">성명</div>
            <div className="col-span-3 text-right">기존</div>
            <div className="col-span-3 text-right">평균 핸디</div>
        </div>
        <div className="divide-y divide-gray-50">
            {sortedMembers.map((m, idx) => {
                const avg = calculateAverageHandicap(m);
                const isTop3 = idx < 3;
                return (
                    <div key={m.id} className="grid grid-cols-12 px-4 py-4 items-center transition-colors hover:bg-gray-50">
                        <div className="col-span-2 font-bold text-sm">
                            {isTop3 ? (
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                                    idx === 0 ? 'bg-yellow-100 text-yellow-700' : 
                                    idx === 1 ? 'bg-gray-100 text-gray-600' : 
                                    'bg-orange-100 text-orange-700'
                                }`}>
                                    {idx + 1}
                                </span>
                            ) : (
                                <span className="text-gray-400 ml-1">{idx + 1}</span>
                            )}
                        </div>
                        <div className="col-span-4 font-bold text-gray-800 flex items-center space-x-2">
                            <span>{m.name}</span>
                            {m.scores.length > 0 && (
                                <span className="bg-green-100 text-green-700 text-[8px] px-1 rounded">R{m.scores.length}</span>
                            )}
                        </div>
                        <div className="col-span-3 text-right text-xs text-gray-400">{m.initialHandicap}</div>
                        <div className="col-span-3 text-right font-bold text-green-700">{avg}</div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
