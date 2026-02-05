
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RoundInput from './components/RoundInput';
import Ranking from './components/Ranking';
import AccountBook from './components/AccountBook';
import { TabType, Member, Round, Transaction } from './types';
import { INITIAL_MEMBERS, ROUND_SCHEDULES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const [members, setMembers] = useState<Member[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedMembers = localStorage.getItem('bm_members');
    const savedRounds = localStorage.getItem('bm_rounds');
    const savedTransactions = localStorage.getItem('bm_transactions');

    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      setMembers(INITIAL_MEMBERS);
    }

    if (savedRounds) {
      setRounds(JSON.parse(savedRounds));
    } else {
      setRounds(ROUND_SCHEDULES);
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions([]);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (members.length > 0) localStorage.setItem('bm_members', JSON.stringify(members));
    if (rounds.length > 0) localStorage.setItem('bm_rounds', JSON.stringify(rounds));
    localStorage.setItem('bm_transactions', JSON.stringify(transactions));
  }, [members, rounds, transactions]);

  const handleSaveScore = (memberId: string, roundId: string, score: number) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const existingScoreIdx = m.scores.findIndex(s => s.roundId === roundId);
        const newScore = { roundId, score, date: new Date().toISOString().split('T')[0] };
        
        const newScores = existingScoreIdx > -1 
          ? m.scores.map((s, idx) => idx === existingScoreIdx ? newScore : s)
          : [...m.scores, newScore];
          
        return { ...m, scores: newScores };
      }
      return m;
    }));
  };

  const handleUpdateInitialHandicap = (memberId: string, handicap: number) => {
    setMembers(prev => prev.map(m => 
      m.id === memberId ? { ...m, initialHandicap: handicap } : m
    ));
  };

  const handleAddTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: Date.now().toString()
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabType.DASHBOARD:
        return <Dashboard transactions={transactions} memberCount={members.length} />;
      case TabType.ROUNDS:
        return (
          <RoundInput 
            rounds={rounds} 
            members={members} 
            onSaveScore={handleSaveScore} 
            onUpdateInitialHandicap={handleUpdateInitialHandicap}
          />
        );
      case TabType.RANKING:
        return <Ranking members={members} />;
      case TabType.ACCOUNTING:
        return <AccountBook transactions={transactions} onAddTransaction={handleAddTransaction} />;
      default:
        return <Dashboard transactions={transactions} memberCount={members.length} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
