import { useState, useMemo } from 'react';
import { LayoutDashboard, ListFilter, BarChart3, Settings, Wallet } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Analytics } from './components/Analytics';
import { CategoryManager } from './components/CategoryManager';
import { useTransactions } from './hooks/useTransactions';
import { useCategories } from './hooks/useCategories';
import { calculateSummary } from './utils/calculations';
import { Transaction } from './types';

type View = 'overview' | 'transactions' | 'analytics' | 'categories';

function App() {
  const [activeView, setActiveView] = useState<View>('overview');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { categories, addCategory, deleteCategory } = useCategories();

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transaction);
      setEditingTransaction(null);
    } else {
      addTransaction(transaction);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setActiveView('overview');
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const navItems = [
    { id: 'overview' as View, label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions' as View, label: 'Transactions', icon: ListFilter },
    { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
    { id: 'categories' as View, label: 'Categories', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            </div>

            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeView === item.id
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'overview' && (
          <>
            <Dashboard summary={summary} />
            <TransactionForm
              categories={categories}
              onSubmit={handleAddTransaction}
              editingTransaction={editingTransaction}
              onCancelEdit={handleCancelEdit}
            />
            <TransactionList
              transactions={transactions.slice(0, 5)}
              categories={categories}
              onEdit={handleEditTransaction}
              onDelete={deleteTransaction}
            />
            {transactions.length > 5 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setActiveView('transactions')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all transactions →
                </button>
              </div>
            )}
          </>
        )}

        {activeView === 'transactions' && (
          <TransactionList
            transactions={transactions}
            categories={categories}
            onEdit={handleEditTransaction}
            onDelete={deleteTransaction}
          />
        )}

        {activeView === 'analytics' && <Analytics transactions={transactions} />}

        {activeView === 'categories' && (
          <CategoryManager
            categories={categories}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        )}
      </main>
    </div>
  );
}

export default App;
