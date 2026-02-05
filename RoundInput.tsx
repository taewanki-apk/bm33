
import React, { useState } from 'react';
import { Member, Round } from '../types';

interface RoundInputProps {
    rounds: Round[];
    members: Member[];
    onSaveScore: (memberId: string, roundId: string, score: number) => void;
    onUpdateInitialHandicap: (memberId: string, handicap: number) => void;
}

const RoundInput: React.FC<RoundInputProps> = ({ rounds, members, onSaveScore, onUpdateInitialHandicap }) => {
  const [selectedRoundId, setSelectedRoundId] = useState(rounds[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleScoreChange = (memberId: string, value: string) => {
    const num = parseInt(value);
    setScores(prev => ({ ...prev, [memberId]: isNaN(num) ? 0 : num }));
  };

  const handleInitialHandicapChange = (memberId: string, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num)) {
      onUpdateInitialHandicap(memberId, num);
    }
  };

  const handleSave = () => {
    const entries = Object.entries(scores) as [string, number][];
    const validEntries = entries.filter(([_, score]) => score > 0);
    
    if (validEntries.length === 0) {
      alert('입력된 신규 스코어가 없습니다.');
      return;
    }

    validEntries.forEach(([memberId, score]) => {
      onSaveScore(memberId, selectedRoundId, score);
    });
    
    alert(`${validEntries.length}명의 스코어가 저장되었습니다.`);
    setScores({});
    setSearchTerm('');
  };

  const sortedMembers = [...members]
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
    .filter(m => m.name.includes(searchTerm));

  return (
    <div className="space-y-4 flex flex-col h-full">
      {/* Round Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar flex-shrink-0">
        {rounds.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedRoundId(r.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-all ${
              selectedRoundId === r.id ? 'golf-gradient text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {r.month}월 라운딩
          </button>
        ))}
      </div>

      {/* Member List Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-50">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="이름으로 검색 (가나다순)" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
        </div>

        {/* Scrollable Member List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[480px]">
            <div className="grid grid-cols-12 gap-2 text-[10px] text-gray-400 font-bold sticky top-0 bg-white py-2 z-10 border-b border-gray-50">
                <div className="col-span-4">성명 / 상태</div>
                <div className="col-span-3 text-center">이전 기록</div>
                <div className="col-span-3 text-center">기록 입력</div>
                <div className="col-span-2 text-right">증감</div>
            </div>
            
            {sortedMembers.map(member => {
                const currentVal = scores[member.id] || 0;
                const prevVal = member.initialHandicap;
                const diff = currentVal > 0 ? currentVal - prevVal : null;

                return (
                    <div key={member.id} className="grid grid-cols-12 gap-2 items-center py-2 border-b border-gray-50 last:border-0">
                        {/* Name & Avatar */}
                        <div className="col-span-4 flex items-center space-x-2">
                            <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500 flex-shrink-0">
                                {member.name.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-gray-800 truncate">{member.name}</span>
                        </div>

                        {/* Prev Score (Baseline) */}
                        <div className="col-span-3">
                            <input 
                                type="number" 
                                value={prevVal || ''}
                                onChange={(e) => handleInitialHandicapChange(member.id, e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-center text-xs font-bold text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all"
                            />
                        </div>

                        {/* New Score Input */}
                        <div className="col-span-3">
                            <input 
                                type="number" 
                                placeholder="0"
                                value={scores[member.id] || ''}
                                onChange={(e) => handleScoreChange(member.id, e.target.value)}
                                className="w-full bg-white border-2 border-green-100 rounded-lg px-2 py-2 text-center text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition-all"
                            />
                        </div>

                        {/* Diff Indicator */}
                        <div className="col-span-2 text-right">
                            {diff !== null && (
                                <span className={`text-xs font-black ${diff > 0 ? 'text-red-500' : diff < 0 ? 'text-blue-500' : 'text-gray-400'}`}>
                                    {diff > 0 ? `+${diff}` : diff === 0 ? 'E' : diff}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
            
            {sortedMembers.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">
                    검색 결과가 없습니다.
                </div>
            )}
        </div>

        {/* Action Button */}
        <div className="p-4 border-t border-gray-50 bg-gray-50">
            <button 
                onClick={handleSave}
                className="w-full py-4 golf-gradient text-white rounded-xl text-sm font-bold shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center space-x-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>현재 스코어 일괄 저장</span>
            </button>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <p className="text-[10px] text-yellow-700 font-bold mb-1 italic">EDITOR GUIDE</p>
          <p className="text-[11px] text-yellow-600 leading-relaxed">
            <b>이전 기록</b> 칸은 2025년 최종 핸디값이 기본으로 들어가 있으며, 직접 수정 시 즉시 전체 데이터에 반영됩니다. <b>기록 입력</b> 칸에 오늘 성적을 입력하면 타수 차이가 실시간 계산됩니다.
          </p>
      </div>
    </div>
  );
};

export default RoundInput;
