"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GlobalMenu from "@/components/GlobalMenu"
import { 
  ArrowLeft,
  UtensilsCrossed,
  ShoppingBag,
  Gamepad2,
  ShoppingCart,
  Zap,
  CreditCard,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Settings,
  ChevronUp,
  ChevronDown
} from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Categories')
  const [animateNumbers, setAnimateNumbers] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('March')
  const [selectedYear, setSelectedYear] = useState(2025)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const spendingCategories = [
    { 
      name: 'Restaurant', 
      icon: UtensilsCrossed, 
      amount: 1460.35, 
      transactions: 33,
      isTop: true,
      change: '+159.21%',
      changeType: 'increase',
      color: 'from-orange-500 to-red-500',
      lightColor: 'from-orange-50 to-red-50',
      budget: 2000,
      trend: [45, 52, 48, 61, 55, 67, 73]
    },
    { 
      name: 'Shopping', 
      icon: ShoppingBag, 
      amount: 1391.44, 
      transactions: 13,
      change: '+23.5%',
      changeType: 'increase',
      color: 'from-pink-500 to-purple-500',
      lightColor: 'from-pink-50 to-purple-50',
      budget: 1800,
      trend: [30, 38, 35, 42, 39, 45, 48]
    },
    { 
      name: 'Entertainment', 
      icon: Gamepad2, 
      amount: 1292.88, 
      transactions: 5,
      change: '-8.2%',
      changeType: 'decrease',
      color: 'from-indigo-500 to-blue-500',
      lightColor: 'from-indigo-50 to-blue-50',
      budget: 1500,
      trend: [25, 28, 31, 29, 26, 23, 20]
    },
    { 
      name: 'Grocery', 
      icon: ShoppingCart, 
      amount: 514.61, 
      transactions: 17,
      change: '+12.8%',
      changeType: 'increase',
      color: 'from-green-500 to-emerald-500',
      lightColor: 'from-green-50 to-emerald-50',
      budget: 800,
      trend: [15, 18, 16, 22, 19, 25, 28]
    },
    { 
      name: 'Utility', 
      icon: Zap, 
      amount: 505.35, 
      transactions: 4,
      change: '+5.1%',
      changeType: 'increase',
      color: 'from-blue-500 to-cyan-500',
      lightColor: 'from-blue-50 to-cyan-50',
      budget: 600,
      trend: [12, 14, 13, 15, 14, 16, 17]
    },
    { 
      name: 'General', 
      icon: CreditCard, 
      amount: 432.32, 
      transactions: 3,
      change: '-2.3%',
      changeType: 'decrease',
      color: 'from-gray-500 to-slate-500',
      lightColor: 'from-gray-50 to-slate-50',
      budget: 500,
      trend: [8, 10, 9, 11, 10, 9, 8]
    }
  ]

  const totalSpent = spendingCategories.reduce((sum, category) => sum + category.amount, 0)
  const totalBudget = spendingCategories.reduce((sum, category) => sum + category.budget, 0)
  const topCategory = spendingCategories.find(cat => cat.isTop)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const monthsShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const handleApplyDate = () => {
    setShowDatePicker(false)
    // Here you would typically fetch new data for the selected month/year
  }

  // Animate numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimateNumbers(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Animated counter for numbers
  const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0)
    
    useEffect(() => {
      if (animateNumbers) {
        const duration = 1000
        const steps = 60
        const increment = value / steps
        let current = 0
        
        const timer = setInterval(() => {
          current += increment
          if (current >= value) {
            setDisplayValue(value)
            clearInterval(timer)
          } else {
            setDisplayValue(current)
          }
        }, duration / steps)
        
        return () => clearInterval(timer)
      }
    }, [value, animateNumbers])

    return (
      <span className="tabular-nums">
        {prefix}{displayValue.toFixed(2)}{suffix}
      </span>
    )
  }

  // Mini sparkline component
  const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data)
    const points = data.map((value: number, index: number) => {
      const x = (index / (data.length - 1)) * 60
      const y = 20 - (value / max) * 20
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width="60" height="20" className="opacity-70">
        <polyline
          points={points}
          fill="none"
          stroke={`url(#gradient-${color})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Glassmorphism Header */}
      <div className="backdrop-blur-xl bg-white/80 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.back()}
              className="p-1.5 rounded-full hover:bg-black/5 transition-colors duration-200"
            >
              <ArrowLeft size={18} className="text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Financial Insights</h1>
              <p className="text-xs text-slate-500">Your spending analysis</p>
            </div>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
            Clear all
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Hero Total Amount Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 shadow-xl">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-full blur-xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100 text-xs font-medium mb-1">{selectedMonth} {selectedYear}</p>
                <p className="text-white/80 text-xs">Total Spending</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowDatePicker(true)}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Settings size={14} className="text-white" />
                </button>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80 text-xs">Live</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white mb-2">
                <AnimatedNumber value={totalSpent} suffix=" AED" />
              </h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-green-400 text-xs font-medium">+15.2% vs last month</span>
                </div>
                <div className="w-px h-3 bg-white/20"></div>
                <span className="text-white/70 text-xs">
                  {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modern Pill Tabs */}
        <div className="flex space-x-2 p-1.5 bg-slate-100 rounded-xl">
          <button 
            onClick={() => setActiveTab('Categories')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'Categories' 
                ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50 transform scale-105' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Categories
          </button>
          <button 
            onClick={() => setActiveTab('Countries')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'Countries' 
                ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50 transform scale-105' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Countries
          </button>
        </div>

        {/* Top Category Highlight */}
        {topCategory && (
          <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topCategory.color} flex items-center justify-center shadow-lg`}>
                  <topCategory.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium">Top Spending Category</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{topCategory.name}</h3>
                  <p className="text-xl font-bold text-slate-900">
                    <AnimatedNumber value={topCategory.amount} suffix=" AED" />
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <TrendingUp size={12} className="text-red-500" />
                  <span className="text-red-600 font-semibold text-sm">{topCategory.change}</span>
                </div>
                <p className="text-slate-500 text-xs">from last month</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Category Cards */}
        <div className="space-y-2">
          {spendingCategories.map((category, index) => (
            <div 
              key={category.name} 
              className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={18} className="text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{category.name}</h4>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-lg font-bold text-slate-900">
                        <AnimatedNumber value={category.amount} suffix=" AED" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-slate-500">{category.transactions} transactions</p>
                  <div className="text-slate-400 mt-4">
                    <MiniSparkline data={category.trend} color={category.name.toLowerCase()} />
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${Math.min((category.amount / category.budget) * 100, 100)}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    {((category.amount / category.budget) * 100).toFixed(1)}% of budget
                  </span>
                  <span className="text-xs text-slate-400">
                    {category.budget} AED budget
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing for fab */}
        <div className="h-16"></div>
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl transform transition-transform duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Select Period</h2>
                <p className="text-sm text-slate-500">Choose month and year</p>
              </div>
              <button 
                onClick={() => setShowDatePicker(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Month/Year Header */}
            <div className="flex items-center justify-between p-6 bg-purple-50">
              <button 
                onClick={() => setSelectedYear(selectedYear - 1)}
                className="p-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                <ChevronUp size={24} className="text-purple-600" />
              </button>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-900">{selectedMonth}</h3>
                <p className="text-xl text-slate-600 mt-1">{selectedYear}</p>
              </div>
              <button 
                onClick={() => setSelectedYear(selectedYear + 1)}
                className="p-2 rounded-full hover:bg-purple-100 transition-colors"
              >
                <ChevronDown size={24} className="text-purple-600" />
              </button>
            </div>

            {/* Month Grid */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-8">
                {monthsShort.map((month, index) => {
                  const fullMonth = months[index]
                  const isSelected = selectedMonth === fullMonth
                  const isCurrentMonth = month === 'Mar'
                  const isFutureMonth = index > 6
                  
                  return (
                    <button
                      key={month}
                      onClick={() => !isFutureMonth && setSelectedMonth(fullMonth)}
                      disabled={isFutureMonth}
                      className={`py-4 px-2 rounded-xl text-lg font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-white text-slate-900 shadow-lg border-2 border-slate-900' 
                          : isFutureMonth
                          ? 'text-gray-300 cursor-not-allowed bg-gray-50 border border-gray-200'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {month}
                    </button>
                  )
                })}
              </div>

              {/* Apply Button */}
              <button 
                onClick={handleApplyDate}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Menu */}
      <GlobalMenu currentPage="dashboard" />
    </div>
  )
}