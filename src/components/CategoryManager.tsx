import { useState } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import { Category, TransactionType } from '../types';
import { DEFAULT_CATEGORIES } from '../utils/storage';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (name: string, type: TransactionType) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoryManager = ({
  categories,
  onAddCategory,
  onDeleteCategory,
}: CategoryManagerProps) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    onAddCategory(newCategoryName.trim(), newCategoryType);
    setNewCategoryName('');
  };

  const isDefaultCategory = (categoryId: string) => {
    return DEFAULT_CATEGORIES.some(cat => cat.id === categoryId);
  };

  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Categories</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={newCategoryType}
                onChange={(e) => setNewCategoryType(e.target.value as TransactionType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-red-500" />
            Expense Categories
          </h3>
          <div className="space-y-2">
            {expenseCategories.length === 0 ? (
              <p className="text-gray-500 text-sm">No expense categories</p>
            ) : (
              expenseCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">{category.name}</span>
                  {!isDefaultCategory(category.id) && (
                    <button
                      onClick={() => onDeleteCategory(category.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-green-500" />
            Income Categories
          </h3>
          <div className="space-y-2">
            {incomeCategories.length === 0 ? (
              <p className="text-gray-500 text-sm">No income categories</p>
            ) : (
              incomeCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">{category.name}</span>
                  {!isDefaultCategory(category.id) && (
                    <button
                      onClick={() => onDeleteCategory(category.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
