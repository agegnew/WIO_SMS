"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
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
  MapPin,
  Calendar,
  Clock,
  Filter,
  Download
} from "lucide-react"

export default function CategoryDetail() {
  const router = useRouter()
  const params = useParams()
  const categoryName = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName
  
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  // Mock data for different categories
  const categoryData: { [key: string]: any } = {
    restaurant: {
      name: 'Restaurant',
      icon: UtensilsCrossed,
      color: 'from-slate-600 to-slate-700',
      amount: 1460.35,
      transactionCount: 33,
      change: '+159.21%',
      changeType: 'increase',
      chartData: [
        { month: 'Jan', amount: 850 },
        { month: 'Feb', amount: 1200 },
        { month: 'Mar', amount: 1460 },
        { month: 'Apr', amount: 1100 },
        { month: 'May', amount: 950 },
        { month: 'Jun', amount: 1300 },
      ],
      transactionList: [
        { merchant: 'Zuma Dubai', location: 'DIFC, Dubai', amount: 285.50, date: '2025-03-15', time: '19:30', category: 'Fine Dining' },
        { merchant: 'La Petite Maison', location: 'Jumeirah, Dubai', amount: 225.75, date: '2025-03-14', time: '20:15', category: 'Fine Dining' },
        { merchant: 'Nobu Dubai', location: 'Atlantis, Dubai', amount: 365.80, date: '2025-03-12', time: '21:00', category: 'Fine Dining' },
        { merchant: 'Starbucks', location: 'Mall of Emirates', amount: 28.50, date: '2025-03-10', time: '14:30', category: 'Coffee' },
        { merchant: 'Costa Coffee', location: 'Dubai Marina', amount: 18.90, date: '2025-03-09', time: '09:15', category: 'Coffee' },
        { merchant: 'Shake Shack', location: 'Dubai Mall', amount: 45.25, date: '2025-03-08', time: '13:45', category: 'Fast Food' },
        { merchant: 'Pizza Express', location: 'JBR', amount: 78.60, date: '2025-03-07', time: '19:20', category: 'Casual Dining' },
        { merchant: 'Subway', location: 'Metro Station', amount: 22.75, date: '2025-03-06', time: '12:30', category: 'Fast Food' },
      ]
    },
    shopping: {
      name: 'Shopping',
      icon: ShoppingBag,
      color: 'from-blue-600 to-blue-700',
      amount: 1391.44,
      transactionCount: 13,
      change: '+23.5%',
      changeType: 'increase',
      chartData: [
        { month: 'Jan', amount: 800 },
        { month: 'Feb', amount: 1100 },
        { month: 'Mar', amount: 1391 },
        { month: 'Apr', amount: 950 },
        { month: 'May', amount: 1200 },
        { month: 'Jun', amount: 1150 },
      ],
      transactionList: [
        { merchant: 'Apple Store', location: 'Dubai Mall', amount: 459.99, date: '2025-03-13', time: '16:45', category: 'Electronics' },
        { merchant: 'Zara', location: 'City Walk', amount: 185.75, date: '2025-03-11', time: '15:20', category: 'Fashion' },
        { merchant: 'H&M', location: 'Mall of Emirates', amount: 125.50, date: '2025-03-08', time: '17:30', category: 'Fashion' },
        { merchant: 'Nike Store', location: 'Dubai Marina Mall', amount: 275.80, date: '2025-03-06', time: '14:10', category: 'Sportswear' },
      ]
    },
    entertainment: {
      name: 'Entertainment',
      icon: Gamepad2,
      color: 'from-indigo-600 to-indigo-700',
      amount: 1292.88,
      transactionCount: 5,
      change: '-8.2%',
      changeType: 'decrease',
      chartData: [
        { month: 'Jan', amount: 1200 },
        { month: 'Feb', amount: 1400 },
        { month: 'Mar', amount: 1293 },
        { month: 'Apr', amount: 900 },
        { month: 'May', amount: 1100 },
        { month: 'Jun', amount: 1050 },
      ],
      transactionList: [
        { merchant: 'VOX Cinemas', location: 'Dubai Mall', amount: 85.00, date: '2025-03-14', time: '19:00', category: 'Movies' },
        { merchant: 'Netflix', location: 'Online Subscription', amount: 55.99, date: '2025-03-01', time: '12:00', category: 'Streaming' },
        { merchant: 'Spotify Premium', location: 'Music Streaming', amount: 19.99, date: '2025-03-01', time: '12:00', category: 'Music' },
        { merchant: 'PlayStation Store', location: 'Gaming', amount: 299.99, date: '2025-03-05', time: '16:30', category: 'Gaming' },
      ]
    },
    grocery: {
      name: 'Grocery',
      icon: ShoppingCart,
      color: 'from-emerald-600 to-emerald-700',
      amount: 514.61,
      transactionCount: 17,
      change: '+12.8%',
      changeType: 'increase',
      chartData: [
        { month: 'Jan', amount: 450 },
        { month: 'Feb', amount: 480 },
        { month: 'Mar', amount: 515 },
        { month: 'Apr', amount: 520 },
        { month: 'May', amount: 490 },
        { month: 'Jun', amount: 530 },
      ],
      transactionList: [
        { merchant: 'Carrefour', location: 'Mall of Emirates', amount: 145.80, date: '2025-03-15', time: '18:45', category: 'Supermarket' },
        { merchant: 'Spinneys', location: 'Jumeirah', amount: 89.50, date: '2025-03-12', time: '16:30', category: 'Premium Grocery' },
        { merchant: 'Union Coop', location: 'Al Wasl', amount: 67.25, date: '2025-03-10', time: '19:15', category: 'Local Store' },
        { merchant: 'Waitrose', location: 'Dubai Marina', amount: 125.75, date: '2025-03-08', time: '17:20', category: 'Premium Grocery' },
      ]
    },
    utility: {
      name: 'Utility',
      icon: Zap,
      color: 'from-cyan-600 to-cyan-700',
      amount: 505.35,
      transactionCount: 4,
      change: '+5.1%',
      changeType: 'increase',
      chartData: [
        { month: 'Jan', amount: 480 },
        { month: 'Feb', amount: 490 },
        { month: 'Mar', amount: 505 },
        { month: 'Apr', amount: 520 },
        { month: 'May', amount: 510 },
        { month: 'Jun', amount: 515 },
      ],
      transactionList: [
        { merchant: 'DEWA', location: 'Electricity & Water', amount: 285.50, date: '2025-03-01', time: '10:00', category: 'Utilities' },
        { merchant: 'Du Telecom', location: 'Mobile Bill', amount: 149.99, date: '2025-03-01', time: '10:00', category: 'Telecom' },
        { merchant: 'Etisalat', location: 'Internet Bill', amount: 199.99, date: '2025-03-01', time: '10:00', category: 'Internet' },
      ]
    },
    general: {
      name: 'General',
      icon: CreditCard,
      color: 'from-slate-600 to-slate-700',
      amount: 432.32,
      transactionCount: 3,
      change: '-2.3%',
      changeType: 'decrease',
      chartData: [
        { month: 'Jan', amount: 400 },
        { month: 'Feb', amount: 450 },
        { month: 'Mar', amount: 432 },
        { month: 'Apr', amount: 380 },
        { month: 'May', amount: 420 },
        { month: 'Jun', amount: 410 },
      ],
      transactionList: [
        { merchant: 'Emirates NBD', location: 'ATM Withdrawal', amount: 200.00, date: '2025-03-13', time: '14:30', category: 'Banking' },
        { merchant: 'Careem', location: 'Ride to Dubai Mall', amount: 45.75, date: '2025-03-11', time: '16:20', category: 'Transport' },
        { merchant: 'RTA Metro', location: 'Public Transport', amount: 12.50, date: '2025-03-09', time: '08:45', category: 'Transport' },
      ]
    }
  }

  const currentCategory = categoryData[categoryName?.toLowerCase() || 'restaurant'] || categoryData.restaurant

  // Professional line chart component
  const LineChart = ({ data }: { data: any[] }) => {
    const maxAmount = Math.max(...data.map(d => d.amount))
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 300
      const y = 80 - (item.amount / maxAmount) * 60
      return `${x},${y}`
    }).join(' ')

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Spending Trend</h3>
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <svg width="300" height="80" className="w-full">
            <polyline
              points={points}
              fill="none"
              stroke={`url(#gradient)`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 300
              const y = 80 - (item.amount / maxAmount) * 60
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#334155"
                  className="hover:r-6 transition-all duration-200"
                />
              )
            })}
          </svg>
          
          <div className="flex justify-between mt-4 text-sm text-slate-600">
            {data.map((item, index) => (
              <span key={index}>{item.month}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="text-slate-700" />
            </button>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentCategory.color} flex items-center justify-center`}>
                <currentCategory.icon size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{currentCategory.name}</h1>
                <p className="text-sm text-slate-600">{currentCategory.transactionList.length} transactions this month</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <Download size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Professional Summary Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Total Spent This Month</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {currentCategory.amount.toFixed(2)} AED
              </h2>
              <div className={`flex items-center space-x-1 ${
                currentCategory.changeType === 'increase' ? 'text-red-600' : 'text-emerald-600'
              }`}>
                <span className="font-semibold">{currentCategory.change}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600 mb-1">Transactions</p>
              <p className="text-2xl font-bold text-slate-900">{currentCategory.transactionList.length}</p>
              <p className="text-sm text-slate-500">this month</p>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <LineChart data={currentCategory.chartData} />

        {/* Professional Transactions List */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            {currentCategory.transactionList.map((transaction: any, index: number) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentCategory.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <currentCategory.icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-base truncate pr-3">{transaction.merchant}</h4>
                      <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1">
                        <MapPin size={12} className="flex-shrink-0" />
                        <span className="truncate">{transaction.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-semibold text-slate-900 text-base">
                      {transaction.amount.toFixed(2)} AED
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{transaction.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{transaction.time}</span>
                    </div>
                  </div>
                  
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                    {transaction.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}