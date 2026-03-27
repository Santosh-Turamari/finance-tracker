import React, { useState } from 'react';
import { IndianRupee, Type, Calendar as CalendarIcon, Tag } from 'lucide-react'; // Change DollarSign to IndianRupee

const TransactionForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    amount: initialData?.amount?.toString() || '',
    type: initialData?.type || 'expense',
    category: initialData?.category || 'Food',
    date: initialData?.date || new Date().toISOString().slice(0, 10)
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid positive amount';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const categories = [
    'Food', 'Salary', 'Freelance', 'Entertainment',
    'Housing', 'Shopping', 'Investment', 'Transport',
    'Health', 'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
          <Type size={14} />
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className={`w-full border ${errors.description ? 'border-red-300' : 'border-slate-200'} rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition`}
          placeholder="e.g., Coffee shop, Salary, etc."
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
          <IndianRupee size={14} /> {/* Changed from DollarSign to IndianRupee */}
          Amount (₹)
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={e => setFormData({ ...formData, amount: e.target.value })}
          className={`w-full border ${errors.amount ? 'border-red-300' : 'border-slate-200'} rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition`}
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value })}
            className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          >
            <option value="expense">Expense 💸</option>
            <option value="income">Income 💰</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
            <Tag size={14} />
            Category
          </label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center gap-1">
          <CalendarIcon size={14} />
          Date
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          className={`w-full border ${errors.date ? 'border-red-300' : 'border-slate-200'} rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition`}
        />
        {errors.date && (
          <p className="text-xs text-red-500 mt-1">{errors.date}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 transition font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl py-2.5 font-semibold transition shadow-md"
        >
          {initialData ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;