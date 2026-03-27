import { 
  Home, 
  ShoppingBag, 
  Coffee, 
  Film, 
  Briefcase, 
  TrendingUp, 
  Car, 
  Heart, 
  Tag,
  IndianRupee  // Change from DollarSign to IndianRupee
} from 'lucide-react';

export const generateId = () => {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 8);
};

export const getInitialTransactions = () => [
  { id: generateId(), description: "Salary Deposit", amount: 4200, type: "income", category: "Salary", date: "2025-09-05" },
  { id: generateId(), description: "Freelance Project", amount: 850, type: "income", category: "Freelance", date: "2025-09-12" },
  { id: generateId(), description: "Groceries", amount: 215, type: "expense", category: "Food", date: "2025-09-08" },
  { id: generateId(), description: "Netflix Subscription", amount: 15.99, type: "expense", category: "Entertainment", date: "2025-09-10" },
  { id: generateId(), description: "Rent", amount: 1250, type: "expense", category: "Housing", date: "2025-10-01" },
  { id: generateId(), description: "Investment Return", amount: 320, type: "income", category: "Investment", date: "2025-10-15" },
  { id: generateId(), description: "Dining Out", amount: 78, type: "expense", category: "Food", date: "2025-10-20" },
  { id: generateId(), description: "New Laptop", amount: 1199, type: "expense", category: "Shopping", date: "2025-11-02" },
  { id: generateId(), description: "Bonus", amount: 1500, type: "income", category: "Salary", date: "2025-11-15" },
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const getCategoryIcon = (category) => {
  const icons = {
    Housing: Home,
    Shopping: ShoppingBag,
    Food: Coffee,
    Entertainment: Film,
    Salary: Briefcase,
    Freelance: Briefcase,
    Investment: TrendingUp,
    Transport: Car,
    Health: Heart,
    Other: Tag
  };
  return icons[category] || IndianRupee; // Change from DollarSign to IndianRupee
};

export const getCategoryColor = (category) => {
  const colors = {
    Housing: { bg: 'bg-blue-100', text: 'text-blue-600' },
    Shopping: { bg: 'bg-purple-100', text: 'text-purple-600' },
    Food: { bg: 'bg-orange-100', text: 'text-orange-600' },
    Entertainment: { bg: 'bg-pink-100', text: 'text-pink-600' },
    Salary: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    Freelance: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
    Investment: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    Transport: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    Health: { bg: 'bg-red-100', text: 'text-red-600' },
    Other: { bg: 'bg-gray-100', text: 'text-gray-600' }
  };
  return colors[category] || { bg: 'bg-gray-100', text: 'text-gray-600' };
};