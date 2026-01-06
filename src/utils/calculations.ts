import { Transaction, Summary } from '../types';

export const calculateSummary = (transactions: Transaction[]): Summary => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
  };
};

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const breakdown: Record<string, number> = {};

  transactions.forEach(transaction => {
    if (!breakdown[transaction.category]) {
      breakdown[transaction.category] = 0;
    }
    breakdown[transaction.category] += transaction.amount;
  });

  return Object.entries(breakdown).map(([name, value]) => ({
    name,
    value,
  }));
};

export const getMonthlyData = (transactions: Transaction[]) => {
  const monthlyData: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach(transaction => {
    const month = transaction.date.substring(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expenses: 0 };
    }
    if (transaction.type === 'income') {
      monthlyData[month].income += transaction.amount;
    } else {
      monthlyData[month].expenses += transaction.amount;
    }
  });

  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

export const getWeeklyData = (transactions: Transaction[]) => {
  const now = new Date();
  const last7Days = new Array(7).fill(0).map((_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const weeklyData = last7Days.map(date => {
    const dayTransactions = transactions.filter(t => t.date === date);
    const income = dayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = dayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      income,
      expenses,
    };
  });

  return weeklyData;
};
