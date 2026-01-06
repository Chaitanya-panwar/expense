import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Summary } from '../types';

interface DashboardProps {
  summary: Summary;
}

export const Dashboard = ({ summary }: DashboardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Total Income</span>
          <div className="p-2 bg-green-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {formatCurrency(summary.totalIncome)}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Total Expenses</span>
          <div className="p-2 bg-red-50 rounded-lg">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-900">
          {formatCurrency(summary.totalExpenses)}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Balance</span>
          <div className="p-2 bg-blue-50 rounded-lg">
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <p className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
          {formatCurrency(summary.balance)}
        </p>
      </div>
    </div>
  );
};
