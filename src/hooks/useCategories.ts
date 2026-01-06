import { useState, useEffect } from 'react';
import { Category, TransactionType } from '../types';
import { getCategories, saveCategories } from '../utils/storage';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadedCategories = getCategories();
    setCategories(loadedCategories);
  }, []);

  const addCategory = (name: string, type: TransactionType) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      type,
    };
    const updated = [...categories, newCategory];
    setCategories(updated);
    saveCategories(updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter(c => c.id !== id);
    setCategories(updated);
    saveCategories(updated);
  };

  return {
    categories,
    addCategory,
    deleteCategory,
  };
};
