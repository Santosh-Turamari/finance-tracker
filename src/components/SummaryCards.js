import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const SummaryCards = ({ totalIncome, totalExpense, balance }) => {
  const cards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      amountColor: 'text-emerald-600',
      prefix: '+',
      bgGradient: 'from-emerald-50 to-white'
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      icon: TrendingDown,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      amountColor: 'text-orange-600',
      prefix: '-',
      bgGradient: 'from-orange-50 to-white'
    },
    {
      title: 'Net Balance',
      amount: balance,
      icon: Wallet,
      iconBg: balance >= 0 ? 'bg-emerald-100' : 'bg-rose-100',
      iconColor: balance >= 0 ? 'text-emerald-600' : 'text-rose-600',
      amountColor: balance >= 0 ? 'text-slate-800' : 'text-rose-600',
      prefix: '',
      bgGradient: balance >= 0 ? 'from-emerald-50 to-white' : 'from-rose-50 to-white'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className={`bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm rounded-2xl shadow-card p-5 border border-white/50 card-hover`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">{card.title}</p>
              <p className={`text-2xl font-bold mt-2 ${card.amountColor}`}>
                {card.prefix}{formatCurrency(card.amount)}
              </p>
            </div>
            <div className={`${card.iconBg} p-2 rounded-xl`}>
              <card.icon className={`${card.iconColor}`} size={24} />
            </div>
          </div>
          {idx === 2 && balance !== 0 && (
            <div className="mt-3 flex items-center gap-1 text-xs">
              {balance > 0 ? (
                <>
                  <ArrowUp size={12} className="text-emerald-500" />
                  <span className="text-emerald-600">Positive cash flow</span>
                </>
              ) : (
                <>
                  <ArrowDown size={12} className="text-rose-500" />
                  <span className="text-rose-600">Negative cash flow</span>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;