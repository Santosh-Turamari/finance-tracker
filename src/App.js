import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { 
  PlusCircle, 
  Edit2, 
  Trash2, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  Filter,
  Calendar,
  Tag,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Components
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import CategoryFilter from './components/CategoryFilter';
import Notification from './components/Notification';

// Utils
import { generateId, getInitialTransactions, formatCurrency, categoryIconMap } from './utils/helpers';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('finora_transactions');
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch (e) {
        setTransactions(getInitialTransactions());
      }
    } else {
      setTransactions(getInitialTransactions());
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (transactions.length > 0 || transactions.length === 0) {
      localStorage.setItem('finora_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 2600);
  };

  const handleAddTransaction = (transactionData) => {
    const newTransaction = {
      id: generateId(),
      ...transactionData,
      amount: parseFloat(transactionData.amount)
    };
    setTransactions(prev => [newTransaction, ...prev]);
    showNotification('Transaction added successfully!');
    setShowAddModal(false);
  };

  const handleUpdateTransaction = (id, updatedData) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, ...updatedData, amount: parseFloat(updatedData.amount) } : t
    ));
    showNotification('Transaction updated successfully!');
    setEditTransaction(null);
    setShowAddModal(false);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      showNotification('Transaction deleted successfully!', 'info');
    }
  };

  const handleEditClick = (transaction) => {
    setEditTransaction(transaction);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditTransaction(null);
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  // Chart data
  const chartData = [
    { name: 'Income', value: totalIncome, fill: '#10b981' },
    { name: 'Expenses', value: totalExpense, fill: '#f97316' }
  ];

  // Get unique categories
  const uniqueCategories = ['all', ...new Set(transactions.map(t => t.category))];

  // Filter transactions
  const filteredTransactions = filterCategory === 'all'
    ? transactions
    : transactions.filter(t => t.category === filterCategory);

  // Get top expense category
  const getTopExpenseCategory = () => {
    const expenseCats = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    
    const top = Object.entries(expenseCats).sort((a, b) => b[1] - a[1])[0];
    return top ? { category: top[0], amount: top[1] } : null;
  };

  const topExpense = getTopExpenseCategory();

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <Notification 
        show={notification.show} 
        message={notification.message} 
        type={notification.type} 
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Finora
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Smart personal finance tracker with insights and analytics
          </p>
        </div>
        <button
          onClick={() => {
            setEditTransaction(null);
            setShowAddModal(true);
          }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-2xl shadow-md flex items-center gap-2 transition-all font-semibold"
        >
          <PlusCircle size={20} />
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <SummaryCards 
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      {/* Chart and Filter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl shadow-soft p-5 border border-gray-100">
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <TrendingUp size={18} />
            Income vs Expenses Overview
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#334155' }} />
                <YAxis tickFormatter={(val) => `₹${val}`} /> 
                <Tooltip 
                  formatter={(val) => [`₹${val.toFixed(2)}`, 'Amount']}  
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    background: 'white'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={70}>
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filter & Insights */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-soft p-5">
          <CategoryFilter 
            categories={uniqueCategories}
            selectedCategory={filterCategory}
            onCategoryChange={setFilterCategory}
          />
          
          <div className="mt-6">
            <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
              <TrendingDown size={14} />
              Top Expense Category
            </p>
            {topExpense ? (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">{topExpense.category}</span>
                  <span className="text-orange-600 font-bold">{formatCurrency(topExpense.amount)}</span>
                </div>
              </div>
            ) : (
              <div className="text-slate-400 text-sm text-center py-3">No expense data</div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Wallet size={12} />
              {transactions.length} total transactions
            </p>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <TransactionList 
        transactions={filteredTransactions}
        onEdit={handleEditClick}
        onDelete={handleDeleteTransaction}
      />

      {/* Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b p-5">
              <h3 className="text-xl font-bold text-slate-800">
                {editTransaction ? 'Edit Transaction' : 'Add New Transaction'}
              </h3>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <TransactionForm 
              onSubmit={editTransaction 
                ? (data) => handleUpdateTransaction(editTransaction.id, data)
                : handleAddTransaction
              }
              initialData={editTransaction}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;