
import React, { useState } from 'react';
import { Transaction } from '../types';
import { INITIAL_BALANCE } from '../constants';
import { formatCurrency } from '../utils';

interface AccountBookProps {
    transactions: Transaction[];
    onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
}

const AccountBook: React.FC<AccountBookProps> = ({ transactions, onAddTransaction }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const currentBalance = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, INITIAL_BALANCE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount) return;
    onAddTransaction({
      date: new Date().toISOString().split('T')[0],
      description: desc,
      amount: parseInt(amount),
      type
    });
    setDesc('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Balance Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-gray-400 text-xs font-medium mb-1">현재 총 잔액</p>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{formatCurrency(currentBalance)}</h3>
        <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-400 uppercase font-bold">기초 잔액</p>
                <p className="text-sm font-bold text-gray-600">{formatCurrency(INITIAL_BALANCE)}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
                <p className="text-[10px] text-green-400 uppercase font-bold">누적 입금</p>
                <p className="text-sm font-bold text-green-600">
                    {formatCurrency(transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0))}
                </p>
            </div>
        </div>
      </div>

      {/* Quick Entry */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h4 className="text-sm font-bold mb-4">입출금 기록하기</h4>
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                    type="button" 
                    onClick={() => setType('expense')}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${type === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400'}`}
                >
                    지출 (-)
                </button>
                <button 
                    type="button" 
                    onClick={() => setType('income')}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${type === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'}`}
                >
                    입금 (+)
                </button>
            </div>
            <input 
                type="text" 
                placeholder="내용 (예: 3월 식대)" 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <input 
                type="number" 
                placeholder="금액 (KRW)" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            <button className="w-full py-3 bg-stone-800 text-white rounded-xl text-sm font-bold shadow-md hover:bg-stone-900 transition-colors">
                기록 추가
            </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold px-1">최근 내역</h4>
        {transactions.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
                내역이 없습니다.
            </div>
        ) : (
            <div className="space-y-2">
                {[...transactions].reverse().map(t => (
                    <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-800">{t.description}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{t.date}</p>
                        </div>
                        <div className={`text-sm font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default AccountBook;
