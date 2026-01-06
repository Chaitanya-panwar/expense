import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Transaction, TransactionType, Category } from '../types';

interface TransactionFormProps {
  categories: Category[];
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  editingTransaction?: Transaction | null;
  onCancelEdit?: () => void;
}

export const TransactionForm = ({
  categories,
  onSubmit,
  editingTransaction,
  onCancelEdit,
}: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount.toString());
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
      setNote(editingTransaction.note || '');
    }
  }, [editingTransaction]);

  const filteredCategories = categories.filter(c => c.type === type);

  useEffect(() => {
    if (filteredCategories.length > 0 && !category) {
      setCategory(filteredCategories[0].name);
    }
  }, [type, filteredCategories, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onSubmit({
      type,
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim() || undefined,
    });

    setAmount('');
    setCategory(filteredCategories[0]?.name || '');
    setNote('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
        </h2>
        {editingTransaction && (
          <button
            onClick={onCancelEdit}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              type === 'expense'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              type === 'income'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            >
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note (Optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
            type === 'expense'
              ? 'bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg'
              : 'bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg'
          }`}
        >
          <Plus className="w-5 h-5" />
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};
