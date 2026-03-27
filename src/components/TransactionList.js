import React from 'react';
import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { formatCurrency, getCategoryIcon, getCategoryColor } from '../utils/helpers';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (sortedTransactions.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-card overflow-hidden border border-white/40">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            Recent Transactions
          </h2>
        </div>
        <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Tag size={32} className="text-slate-300" />
          </div>
          <p>No transactions found</p>
          <p className="text-sm">Click "Add Transaction" to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-card overflow-hidden border border-white/40">
      <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          Recent Transactions
        </h2>
        <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          {transactions.length} items
        </span>
      </div>
      <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
        {sortedTransactions.map(transaction => {
          const Icon = getCategoryIcon(transaction.category);
          const colorClass = getCategoryColor(transaction.category);
          
          return (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-slate-50/80 transition-all group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass.bg} ${colorClass.text}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-700">{transaction.description}</p>
                  <div className="flex flex-wrap gap-x-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {transaction.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      {transaction.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <span className={`font-bold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(transaction)}
                    className="text-slate-400 hover:text-indigo-600 transition p-1"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(transaction.id)}
                    className="text-slate-400 hover:text-rose-500 transition p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;