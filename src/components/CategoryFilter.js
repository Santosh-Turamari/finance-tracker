import React from 'react';
import { Filter } from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          <Filter size={16} />
          Category Filter
        </h3>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onCategoryChange('all')}
            className="text-xs text-indigo-500 hover:text-indigo-600 hover:underline transition"
          >
            Clear
          </button>
        )}
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition text-sm"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat === 'all' ? '📋 All Categories' : cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;