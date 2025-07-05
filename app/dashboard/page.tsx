"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarDays } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import GlobalMenu from "@/components/GlobalMenu"
import { BANK_CARDS, getCardBySelection, getDefaultCard, BANKS_LIST } from "@/lib/cardDatabase"
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
  Shield,
  Eye,
  EyeOff,
  Send,
  Download,
  MapPin,
  Phone,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Building2,
  Smartphone,
  Car,
  Home,
  Coffee,
  Wifi,
  Cpu,
  Star,
  Crown,
  Edit3,
  Check,
  X
} from "lucide-react"

// Card Pattern Component (same as before)
const CardPattern = ({ pattern, className = "" }: { pattern: string; className?: string }) => {
  const patterns: Record<string, React.ReactElement> = {
    'premium-metallic': (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-600/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-yellow-400/20 rounded-full blur-sm"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `shimmer ${3 + Math.random() * 4}s infinite linear`,
                animationDelay: Math.random() * 4 + 's'
              }}
            />
          ))}
        </div>
      </div>
    ),
    'gold-shimmer': (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-amber-400/10 to-yellow-500/20"></div>
        <div className="absolute top-8 right-8 w-24 h-24 bg-yellow-200/20 rounded-full blur-2xl"></div>
      </div>
    ),
    'classic-waves': (
      <div className={`absolute inset-0 ${className}`}>
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200">
          <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="currentColor" />
        </svg>
      </div>
    ),
    'infinite-luxury': (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-emerald-600/10"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-300/5 rounded-full blur-3xl"></div>
      </div>
    ),
    'signature-elegant': (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-300/10 to-transparent"></div>
        <div className="absolute top-1/3 right-6 w-6 h-6 border border-emerald-300/30 rounded-full"></div>
      </div>
    ),
    'touchpoints-premium': (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-indigo-400/10"></div>
        <div className="absolute top-8 left-8 w-4 h-4 bg-purple-300/40 transform rotate-45"></div>
      </div>
    ),
    'rak-modern': (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-tl from-red-400/10 to-transparent"></div>
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    ),
    'titanium-metallic': (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-transparent"></div>
        <div className="absolute top-6 right-6 w-20 h-20 bg-slate-300/10 rounded-full blur-xl"></div>
      </div>
    )
  }
  return patterns[pattern] || patterns['classic-waves']
}

// Tier Badge Component
const TierBadge = ({ tier, className = "" }: { tier: string; className?: string }) => {
  const badges: Record<string, React.ReactElement | null> = {
    infinite: <Crown size={8} className="text-yellow-400" />,
    platinum: <Star size={8} className="text-slate-300" />,
    signature: <Shield size={8} className="text-emerald-400" />,
    gold: <Star size={8} className="text-yellow-400" />,
    world: <Star size={8} className="text-blue-400" />,
    premium: <Star size={8} className="text-red-400" />,
    standard: null
  }
  
  if (!badges[tier]) return null
  
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {badges[tier]}
      <span className="text-xs font-medium capitalize opacity-80 truncate">{tier}</span>
    </div>
  )
}

