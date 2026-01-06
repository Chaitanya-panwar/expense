export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
}

export interface FilterOptions {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType | 'all';
}

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}
