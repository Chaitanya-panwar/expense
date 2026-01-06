import { Transaction, Category } from '../types';

const TRANSACTIONS_KEY = 'expense_tracker_transactions';
const CATEGORIES_KEY = 'expense_tracker_categories';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', type: 'expense' },
  { id: '2', name: 'Travel', type: 'expense' },
  { id: '3', name: 'Rent', type: 'expense' },
  { id: '4', name: 'Shopping', type: 'expense' },
  { id: '5', name: 'Utilities', type: 'expense' },
  { id: '6', name: 'Others', type: 'expense' },
  { id: '7', name: 'Salary', type: 'income' },
  { id: '8', name: 'Freelance', type: 'income' },
  { id: '9', name: 'Investment', type: 'income' },
  { id: '10', name: 'Other Income', type: 'income' },
];

export const getTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading transactions:', error);
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

export const getCategories = (): Category[] => {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  } catch (error) {
    console.error('Error reading categories:', error);
    return DEFAULT_CATEGORIES;
  }
};

export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};
