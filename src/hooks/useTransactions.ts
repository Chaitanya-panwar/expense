import { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { getTransactions, saveTransactions } from '../utils/storage';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadedTransactions = getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    saveTransactions(updated);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const updated = transactions.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTransactions(updated);
    saveTransactions(updated);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    saveTransactions(updated);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