// Card Selection Modal
const CardSelectionModal = ({ isOpen, onClose, onSelect, currentCard }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSelect: (bankId: string, cardId: string) => void; 
  currentCard: number | null 
}) => {
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedCard, setSelectedCard] = useState('')

  if (!isOpen) return null

  const handleSelect = () => {
    if (selectedBank && selectedCard) {
      onSelect(selectedBank, selectedCard)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Select Your Card</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Bank Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Choose Bank</h3>
            <div className="grid grid-cols-2 gap-3">
              {BANKS_LIST.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => {
                    setSelectedBank(bank.id)
                    setSelectedCard('')
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedBank === bank.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-lg mb-1">{bank.logo}</div>
                  <div className="text-xs font-medium text-slate-700">{bank.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Card Selection */}
          {selectedBank && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Choose Card Type</h3>
              <div className="space-y-2">
                {BANK_CARDS[selectedBank].cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card.id)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      selectedCard === card.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-900">{card.name}</div>
                        <div className="text-xs text-slate-500 capitalize">{card.type} • {card.tier}</div>
                      </div>
                      <div className="text-lg">{card.logo}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              disabled={!selectedBank || !selectedCard}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Select Card
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Manual Card Component
const ManualCard = ({ 
  lastFour = "1234",
  holderName = "MOHAMED ALMEHAIRBI", 
  expiryDate = "12/28",
  balance = 12456.78,
  accountName = "Current Account",
  bankId = null,
  cardId = null,
  showBalance = true,
  showDetails = true,
  onEdit,
  className = ""
}: {
  lastFour?: string;
  holderName?: string;
  expiryDate?: string;
  balance?: number;
  accountName?: string;
  bankId?: string | null;
  cardId?: string | null;
  showBalance?: boolean;
  showDetails?: boolean;
  onEdit?: () => void;
  className?: string;
}) => {
  const [cardDesign, setCardDesign] = useState(getDefaultCard())

  useEffect(() => {
    if (bankId && cardId) {
      const design = getCardBySelection(bankId, cardId)
      if (design) {
        setCardDesign(design)
      }
    }
  }, [bankId, cardId])

  return (
    <div className={`relative ${className}`}>
      <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${cardDesign.colors.primary} relative overflow-hidden shadow-xl transform transition-all duration-500`}>
        {/* Card Pattern */}
        <CardPattern pattern={cardDesign.pattern} className="opacity-80" />
        
        {/* Edit Button */}
        {onEdit && (
          <button
            onClick={onEdit}
            className="absolute top-3 right-3 p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors z-20"
          >
            <Edit3 size={14} className="text-white" />
          </button>
        )}
        
        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-lg filter drop-shadow-lg">{cardDesign.logo}</div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-xs font-bold ${cardDesign.colors.text} opacity-90 leading-tight truncate`}>
                  {cardDesign.bank}
                </h3>
                <p className={`text-xs ${cardDesign.colors.accent} uppercase tracking-tight font-medium opacity-80 leading-tight truncate`}>
                  {cardDesign.series}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Wifi size={12} className={`${cardDesign.colors.accent} opacity-80`} />
              <TierBadge tier={cardDesign.tier} className={cardDesign.colors.accent} />
            </div>
          </div>

          {/* Middle Section - Balance */}
          {showBalance && (
            <div className="my-1">
              <p className={`text-xs ${cardDesign.colors.accent} mb-1 opacity-80`}>{accountName}</p>
              <p className={`text-lg font-bold ${cardDesign.colors.text} filter drop-shadow-sm leading-tight`}>
                {showDetails ? `${balance.toLocaleString()} AED` : '••••••'}
              </p>
            </div>
          )}

          {/* Bottom Section */}
          <div className="flex items-end justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-6 bg-gradient-to-br ${cardDesign.colors.secondary} rounded-sm flex items-center justify-center shadow-lg`}>
                <Cpu size={12} className="text-white" />
              </div>
              <div>
                <p className={`text-base font-mono tracking-wider ${cardDesign.colors.text} filter drop-shadow-sm leading-tight`}>
                  {showDetails ? `•••• •••• •••• ${lastFour}` : `•••• •••• •••• ••••`}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <div>
                    <p className={`text-xs ${cardDesign.colors.accent} opacity-80 leading-tight`}>CARDHOLDER</p>
                    <p className={`text-xs font-medium ${cardDesign.colors.text} filter drop-shadow-sm leading-tight`}>
                      {showDetails ? holderName : '••••••••••••'}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${cardDesign.colors.accent} opacity-80 leading-tight`}>EXPIRES</p>
                    <p className={`text-xs font-medium ${cardDesign.colors.text} filter drop-shadow-sm leading-tight`}>
                      {showDetails ? expiryDate : '••/••'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shimmer animation */}
        <style jsx>{`
          @keyframes shimmer {
            0% { opacity: 0.3; transform: translateX(-100%); }
            50% { opacity: 0.8; }
            100% { opacity: 0.3; transform: translateX(100%); }
          }
        `}</style>
      </div>
      
      {/* Card Features */}
      {cardDesign.features && (
        <div className="mt-2 flex flex-wrap gap-1">
          {cardDesign.features.slice(0, 3).map((feature: string, index: number) => (
            <span 
              key={index}
              className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Categories')
  const [showAmounts, setShowAmounts] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [editingCard, setEditingCard] = useState<number | null>(null)
  const [showCardSelector, setShowCardSelector] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  // Account data with only last 4 digits and manual card selection
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Current Account",
      type: "checking",
      balance: 12456.78,
      accountNumber: "****1234",
      lastFour: "1234",
      bankId: 'fab', // Default selection
      cardId: 'fab-platinum',
      currency: "AED"
    },
    {
      id: 2,
      name: "Savings Account",
      type: "savings",
      balance: 45890.23,
      accountNumber: "****5678",
      lastFour: "5678",
      bankId: 'enbd', // Default selection
      cardId: 'enbd-signature',
      currency: "AED"
    }
  ])

  const handleCardEdit = (accountId: number) => {
    setEditingCard(accountId)
    setShowCardSelector(true)
  }

  const handleCardSelect = (bankId: string, cardId: string) => {
    if (editingCard) {
      setAccounts(prev => prev.map(account => 
        account.id === editingCard 
          ? { ...account, bankId, cardId }
          : account
      ))
      setEditingCard(null)
    }
  }

  // Card-specific transactions
  const cardTransactions = {
    1: [ // Current Account transactions
      {
        id: 1,
        merchant: "Zuma Dubai",
        category: "Restaurant",
        amount: -285.50,
        date: "2025-01-15",
        time: "19:30",
        icon: Coffee,
        status: "completed"
      },
      {
        id: 2,
        merchant: "Salary Deposit",
        category: "Income",
        amount: 15000.00,
        date: "2025-01-15",
        time: "09:00",
        icon: Building2,
        status: "completed"
      },
      {
        id: 3,
        merchant: "Apple Store",
        category: "Shopping",
        amount: -459.99,
        date: "2025-01-14",
        time: "16:45",
        icon: Smartphone,
        status: "completed"
      },
      {
        id: 4,
        merchant: "Careem",
        category: "Transport",
        amount: -45.75,
        date: "2025-01-14",
        time: "16:20",
        icon: Car,
        status: "completed"
      },
      {
        id: 5,
        merchant: "DEWA",
        category: "Utilities",
        amount: -285.50,
        date: "2025-01-13",
        time: "10:00",
        icon: Home,
        status: "completed"
      }
    ],
    2: [ // Savings Account transactions
      {
        id: 6,
        merchant: "Investment Return",
        category: "Investment",
        amount: 2500.00,
        date: "2025-01-14",
        time: "12:00",
        icon: TrendingUp,
        status: "completed"
      },
      {
        id: 7,
        merchant: "Monthly Transfer",
        category: "Transfer",
        amount: -5000.00,
        date: "2025-01-13",
        time: "10:30",
        icon: Send,
        status: "completed"
      },
      {
        id: 8,
        merchant: "Interest Payment",
        category: "Interest",
        amount: 156.78,
        date: "2025-01-12",
        time: "08:00",
        icon: TrendingUp,
        status: "completed"
      },
      {
        id: 9,
        merchant: "Savings Goal",
        category: "Savings",
        amount: -1000.00,
        date: "2025-01-11",
        time: "14:15",
        icon: Shield,
        status: "completed"
      }
    ]
  }

  // Get current active card's transactions
  const getCurrentCardTransactions = () => {
    const currentAccountId = accounts[activeCardIndex]?.id
    return cardTransactions[currentAccountId as keyof typeof cardTransactions] || []
  }

  // Get current card width based on screen size
  const getCardWidth = () => {
    const isMobile = window.innerWidth < 640 // sm breakpoint
    return isMobile ? 288 + 16 : 320 + 16 // w-72 (288px) or w-80 (320px) + mr-4 (16px margin)
  }

  // Handle card swipe
  const handleCardSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeCardIndex < accounts.length - 1) {
      setActiveCardIndex(prev => prev + 1)
    } else if (direction === 'right' && activeCardIndex > 0) {
      setActiveCardIndex(prev => prev - 1)
    }
  }

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    const container = document.querySelector('.card-container')
    if (container) {
      const cardWidth = getCardWidth()
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
    setActiveCardIndex(index)
  }

  // Handle scroll/swipe on card container
  const handleCardScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const cardWidth = getCardWidth()
    const scrollLeft = container.scrollLeft
    const newIndex = Math.round(scrollLeft / cardWidth)
    
    if (newIndex !== activeCardIndex && newIndex >= 0 && newIndex < accounts.length) {
      // Debounce the state update to prevent conflicts with programmatic scrolling
      setTimeout(() => {
        setActiveCardIndex(newIndex)
      }, 50)
    }
  }

  // Touch handling for smooth swiping
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && activeCardIndex < accounts.length - 1) {
      scrollToCard(activeCardIndex + 1)
    }
    if (isRightSwipe && activeCardIndex > 0) {
      scrollToCard(activeCardIndex - 1)
    }
  }

  const quickActions = [
    { name: "Transfer", icon: Send, color: "bg-blue-500", action: () => {} },
    { name: "Pay Bills", icon: CreditCard, color: "bg-green-500", action: () => {} },
    { name: "Deposit", icon: Download, color: "bg-purple-500", action: () => {} },
    { name: "Support", icon: Phone, color: "bg-red-500", action: () => {} }
  ]

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
      budget: 2000,
    },
    { 
      name: 'Entertainment', 
      icon: Gamepad2, 
      amount: 1292.88, 
      transactions: 5,
      change: '-8.2%',
      changeType: 'decrease',
      color: 'from-indigo-600 to-indigo-700',
      budget: 1500,
    },
    { 
      name: 'Grocery', 
      icon: ShoppingCart, 
      amount: 514.61, 
      transactions: 17,
      change: '+12.8%',
      changeType: 'increase',
      color: 'from-emerald-600 to-emerald-700',
      budget: 800,
    },
    { 
      name: 'Utility', 
      icon: Zap, 
      amount: 505.35, 
      transactions: 4,
      change: '+5.1%',
      changeType: 'increase',
      color: 'from-cyan-600 to-cyan-700',
      budget: 600,
    },
    { 
      name: 'General', 
      icon: CreditCard, 
      amount: 432.32, 
      transactions: 3,
      change: '-2.3%',
      changeType: 'decrease',
      color: 'from-slate-600 to-slate-700',
      budget: 500,
    }
  ]

  const totalSpent = spendingCategories.reduce((sum, category) => sum + category.amount, 0)
  const totalBudget = spendingCategories.reduce((sum, category) => sum + category.budget, 0)
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const activeCardBalance = accounts[activeCardIndex]?.balance || 0

  // Simple number display with privacy effect
  const SimpleNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
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
              <span className="absolute inset-0 bg-gradient-to-r from-slate-200/30 via-slate-300/40 to-slate-200/30 backdrop-blur-sm z-0"></span>
              <span className="absolute inset-0 z-20">
                {generateTinyParticles()}
              </span>
            </span>
          )}
        </span>
        
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Enhanced Professional Header */}
      <div className="bg-gradient-to-r from-white to-slate-50 border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900">Welcome back, Mohamed</h1>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-600 text-xs">Here's your spending overview for March 2025</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 border-slate-200"
                  >
                    <CalendarDays size={18} className="text-slate-600" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <button 
                onClick={() => setShowAmounts(!showAmounts)}
                className={`p-2 rounded-lg border transition-colors duration-200 ${
                  !showAmounts 
                    ? 'border-slate-900 bg-slate-900 hover:bg-slate-800' 
                    : 'border-slate-200 hover:bg-slate-100'
                }`}
              >
                {showAmounts ? (
                  <EyeOff size={18} className="text-slate-600" />
                ) : (
                  <Eye size={18} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Swipeable Card Container */}
        <div className="relative">
          {/* Card Container */}
          <div 
            className="card-container flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-4"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
            onScroll={handleCardScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {accounts.map((account, index) => (
              <div 
                key={account.id}
                className={`flex-none w-72 sm:w-80 snap-center mr-4 cursor-pointer transition-all duration-200 ${
                  index === activeCardIndex 
                    ? 'scale-100' 
                    : 'scale-95 opacity-90'
                }`}
                style={{ scrollSnapAlign: 'center' }}
                onClick={() => index !== activeCardIndex && scrollToCard(index)}
              >
                <ManualCard
                  lastFour={account.lastFour}
                  holderName="MOHAMED ALMEHAIRBI"
                  expiryDate="12/28"
                  balance={account.balance}
                  accountName={account.name}
                  bankId={account.bankId}
                  cardId={account.cardId}
                  showBalance={true}
                  showDetails={showAmounts}
                  onEdit={() => handleCardEdit(account.id)}
                />
              </div>
            ))}
            {/* Spacer to ensure last card can be centered */}
            <div className="flex-none w-4"></div>
          </div>
          

          
          {/* Card Indicators */}
          <div className="flex flex-col items-center mt-4 space-y-2">
            <div className="flex justify-center space-x-2">
              {accounts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeCardIndex 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            {accounts.length > 1 && (
              <p className="text-xs text-slate-500 text-center">
                Swipe or tap on a card to view it
              </p>
            )}
          </div>
          

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={action.name}
                onClick={action.action}
                className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center shadow-lg`}>
                  <action.icon size={20} className="text-white" />
                </div>
                <span className="text-xs font-medium text-slate-700">{action.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Total Spending Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
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
          
          <div className="space-y-2">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>{((totalSpent / totalBudget) * 100).toFixed(1)}% of monthly budget</span>
              <span><SimpleNumber value={totalBudget} suffix=" AED" /></span>
            </div>
          </div>
        </div>

        {/* Recent Transactions for Active Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
              <p className="text-sm text-slate-500 mt-1">
                {accounts[activeCardIndex]?.name} • •••• {accounts[activeCardIndex]?.lastFour}
              </p>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {getCurrentCardTransactions().map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <transaction.icon size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{transaction.merchant}</p>
                    <p className="text-xs text-slate-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-sm font-bold ${transaction.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    <SimpleNumber 
                      value={Math.abs(transaction.amount)} 
                      prefix={transaction.amount > 0 ? '+' : '-'} 
                      suffix=" AED" 
                    />
                  </p>
                  <p className="text-xs text-slate-500">{transaction.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state */}
          {getCurrentCardTransactions().length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm">No recent transactions for this card</p>
            </div>
          )}
        </div>

        {/* Simplified Category Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Spending Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {spendingCategories.map((category, index) => (
              <div 
                key={category.name} 
                className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                onClick={() => router.push(`/dashboard/category/${category.name.toLowerCase()}`)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg mb-3`}>
                  <category.icon size={20} className="text-white" />
                </div>
                <h4 className="text-sm font-medium text-slate-900 text-center">{category.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Selection Modal */}
      <CardSelectionModal
        isOpen={showCardSelector}
        onClose={() => {
          setShowCardSelector(false)
          setEditingCard(null)
        }}
        onSelect={handleCardSelect}
        currentCard={editingCard}
      />

      {/* Global Menu */}
      <GlobalMenu currentPage="dashboard" />
    </div>
  )
}