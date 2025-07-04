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
  Shield,
  Eye,
  EyeOff,
  ChevronRight,
  MapPin
} from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Categories')
  const [showAmounts, setShowAmounts] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    )
  }

  const spendingCategories = [
    { 
      name: 'Restaurant', 
      icon: UtensilsCrossed, 
      amount: 1460.35, 
      transactions: 33,
      isTop: true,
      change: '+159.21%',
      changeType: 'increase',
      color: 'from-slate-600 to-slate-700',
      lightColor: 'from-slate-50 to-slate-100',
      budget: 2000,
      trend: [45, 52, 48, 61, 55, 67, 73],
      transactionDetails: [
        { merchant: 'Zuma Dubai', location: 'DIFC, Dubai', amount: 285.50, date: '2025-03-15', time: '19:30' },
        { merchant: 'La Petite Maison', location: 'Jumeirah, Dubai', amount: 225.75, date: '2025-03-14', time: '20:15' },
        { merchant: 'Nobu Dubai', location: 'Atlantis, Dubai', amount: 365.80, date: '2025-03-12', time: '21:00' },
        { merchant: 'Starbucks', location: 'Mall of Emirates', amount: 28.50, date: '2025-03-10', time: '14:30' }
      ]
    },
    { 
      name: 'Shopping', 
      icon: ShoppingBag, 
      amount: 1391.44, 
      transactions: 13,
      change: '+23.5%',
      changeType: 'increase',
      color: 'from-blue-600 to-blue-700',
      lightColor: 'from-blue-50 to-blue-100',
      budget: 1800,
      trend: [30, 38, 35, 42, 39, 45, 48],
      transactionDetails: [
        { merchant: 'Apple Store', location: 'Dubai Mall', amount: 459.99, date: '2025-03-13', time: '16:45' },
        { merchant: 'Zara', location: 'City Walk', amount: 185.75, date: '2025-03-11', time: '15:20' },
        { merchant: 'H&M', location: 'Mall of Emirates', amount: 125.50, date: '2025-03-08', time: '17:30' }
      ]
    },
    { 
      name: 'Entertainment', 
      icon: Gamepad2, 
      amount: 1292.88, 
      transactions: 5,
      change: '-8.2%',
      changeType: 'decrease',
      color: 'from-indigo-600 to-indigo-700',
      lightColor: 'from-indigo-50 to-indigo-100',
      budget: 1500,
      trend: [25, 28, 31, 29, 26, 23, 20],
      transactionDetails: [
        { merchant: 'VOX Cinemas', location: 'Dubai Mall', amount: 85.00, date: '2025-03-14', time: '19:00' },
        { merchant: 'Netflix', location: 'Online Subscription', amount: 55.99, date: '2025-03-01', time: '12:00' },
        { merchant: 'Spotify Premium', location: 'Music Streaming', amount: 19.99, date: '2025-03-01', time: '12:00' }
      ]
    },
    { 
      name: 'Grocery', 
      icon: ShoppingCart, 
      amount: 514.61, 
      transactions: 17,
      change: '+12.8%',
      changeType: 'increase',
      color: 'from-emerald-600 to-emerald-700',
      lightColor: 'from-emerald-50 to-emerald-100',
      budget: 800,
      trend: [15, 18, 16, 22, 19, 25, 28],
      transactionDetails: [
        { merchant: 'Carrefour', location: 'Mall of Emirates', amount: 145.80, date: '2025-03-15', time: '18:45' },
        { merchant: 'Spinneys', location: 'Jumeirah', amount: 89.50, date: '2025-03-12', time: '16:30' },
        { merchant: 'Union Coop', location: 'Al Wasl', amount: 67.25, date: '2025-03-10', time: '19:15' }
      ]
    },
    { 
      name: 'Utility', 
      icon: Zap, 
      amount: 505.35, 
      transactions: 4,
      change: '+5.1%',
      changeType: 'increase',
      color: 'from-cyan-600 to-cyan-700',
      lightColor: 'from-cyan-50 to-cyan-100',
      budget: 600,
      trend: [12, 14, 13, 15, 14, 16, 17],
      transactionDetails: [
        { merchant: 'DEWA', location: 'Electricity & Water', amount: 285.50, date: '2025-03-01', time: '10:00' },
        { merchant: 'Du Telecom', location: 'Mobile Bill', amount: 149.99, date: '2025-03-01', time: '10:00' }
      ]
    },
    { 
      name: 'General', 
      icon: CreditCard, 
      amount: 432.32, 
      transactions: 3,
      change: '-2.3%',
      changeType: 'decrease',
      color: 'from-slate-600 to-slate-700',
      lightColor: 'from-slate-50 to-slate-100',
      budget: 500,
      trend: [8, 10, 9, 11, 10, 9, 8],
      transactionDetails: [
        { merchant: 'Emirates NBD', location: 'ATM Withdrawal', amount: 200.00, date: '2025-03-13', time: '14:30' },
        { merchant: 'Careem', location: 'Ride to Dubai Mall', amount: 45.75, date: '2025-03-11', time: '16:20' },
        { merchant: 'RTA Metro', location: 'Public Transport', amount: 12.50, date: '2025-03-09', time: '08:45' }
      ]
    }
  ]

  const totalSpent = spendingCategories.reduce((sum, category) => sum + category.amount, 0)
  const totalBudget = spendingCategories.reduce((sum, category) => sum + category.budget, 0)
  const topCategory = spendingCategories.find(cat => cat.isTop)

  // Simple number display with privacy effect
  const SimpleNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
    // Generate smooth tiny particles
    const generateTinyParticles = () => {
      const particles = []
      for (let i = 0; i < 80; i++) {
        particles.push(
          <div
            key={i}
            className="absolute bg-slate-500 rounded-full z-10"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.4,
              animation: `gentleFloat ${3 + Math.random() * 3}s infinite linear`,
              animationDelay: `${Math.random() * 4}s`,
              transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
            }}
          />
        )
      }
      return particles
    }

    return (
      <>
        <span className="tabular-nums relative overflow-hidden">
          <span className={`${!showAmounts ? 'blur-sm' : ''} transition-all duration-500`}>
            {prefix}{value.toFixed(2)}{suffix}
          </span>
          {!showAmounts && (
            <span className="absolute inset-0 rounded-md overflow-hidden">
              {/* Base blur layer */}
              <span className="absolute inset-0 bg-gradient-to-r from-slate-200/30 via-slate-300/40 to-slate-200/30 backdrop-blur-sm z-0"></span>
              
              {/* Animated tiny particles - on top */}
              <span className="absolute inset-0 z-20">
                {generateTinyParticles()}
              </span>
            </span>
          )}
        </span>
        
        {/* Gentle particle animation CSS */}
        <style jsx global>{`
          @keyframes gentleFloat {
            0% { 
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
            25% { 
              transform: translate(0.5px, -0.5px) scale(1.05);
              opacity: 0.4;
            }
            50% { 
              transform: translate(-0.5px, 0.5px) scale(0.95);
              opacity: 0.3;
            }
            75% { 
              transform: translate(0.5px, 0.5px) scale(1.02);
              opacity: 0.4;
            }
            100% { 
              transform: translate(0, 0) scale(1);
              opacity: 0.3;
            }
          }
        `}</style>
      </>
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
            <div>
              <h1 className="text-xl font-bold text-slate-900">Spending Analysis</h1>
              <p className="text-sm text-slate-600">March 2025</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowAmounts(!showAmounts)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              {showAmounts ? <EyeOff size={18} className="text-slate-600" /> : <Eye size={18} className="text-slate-600" />}
            </button>
            <button className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 transition-colors">
              <Shield size={16} />
              <span className="text-sm font-medium">Secure</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Professional Total Amount Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">Total Spending</p>
                             <h2 className="text-3xl font-bold text-slate-900">
                 <SimpleNumber value={totalSpent} suffix=" AED" />
               </h2>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Within budget</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp size={14} className="text-emerald-600" />
                <span className="text-emerald-600 text-sm font-medium">+15.2%</span>
              </div>
            </div>
          </div>
          
          {/* Professional Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="h-2 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>{((totalSpent / totalBudget) * 100).toFixed(1)}% of monthly budget</span>
              <span>{totalBudget.toLocaleString()} AED</span>
            </div>
          </div>
        </div>

        {/* Professional Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 p-1">
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('Categories')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'Categories' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Categories
            </button>
            <button 
              onClick={() => setActiveTab('Countries')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'Countries' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Locations
            </button>
          </div>
        </div>

        {/* Enhanced Top Category Highlight */}
         {topCategory && (
           <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-slate-200 p-4 shadow-lg">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${topCategory.color} flex items-center justify-center shadow-lg`}>
                   <topCategory.icon size={20} className="text-white" />
                 </div>
                 <div className="flex-1">
                   <p className="text-xs text-orange-700 font-medium mb-1">Highest Spending Category</p>
                   <div className="flex items-center space-x-3">
                     <h3 className="text-base font-bold text-slate-900">{topCategory.name}</h3>
                     <span className="text-base font-bold text-slate-900">
                       <SimpleNumber value={topCategory.amount} suffix=" AED" />
                     </span>
                   </div>
                 </div>
               </div>
               <div className="text-right flex-shrink-0">
                 <div className="flex items-center justify-end space-x-1 mb-7">
                   <TrendingUp size={12} className="text-red-600" />
                   <span className="text-red-600 font-semibold text-xs">{topCategory.change}</span>
                 </div>
               </div>
             </div>
           </div>
         )}

        {/* Professional Collapsible Category Cards */}
        <div className="space-y-3">
          {spendingCategories.map((category, index) => {
            const isExpanded = expandedCategories.includes(category.name)
            
            return (
              <div 
                key={category.name} 
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Category Header - Clickable */}
                <div 
                  className="p-5 cursor-pointer hover:bg-slate-50/50 transition-colors duration-200"
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <category.icon size={18} className="text-white" />
                      </div>
                      
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{category.name}</h4>
                        <p className="text-sm text-slate-600">{category.transactions} transactions</p>
                      </div>
                    </div>
                    
                                         <div className="flex items-center space-x-3">
                       <div className="text-right flex flex-col items-end">
                         <div className="text-base font-bold text-slate-900 mb-1">
                           <SimpleNumber value={category.amount} suffix=" AED" />
                         </div>
                         <div className={`flex items-center space-x-1 ${
                           category.changeType === 'increase' ? 'text-red-600' : 'text-emerald-600'
                         }`}>
                           {category.changeType === 'increase' ? 
                             <TrendingUp size={12} /> : 
                             <TrendingDown size={12} />
                           }
                           <span className="text-sm font-medium">{category.change}</span>
                         </div>
                       </div>
                       
                       {/* Expand/Collapse Icon */}
                       <ChevronRight 
                         size={18} 
                         className={`text-slate-400 transition-transform duration-200 ${
                           isExpanded ? 'rotate-90' : ''
                         }`}
                       />
                     </div>
                  </div>
                  
                  {/* Professional Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${Math.min((category.amount / category.budget) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-slate-600">
                      <span>{((category.amount / category.budget) * 100).toFixed(1)}% of budget</span>
                      <span>{category.budget.toLocaleString()} AED limit</span>
                    </div>
                  </div>
                </div>

                {/* Collapsible Transaction Details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50/30">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-sm font-semibold text-slate-700">Recent Transactions</h5>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          View All
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {category.transactionDetails.map((transaction, txIndex) => (
                          <div 
                            key={txIndex}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                                <category.icon size={14} className="text-white" />
                              </div>
                              
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-slate-900 truncate">{transaction.merchant}</p>
                                <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1">
                                  <MapPin size={10} className="flex-shrink-0" />
                                  <span className="truncate">{transaction.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                                  <span>{transaction.date}</span>
                                  <span>•</span>
                                  <span>{transaction.time}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right flex-shrink-0 ml-3">
                              <p className="text-sm font-bold text-slate-900">
                                {transaction.amount.toFixed(2)} AED
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* View More Button */}
                      {category.transactions > category.transactionDetails.length && (
                        <button className="w-full mt-4 py-3 text-sm text-slate-600 hover:text-slate-900 font-medium border border-slate-200 rounded-lg hover:bg-white hover:border-slate-300 transition-all duration-200">
                          View {category.transactions - category.transactionDetails.length} More Transactions
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Global Menu */}
      <GlobalMenu currentPage="dashboard" />
    </div>
  )
}