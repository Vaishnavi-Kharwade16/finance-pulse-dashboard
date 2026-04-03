import React, { createContext, useState, useMemo } from 'react';

// 1. Create the Context
export const DashboardContext = createContext();

// 2. Initial Mock Data (Requirement: Work with static or mock data)
const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2026-03-25', amount: 5000, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-03-28', amount: 150, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2026-03-30', amount: 1200, category: 'Rent', type: 'expense' },
  { id: 4, date: '2026-04-01', amount: 80, category: 'Entertainment', type: 'expense' },
  { id: 5, date: '2026-04-02', amount: 450, category: 'Freelance', type: 'income' },
];

export const DashboardProvider = ({ children }) => {
  // --- State Management ---
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState('Admin'); // Requirement: Basic Role Based UI
  const [search, setSearch] = useState('');

  // --- Actions ---
  // Function to add new transactions (Requirement: Admin can add)
  const addTransaction = (newTx) => {
    const transactionWithId = {
      ...newTx,
      id: Date.now(), // Unique ID for React keys
    };
    setTransactions((prev) => [transactionWithId, ...prev]);
  };

  // --- Computed State (Insights) ---
  // Requirement: View overall financial summary
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  // Requirement: Simple filtering/search
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  // Requirement: Insights (Highest spending category)
  const topExpenseCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return "N/A";
    
    // Sort by amount descending and pick the first
    const top = [...expenses].sort((a, b) => b.amount - a.amount)[0];
    return top.category;
  }, [transactions]);

  // 3. Provide the state to the application
  return (
    <DashboardContext.Provider value={{ 
      transactions: filteredTransactions, 
      allTransactions: transactions, // Useful for charts
      addTransaction,
      role, 
      setRole, 
      stats, 
      search,
      setSearch,
      topExpenseCategory
    }}>
      {children}
    </DashboardContext.Provider>
  );
};