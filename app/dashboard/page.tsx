"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Inter } from "next/font/google"
import { CalendarDays } from "lucide-react"

const inter = Inter({ subsets: ['latin'] })
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import GlobalMenu from "@/components/GlobalMenu"
import { BANK_CARDS, getCardBySelection, getDefaultCard, BANKS_LIST } from "@/lib/cardDatabase"

// Create banks list for dropdown
const BANKS_DROPDOWN = Object.keys(BANK_CARDS).map(bankId => ({
  id: bankId,
  name: BANK_CARDS[bankId].name
}))
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
  X,
  AlertTriangle,
  Clock,
  DollarSign,
  Bell,
  Calendar as CalendarIcon,
  Timer,
  AlertCircle
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
  return patterns[pattern as keyof typeof patterns] || patterns['classic-waves']
}

// Tier Badge Component
const TierBadge = ({ tier, className = "", textColor = "#d1d5db" }: { tier: string; className?: string; textColor?: string }) => {
  const badges: Record<string, React.ReactElement | null> = {
    infinite: <Crown size={8} style={{ color: textColor }} />,
    platinum: <Star size={8} style={{ color: textColor }} />,
    signature: <Shield size={8} style={{ color: textColor }} />,
    gold: <Star size={8} style={{ color: textColor }} />,
    world: <Star size={8} style={{ color: textColor }} />,
    premium: <Star size={8} style={{ color: textColor }} />,
    standard: null
  }
  
  if (!badges[tier as keyof typeof badges]) return null
  
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {badges[tier as keyof typeof badges]}
      <span className="text-xs font-medium capitalize opacity-80" style={{ color: textColor, fontSize: '10px' }}>{tier}</span>
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
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-slate-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <CreditCard size={20} className="text-white" />
              </div>
              <div>
            <h2 className="text-xl font-bold text-slate-900">Select Your Card</h2>
                <p className="text-sm text-slate-600">Choose from your available cards</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} className="text-slate-600" />
            </button>
          </div>
          </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-0">

          {/* Bank Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Choose Bank</h3>
            <div className="grid grid-cols-1 gap-3">
              {BANKS_LIST.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => {
                    setSelectedBank(bank.id)
                    setSelectedCard('')
                  }}
                  className={`p-3 rounded-lg border-[1.5px] transition-all ${
                    selectedBank === bank.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
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
                    className={`w-full p-3 rounded-lg border-[1.5px] text-left transition-all ${
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
          <div className="flex space-x-3 mt-6 pt-4 border-t border-slate-200">
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
              Modify Card
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
  isExternal = false,
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
  isExternal?: boolean;
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

  // Convert Tailwind gradient to CSS
  const getGradientStyle = (gradientString: string) => {
    // Parse Tailwind gradient classes like "from-slate-800 via-slate-900 to-black"
    const fromMatch = gradientString.match(/from-(\w+)-(\d+)/)
    const viaMatch = gradientString.match(/via-(\w+)-(\d+)/)
    const toMatch = gradientString.match(/to-(\w+)-(\d+)/)
    
    const colorMap: Record<string, Record<string, string>> = {
      slate: { '600': '#475569', '700': '#334155', '800': '#1e293b', '900': '#0f172a' },
      black: { '900': '#000000' },
      emerald: { '600': '#059669', '700': '#047857', '800': '#065f46', '900': '#064e3b' },
      blue: { '600': '#2563eb', '700': '#1d4ed8', '800': '#1e40af', '900': '#1e3a8a' },
      purple: { '600': '#9333ea', '700': '#7c3aed', '800': '#6b21a8', '900': '#581c87' },
      yellow: { '600': '#ca8a04', '700': '#a16207', '800': '#854d0e', '900': '#713f12' },
      amber: { '600': '#d97706', '700': '#b45309', '800': '#92400e', '900': '#78350f' },
      red: { '600': '#dc2626', '700': '#b91c1c', '800': '#991b1b', '900': '#7f1d1d' },
      green: { '600': '#16a34a', '700': '#15803d', '800': '#166534', '900': '#14532d' },
      indigo: { '600': '#4f46e5', '700': '#4338ca', '800': '#3730a3', '900': '#312e81' },
      orange: { '600': '#ea580c', '700': '#c2410c', '800': '#9a3412', '900': '#7c2d12' },
      pink: { '600': '#db2777', '700': '#be185d', '800': '#9d174d', '900': '#831843' },
      zinc: { '600': '#52525b', '700': '#3f3f46', '800': '#27272a', '900': '#18181b' }
    }
    
    let fromColor = '#475569' // default slate-600
    let viaColor = ''
    let toColor = '#334155' // default slate-700
    
    if (fromMatch) {
      const [, colorName, shade] = fromMatch
      fromColor = colorMap[colorName]?.[shade] || fromColor
    }
    
    if (viaMatch) {
      const [, colorName, shade] = viaMatch
      viaColor = colorMap[colorName]?.[shade] || ''
    }
    
    if (toMatch) {
      const [, colorName, shade] = toMatch
      toColor = colorMap[colorName]?.[shade] || toColor
    }
    
    // Handle special case for "black"
    if (gradientString.includes('to-black')) {
      toColor = '#000000'
    }
    
    if (viaColor) {
      return `linear-gradient(to bottom right, ${fromColor}, ${viaColor}, ${toColor})`
    } else {
      return `linear-gradient(to bottom right, ${fromColor}, ${toColor})`
    }
  }

  // Calculate luminance of a color
  const getLuminance = (hex: string) => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    
    // Apply gamma correction
    const rs = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    const gs = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    const bs = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  // Get dynamic text colors based on background
  const getDynamicTextColors = (gradientString: string) => {
    // Extract the "from" color as the primary background color
    const fromMatch = gradientString.match(/from-(\w+)-(\d+)/)
    
    const colorMap: Record<string, Record<string, string>> = {
      slate: { '600': '#475569', '700': '#334155', '800': '#1e293b', '900': '#0f172a' },
      black: { '900': '#000000' },
      emerald: { '600': '#059669', '700': '#047857', '800': '#065f46', '900': '#064e3b' },
      blue: { '600': '#2563eb', '700': '#1d4ed8', '800': '#1e40af', '900': '#1e3a8a' },
      purple: { '600': '#9333ea', '700': '#7c3aed', '800': '#6b21a8', '900': '#581c87' },
      yellow: { '600': '#ca8a04', '700': '#a16207', '800': '#854d0e', '900': '#713f12' },
      amber: { '600': '#d97706', '700': '#b45309', '800': '#92400e', '900': '#78350f' },
      red: { '600': '#dc2626', '700': '#b91c1c', '800': '#991b1b', '900': '#7f1d1d' },
      green: { '600': '#16a34a', '700': '#15803d', '800': '#166534', '900': '#14532d' },
      indigo: { '600': '#4f46e5', '700': '#4338ca', '800': '#3730a3', '900': '#312e81' },
      orange: { '600': '#ea580c', '700': '#c2410c', '800': '#9a3412', '900': '#7c2d12' },
      pink: { '600': '#db2777', '700': '#be185d', '800': '#9d174d', '900': '#831843' },
      zinc: { '600': '#52525b', '700': '#3f3f46', '800': '#27272a', '900': '#18181b' }
    }
    
    let bgColor = '#475569' // default slate-600
    
    if (fromMatch) {
      const [, colorName, shade] = fromMatch
      bgColor = colorMap[colorName]?.[shade] || bgColor
    }
    
    // Handle special case for "black"
    if (gradientString.includes('from-black')) {
      bgColor = '#000000'
    }
    
    // Calculate luminance
    const luminance = getLuminance(bgColor)
    
    // Determine if background is light or dark (threshold: 0.179 for better contrast)
    const isLightBackground = luminance > 0.179
    
    // Special handling for yellow/amber colors which need different contrast
    const isYellowish = gradientString.includes('yellow') || gradientString.includes('amber')
    
    if (isYellowish) {
      // For yellow/amber backgrounds, use dark text regardless of luminance
      return {
        primary: '#1f2937',      // Dark gray
        secondary: '#374151',    // Medium dark gray  
        accent: '#4b5563',       // Medium gray
        muted: '#6b7280'         // Light gray
      }
    }
    
    return {
      primary: isLightBackground ? '#1f2937' : '#ffffff',      // Dark gray or white
      secondary: isLightBackground ? '#4b5563' : '#e5e7eb',    // Medium gray or light gray
      accent: isLightBackground ? '#6b7280' : '#d1d5db',       // Light gray or lighter gray
      muted: isLightBackground ? '#9ca3af' : '#9ca3af'         // Balanced gray
    }
  }

  // Get dynamic text colors for this card
  const dynamicColors = getDynamicTextColors(cardDesign.colors.primary)

  // Get feature colors based on card primary color
  const getFeatureColors = (gradientString: string) => {
    if (gradientString.includes('slate')) return { border: '#64748b', text: '#475569', bg: '#f8fafc' }
    if (gradientString.includes('emerald')) return { border: '#10b981', text: '#065f46', bg: '#ecfdf5' }
    if (gradientString.includes('blue')) return { border: '#3b82f6', text: '#1e40af', bg: '#eff6ff' }
    if (gradientString.includes('purple')) return { border: '#8b5cf6', text: '#6b21a8', bg: '#f5f3ff' }
    if (gradientString.includes('red')) return { border: '#ef4444', text: '#991b1b', bg: '#fef2f2' }
    if (gradientString.includes('yellow') || gradientString.includes('amber')) return { border: '#f59e0b', text: '#92400e', bg: '#fffbeb' }
    if (gradientString.includes('green')) return { border: '#22c55e', text: '#14532d', bg: '#f0fdf4' }
    if (gradientString.includes('indigo')) return { border: '#6366f1', text: '#312e81', bg: '#eef2ff' }
    if (gradientString.includes('orange')) return { border: '#f97316', text: '#9a3412', bg: '#fff7ed' }
    if (gradientString.includes('pink')) return { border: '#ec4899', text: '#831843', bg: '#fdf2f8' }
    return { border: '#64748b', text: '#475569', bg: '#f8fafc' } // default
  }

  const featureColors = getFeatureColors(cardDesign.colors.primary)

  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-48 rounded-xl relative overflow-hidden shadow-xl transform transition-all duration-500"
        style={{ 
          background: getGradientStyle(cardDesign.colors.primary)
        }}
      >
        {/* Card Pattern */}
        <CardPattern pattern={cardDesign.pattern} className="opacity-80" />
        
        {/* Edit Button */}
        {onEdit && (
        <button
          onClick={onEdit}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors z-20"
        >
            <Edit3 size={14} className="text-white" />
        </button>
        )}
        
        {/* Card Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xs font-bold opacity-90 leading-tight" style={{ color: dynamicColors.primary }}>
                  {cardDesign.bank}
                </h3>
                {isExternal && (
                  <div className="px-1.5 py-0.5 bg-white/20 rounded-full flex-shrink-0">
                    <span className="text-xs font-medium text-white/90">External</span>
                  </div>
                )}
              </div>
              <p className="text-xs uppercase tracking-tight font-medium opacity-80 leading-tight" style={{ color: dynamicColors.accent }}>
                {cardDesign.series} • {cardDesign.type ? `${cardDesign.type.charAt(0).toUpperCase() + cardDesign.type.slice(1)} Card` : 'Card'}
              </p>
            </div>
            
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Wifi size={12} className="opacity-80" style={{ color: dynamicColors.accent }} />
              <TierBadge tier={cardDesign.tier} className="" textColor={dynamicColors.accent} />
            </div>
          </div>

          {/* Middle Section - Balance */}
          {showBalance && (
            <div className="my-1">
              <p className="text-xs mb-1 opacity-80" style={{ color: dynamicColors.accent }}>{accountName}</p>
              <p className="text-lg font-bold filter drop-shadow-sm leading-tight" style={{ color: dynamicColors.primary }}>
                {showDetails ? `${balance.toLocaleString()} AED` : '••••••'}
              </p>
            </div>
          )}

          {/* Bottom Section */}
          <div className="flex items-end justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-base font-mono tracking-wider filter drop-shadow-sm leading-tight" style={{ color: dynamicColors.primary }}>
                  {showDetails ? `•••• •••• •••• ${lastFour}` : `•••• •••• •••• ••••`}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <div>
                    <p className="text-xs opacity-80 leading-tight" style={{ color: dynamicColors.accent }}>CARDHOLDER</p>
                    <p className="text-xs font-medium filter drop-shadow-sm leading-tight" style={{ color: dynamicColors.primary }}>
                      {showDetails ? holderName : '••••••••••••'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 leading-tight" style={{ color: dynamicColors.accent }}>EXPIRES</p>
                    <p className="text-xs font-medium filter drop-shadow-sm leading-tight" style={{ color: dynamicColors.primary }}>
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
      {cardDesign.features && Array.isArray(cardDesign.features) && (
        <div className="mt-2 flex flex-wrap gap-1 max-w-full">
          {(cardDesign.features as string[]).slice(0, 4).map((feature: string, index: number) => (
            <span 
              key={index}
              className="text-xs bg-white border-[1.5px] px-2 py-1 rounded-full font-medium transition-all duration-200 truncate"
              style={{ 
                fontSize: '10px',
                borderColor: featureColors.border,
                color: featureColors.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = featureColors.bg
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff'
              }}
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
  const [showAddCardModal, setShowAddCardModal] = useState(false)
  
  // External card form state
  const [externalCardForm, setExternalCardForm] = useState({
    bankName: '',
    cardType: '',
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: ''
  })
  const [cardLookupResult, setCardLookupResult] = useState<any>(null)
  const [isLookingUp, setIsLookingUp] = useState(false)
  
  // BIN lookup session tracking
  const [lastLookedUpBin, setLastLookedUpBin] = useState('')
  const [hasLookedUpInSession, setHasLookedUpInSession] = useState(false)
  const [binCache, setBinCache] = useState<Map<string, any>>(new Map()) // Cache BIN results
  
  // Cache duration: 15 minutes
  const CACHE_DURATION = 15 * 60 * 1000

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
      currency: "AED",
      isExternal: false
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
      currency: "AED",
      isExternal: false
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
    const currentAccount = accounts[activeCardIndex]
    
    // If it's an external card without transactions, return empty array with helpful message
    if (currentAccount?.isExternal && !cardTransactions[currentAccountId as keyof typeof cardTransactions]) {
      return []
    }
    
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

  // Bills data - can be dynamic
  const [urgentBills, setUrgentBills] = useState([
    {
      id: 1,
      provider: "Emirates NBD",
      amount: 2450,
      dueDate: "2025-01-12", // Past due
      status: "overdue",
      type: "Credit Card"
    },
    {
      id: 2,
      provider: "ADCB",
      amount: 890,
      dueDate: "2025-08-15", // Due soon
      status: "due_soon",
      type: "Credit Card"
    }
  ])

  const handlePayBill = (billId: number) => {
    // Remove bill after payment
    setUrgentBills(prev => prev.filter(bill => bill.id !== billId))
  }

  const handleRemindLater = (billId: number) => {
    // Could set a reminder or snooze the bill
  }

  // Smart bank name mapping with variations and keywords
  const BANK_NAME_MAPPING = {
    // Emirates NBD variations
    'emirates nbd': 'enbd',
    'enbd': 'enbd',
    'emirates national bank of dubai': 'enbd',
    
    // First Abu Dhabi Bank variations
    'first abu dhabi bank': 'fab',
    'fab': 'fab',
    'first abu dhabi': 'fab',
    
    // Abu Dhabi Commercial Bank variations
    'abu dhabi commercial bank': 'adcb',
    'adcb': 'adcb',
    'abu dhabi commercial': 'adcb',
    
    // Wio Bank variations
    'wio bank': 'wio',
    'wio bank p.j.s.c': 'wio',
    'wio bank pjsc': 'wio',
    'wio': 'wio',
    
    // Mashreq Bank variations
    'mashreq bank': 'mashreq',
    'mashreq': 'mashreq',
    'mashreq bank p.s.c': 'mashreq',
    
    // Dubai Islamic Bank variations
    'dubai islamic bank': 'dib',
    'dib': 'dib',
    'dubai islamic': 'dib',
    
    // RAKBANK variations
    'rakbank': 'rakbank',
    'rak bank': 'rakbank',
    'national bank of ras al khaimah': 'rakbank',
    
    // Commercial Bank of Dubai variations
    'commercial bank of dubai': 'cbd',
    'cbd': 'cbd',
    
    // HSBC UAE variations
    'hsbc uae': 'hsbc',
    'hsbc': 'hsbc',
    'hsbc bank middle east': 'hsbc',
    
    // Abu Dhabi Islamic Bank variations
    'abu dhabi islamic bank': 'adib',
    'adib': 'adib',
    'abu dhabi islamic': 'adib',
    
    // Other banks with variations
    'citibank uae': 'citibank',
    'citibank': 'citibank',
    'standard chartered uae': 'scb',
    'standard chartered': 'scb',
    'al hilal bank': 'alhilal',
    'emirates islamic bank': 'eib',
    'union national bank': 'unb',
    'noor bank': 'noorbank',
    'ajman bank': 'ajmanbank',
    'sharjah islamic bank': 'sib',
    'bank of sharjah': 'bos',
    'national bank of fujairah': 'nbf',
    'icici bank uae': 'icici',
    'liv bank': 'livbank'
  }

  // Smart bank matching function
  const findBankMatch = (bankName: string) => {
    if (!bankName) return null
    
    // Clean the bank name for matching
    const cleanBankName = bankName.toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,]/g, '')
      .replace(/p\.j\.s\.c\.?/g, '')
      .replace(/p\.s\.c\.?/g, '')
      .replace(/pjsc/g, '')
      .replace(/llc/g, '')
      .replace(/ltd/g, '')
      .replace(/limited/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    
    // Direct match first
    if (BANK_NAME_MAPPING[cleanBankName]) {
      return BANK_NAME_MAPPING[cleanBankName]
    }
    
    // Fuzzy matching - check if bank name contains key words
    for (const [key, value] of Object.entries(BANK_NAME_MAPPING)) {
      const keywords = key.split(' ')
      const bankWords = cleanBankName.split(' ')
      
      // Check if all keywords are present in the bank name
      const allKeywordsPresent = keywords.every(keyword => 
        bankWords.some(word => word.includes(keyword) || keyword.includes(word))
      )
      
      if (allKeywordsPresent) {
        return value
      }
    }
    
    // Partial matching for common abbreviations
    const partialMatches = [
      { pattern: /emirates.*nbd|enbd/i, bankId: 'enbd' },
      { pattern: /first.*abu.*dhabi|fab/i, bankId: 'fab' },
      { pattern: /abu.*dhabi.*commercial|adcb/i, bankId: 'adcb' },
      { pattern: /wio/i, bankId: 'wio' },
      { pattern: /mashreq/i, bankId: 'mashreq' },
      { pattern: /dubai.*islamic/i, bankId: 'dib' },
      { pattern: /rak.*bank|rakbank/i, bankId: 'rakbank' },
      { pattern: /commercial.*dubai/i, bankId: 'cbd' },
      { pattern: /hsbc/i, bankId: 'hsbc' },
      { pattern: /abu.*dhabi.*islamic|adib/i, bankId: 'adib' },
      { pattern: /citibank|citi/i, bankId: 'citibank' },
      { pattern: /standard.*chartered/i, bankId: 'scb' }
    ]
    
    for (const match of partialMatches) {
      if (match.pattern.test(bankName)) {
        return match.bankId
      }
    }
    
    return null
  }



  // Client-side BIN lookup using CORS proxy
  // Enhanced BIN lookup with multiple proxies and better error handling
  const fetchBINWithMultipleProxies = async (bin: string): Promise<any> => {
    const proxies = [
      'https://api.allorigins.win/get?url=',
      'https://thingproxy.freeboard.io/fetch/',
      'https://whateverorigin.org/get?url='
    ]
    
    for (let i = 0; i < proxies.length; i++) {
      const proxy = proxies[i]
      try {
        const url = `https://lookup.binlist.net/${bin}`
        const proxyUrl = proxy + encodeURIComponent(url)
        
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          // Add timeout
          signal: AbortSignal.timeout(10000) // 10 second timeout
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const responseText = await response.text()
        
        if (!responseText || responseText.trim() === '') {
          throw new Error('Empty response')
        }
        
        let data
        if (proxy.includes('allorigins')) {
          // AllOrigins wraps response in contents field
          const proxyData = JSON.parse(responseText)
          if (!proxyData.contents) {
            throw new Error('No contents in AllOrigins response')
          }
          data = JSON.parse(proxyData.contents)
        } else if (proxy.includes('whateverorigin')) {
          // WhateverOrigin also wraps response
          const proxyData = JSON.parse(responseText)
          if (!proxyData.contents) {
            throw new Error('No contents in WhateverOrigin response')
          }
          data = JSON.parse(proxyData.contents)
        } else {
          // ThingProxy returns direct response
          data = JSON.parse(responseText)
        }
        
        return data
        
      } catch (error) {
        console.warn(`Proxy ${i + 1} failed:`, error.message)
        // Continue to next proxy
        continue
      }
    }
    
    console.error('All proxies failed for BIN lookup')
    throw new Error('All proxies failed - please try again later')
  }

  // Client-side BIN lookup using multiple proxies with caching
  const lookupCardByNumber = async (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    
    // Need at least 6 digits for BIN lookup
    if (cleanNumber.length < 6) return null
    
    const binToLookup = cleanNumber.substring(0, 8) // Use first 8 digits for lookup
    
    // Check cache first
    const cacheKey = binToLookup
    const cached = binCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return processCardData(cached.data, cleanNumber)
    }
    
    try {
      const data = await fetchBINWithMultipleProxies(binToLookup)
      
      // Cache the result
      setBinCache(prev => new Map(prev.set(cacheKey, {
        data,
        timestamp: Date.now()
      })))
      
      return processCardData(data, cleanNumber)
    } catch (error) {
      console.error('BIN lookup failed:', error)
      return null
    }
  }

  // Enhanced card type and tier matching
  const smartCardTypeMapping = (type: string, scheme: string, brand: string) => {
    // Normalize the inputs
    const normalizedType = type?.toLowerCase() || ''
    const normalizedScheme = scheme?.toLowerCase() || ''
    const normalizedBrand = brand?.toLowerCase() || ''
    
    // Map credit/debit based on multiple sources
    if (normalizedType === 'credit' || normalizedBrand.includes('credit')) {
      return 'credit'
    } else if (normalizedType === 'debit' || normalizedBrand.includes('debit')) {
      return 'debit'
    } else if (normalizedType === 'prepaid' || normalizedBrand.includes('prepaid')) {
      return 'prepaid'
    }
    
    // Default to credit for unknown types
    return 'credit'
  }
  
  // Enhanced tier determination
  const smartTierMapping = (brand: string, type: string, scheme: string) => {
    const combined = `${brand} ${type} ${scheme}`.toLowerCase()
    
    // Priority order for tier matching
    if (combined.includes('infinite')) return 'infinite'
    if (combined.includes('world elite') || combined.includes('world flex')) return 'world'
    if (combined.includes('signature')) return 'signature'
    if (combined.includes('platinum')) return 'platinum'
    if (combined.includes('gold')) return 'gold'
    if (combined.includes('world')) return 'world'
    if (combined.includes('premium')) return 'premium'
    if (combined.includes('classic')) return 'standard'
    if (combined.includes('standard')) return 'standard'
    
    // Default based on card type
    if (type === 'credit') return 'standard'
    if (type === 'debit') return 'standard'
    
    return 'standard'
  }

  // Helper function to process card data from either API
  const processCardData = (data: any, cleanNumber: string) => {
    // Extract information from API response
    const bankName = data.bank?.name || 'Unknown Bank'
    const rawCardType = data.type || 'unknown'
    const scheme = data.scheme || 'unknown'
    const brand = data.brand || ''
    const country = data.country
    
    // Use smart mapping for card type and tier
    const cardType = smartCardTypeMapping(rawCardType, scheme, brand)
    const tier = smartTierMapping(brand, rawCardType, scheme)
    
    // Check if it's a UAE card
    if (country?.alpha2 !== 'AE') {
      return {
        bankName,
        cardType,
        scheme,
        brand,
        country: country?.name || 'Unknown',
        tier,
        confidence: 100,
        lastFour: cleanNumber.slice(-4),
        maskedNumber: cleanNumber.replace(/\d(?=\d{4})/g, '•'),
        isUAE: false
      }
    }
    
    // Use smart bank matching
    const bankId = findBankMatch(bankName)
    
    let cardId = null
    let matchedCard = null
    let finalCardName = `${bankName} ${brand || cardType}`
    
    if (bankId && BANK_CARDS[bankId]) {
      const bank = BANK_CARDS[bankId]
      
      // Smart card matching with multiple strategies
      // Strategy 1: Exact match on type and tier
      matchedCard = bank.cards.find(card => 
        card.type === cardType && card.tier === tier
      )
      
      // Strategy 2: Match on type only
      if (!matchedCard) {
        matchedCard = bank.cards.find(card => card.type === cardType)
      }
      
      // Strategy 3: Match on tier only
      if (!matchedCard) {
        matchedCard = bank.cards.find(card => card.tier === tier)
      }
      
      // Strategy 4: Match on brand keywords
      if (!matchedCard && brand) {
        matchedCard = bank.cards.find(card => 
          card.name.toLowerCase().includes(brand.toLowerCase()) ||
          card.series.toLowerCase().includes(brand.toLowerCase())
        )
      }
      
      // Strategy 5: Default to first card of same type
      if (!matchedCard) {
        matchedCard = bank.cards.find(card => card.type === cardType)
      }
      
      // Strategy 6: Fallback to first card
      if (!matchedCard) {
        matchedCard = bank.cards[0]
      }
      
      if (matchedCard) {
        cardId = matchedCard.id
        finalCardName = matchedCard.name || matchedCard.series
      }
    }
    
    return {
      bankId,
      bankName,
      cardId,
      cardName: finalCardName,
      cardType,
      scheme,
      brand,
      tier,
      confidence: 100,
      lastFour: cleanNumber.slice(-4),
      maskedNumber: cleanNumber.replace(/\d(?=\d{4})/g, '•'),
      isUAE: true,
      country: country?.name || 'UAE'
    }
  }

  const handleExternalCardFormChange = async (field: string, value: string) => {
    const newForm = { ...externalCardForm, [field]: value }
    setExternalCardForm(newForm)
    
    // Auto-lookup when card number is entered
    if (field === 'cardNumber') {
      const cleanNumber = value.replace(/\s/g, '').replace(/\D/g, '')
      const currentBin = cleanNumber.substring(0, 8) // Use first 8 digits as BIN
      
      // Check if field was cleared (user started over)
      const previousLength = externalCardForm.cardNumber.replace(/\s/g, '').replace(/\D/g, '').length
      const wasCleared = cleanNumber.length < 4 && previousLength > cleanNumber.length
      
      if (wasCleared) {
        // Reset session when user clears the field
        setHasLookedUpInSession(false)
        setLastLookedUpBin('')
        setCardLookupResult(null)
        setBinCache(new Map())
        setIsLookingUp(false)
        return
      }
      
      // Only lookup if we have enough digits and haven't looked up this BIN in this session
      if (cleanNumber.length >= 6 && !hasLookedUpInSession && currentBin !== lastLookedUpBin) {
        setIsLookingUp(true)
        setHasLookedUpInSession(true)
        setLastLookedUpBin(currentBin)
        
        try {
          const result = await lookupCardByNumber(cleanNumber)
          setIsLookingUp(false)
          
          if (result) {
            setCardLookupResult(result)
            // Auto-fill if card is identified
            if (result.bankName && result.cardType) {
              setExternalCardForm(prev => ({
                ...prev,
                bankName: result.bankName,
                cardType: result.cardType
              }))
            }
          } else {
            // Card not found - show message to user
            setCardLookupResult({
              error: true,
              message: 'Card not recognized in our database. Please select bank manually.',
              bankName: 'Unknown',
              cardType: 'unknown'
            })
          }
        } catch (error) {
          console.error('Card lookup error:', error)
          setCardLookupResult({
            error: true,
            message: 'Unable to lookup card details. Please try again or select bank manually.',
            bankName: 'Unknown',
            cardType: 'unknown'
          })
          setIsLookingUp(false)
        }
      } else if (cleanNumber.length >= 6) {
        // Already looked up in this session
      } else {
        // Not enough digits yet
        setCardLookupResult(null)
        setIsLookingUp(false)
      }
    }
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const match = cleaned.match(/\d{1,4}/g)
    return match ? match.join(' ') : ''
  }

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
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${inter.className}`}>
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
                <h1 className="text-lg font-bold text-slate-900">Welcome back, Mohamed 👋</h1>
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
        {/* AI-Powered Card Management */}
        <div className="relative">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Cpu size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">AI-Powered Card Portfolio</h2>
            </div>
            <p className="text-sm text-slate-600">Intelligent card management with real-time insights and personalized recommendations</p>
          </div>
          
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
                  isExternal={account.isExternal}
                />
              </div>
            ))}
            
            {/* Add Card Button */}
            <div 
              className="flex-none w-72 sm:w-80 snap-center mr-4 cursor-pointer"
              style={{ scrollSnapAlign: 'center' }}
              onClick={() => setShowAddCardModal(true)}
            >
              <div className="w-full h-48 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100 transition-all duration-300 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 hover:bg-slate-300 transition-colors">
                  <Plus size={24} className="text-slate-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 mb-1">Add External Card</h3>
                <p className="text-xs text-slate-500 text-center px-4">Connect cards from other banks</p>
              </div>
            </div>
            
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

        {/* Urgent Bills Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Urgent Bills</h3>
            {urgentBills.length > 0 && (
              <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-red-700">{urgentBills.length} pending</span>
              </div>
            )}
          </div>
          
          {urgentBills.length === 0 ? (
            /* No Bills State */
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-emerald-600" />
                </div>
                <h4 className="text-lg font-semibold text-emerald-800 mb-2">All caught up!</h4>
                <p className="text-sm text-emerald-600">You don't have any bills to pay right now</p>
              </div>
            </div>
          ) : (
            /* Bills List */
            <div className="space-y-4">
              {urgentBills.map((bill) => {
                const isOverdue = bill.status === 'overdue'
                const dueDate = new Date(bill.dueDate)
                const today = new Date()
                
                // Defensive date parsing
                if (isNaN(dueDate.getTime())) {
                  console.error('Invalid date:', bill.dueDate)
                  return null
                }
                
                const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                
                return (
                  <div 
                    key={bill.id}
                    className={`p-5 rounded-xl border-[1.5px] transition-all ${
                      isOverdue 
                        ? 'border-red-200 bg-red-50' 
                        : 'border-amber-200 bg-amber-50'
                    }`}
                  >
                    {/* Status Badge and Action Buttons */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {isOverdue ? (
                          <div className="flex items-center space-x-2 text-red-600">
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                              <AlertTriangle size={12} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wide">OVERDUE</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-amber-600">
                            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                              <Clock size={12} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wide">DUE SOON</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Action Icons */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePayBill(bill.id)}
                          className={`group p-2 rounded-lg transition-all hover:scale-105 ${
                            isOverdue
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-amber-600 text-white hover:bg-amber-700'
                          }`}
                          title="Pay Now"
                        >
                          <DollarSign size={14} />
                        </button>
                        <button
                          onClick={() => handleRemindLater(bill.id)}
                          className={`group p-2 rounded-lg border transition-all hover:scale-105 ${
                            isOverdue
                              ? 'border-red-200 text-red-600 hover:bg-red-50'
                              : 'border-amber-200 text-amber-600 hover:bg-amber-50'
                          }`}
                          title={isOverdue ? 'Remind Later' : 'Set Reminder'}
                        >
                          <Bell size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Bill Details */}
                    <div className="space-y-4">
                      {/* Bank Name, Card Type, and Amount */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-base mb-1">
                            {bill.provider}
                          </h4>
                          <p className="text-sm text-slate-500 font-medium">
                            {bill.type}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="font-bold text-slate-900 text-base">
                            <SimpleNumber value={bill.amount} prefix="AED " />
                          </span>
                        </div>
                      </div>
                      
                      {/* Due Date Info */}
                      <div className={`text-sm ${isOverdue ? 'text-red-600' : 'text-amber-600'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
                              isOverdue 
                                ? 'border-red-300 bg-red-100' 
                                : 'border-amber-300 bg-amber-100'
                            }`}>
                              <CalendarIcon size={12} />
                            </div>
                                                      <div className="font-medium">
                            {(() => {
                              try {
                                return format(dueDate, 'MMM d, yyyy')
                              } catch (error) {
                                console.error('Date formatting error:', error)
                                return bill.dueDate
                              }
                            })()}
                          </div>
                          </div>
                          
                          {isOverdue && (
                            <div className="flex items-center space-x-2 text-right">
                              <div className="w-6 h-6 rounded-lg border border-red-300 bg-red-100 flex items-center justify-center">
                                <AlertCircle size={12} />
                              </div>
                              <div className="text-xs font-normal">
                                {Math.abs(daysDiff)} days overdue
                              </div>
                            </div>
                          )}
                          
                          {!isOverdue && daysDiff > 0 && (
                            <div className="flex items-center space-x-2 text-right">
                              <div className="w-6 h-6 rounded-lg border border-amber-300 bg-amber-100 flex items-center justify-center">
                                <Timer size={12} />
                              </div>
                              <div className="text-xs font-normal">
                                {daysDiff} days remaining
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={action.name}
                onClick={action.action}
                className="flex flex-col items-center space-y-2 p-2 rounded-xl hover:bg-slate-50 transition-colors duration-200"
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
                {accounts[activeCardIndex]?.name} •••• {accounts[activeCardIndex]?.lastFour}
              </p>
            </div>
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
              {accounts[activeCardIndex]?.isExternal ? (
                <div>
                  <p className="text-slate-500 text-sm mb-2">External Card Connected</p>
                  <p className="text-slate-400 text-xs">Our AI is working on extracting transactions from your card</p>
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No recent transactions for this card</p>
              )}
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

      {/* Add External Card Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div 
            className={`w-full bg-white rounded-t-2xl transform transition-all duration-300 ease-out flex flex-col ${
              showAddCardModal ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ maxHeight: '85vh' }}
          >
                    {/* Sticky Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-slate-200 p-4 z-10">
                  <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                <Plus size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add External Card</h2>
                <p className="text-xs text-slate-600">Connect cards from other banks</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setShowAddCardModal(false)
                setExternalCardForm({
                  bankName: '',
                  cardType: '',
                  cardNumber: '',
                  cardholderName: '',
                  expiryMonth: '',
                  expiryYear: ''
                })
                setCardLookupResult(null)
                setIsLookingUp(false)
                // Reset BIN lookup session
                setHasLookedUpInSession(false)
                setLastLookedUpBin('')
                setBinCache(new Map())
              }}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} className="text-slate-600" />
            </button>
          </div>
                  </div>
                  
            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto p-4 pt-0">
              {/* Live Card Preview */}
              <div className="mt-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-700">Live Preview</h3>
                  {cardLookupResult && !cardLookupResult.error && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        cardLookupResult.isUAE ? 'bg-emerald-100' : 'bg-blue-100'
                      }`}>
                        <Check size={10} className={cardLookupResult.isUAE ? 'text-emerald-600' : 'text-blue-600'} />
                      </div>
                      <span className={`text-xs font-medium ${
                        cardLookupResult.isUAE ? 'text-emerald-700' : 'text-blue-700'
                      }`}>
                        {cardLookupResult.isUAE ? 'UAE Card' : 'International Card'}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Card Preview */}
                <div className="w-full max-w-sm mx-auto">
                  <ManualCard
                    lastFour={externalCardForm.cardNumber.slice(-4) || "0000"}
                    holderName={externalCardForm.cardholderName || "CARDHOLDER NAME"}
                    expiryDate={externalCardForm.expiryMonth && externalCardForm.expiryYear ? `${externalCardForm.expiryMonth}/${externalCardForm.expiryYear}` : "MM/YY"}
                    balance={0}
                    accountName={(() => {
                      // For external cards, always show "External Card" as account name
                      // Don't derive from card type to avoid duplication
                      return "External Card"
                    })()}
                    bankId={(() => {
                      // For international cards, use null (will show generic design)
                      if (cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE) {
                        return null
                      }
                      // For UAE cards, try to use lookup result
                      if (cardLookupResult && !cardLookupResult.error && cardLookupResult.bankId) {
                        return cardLookupResult.bankId
                      }
                      // Fallback to manual bank selection mapping
                      if (externalCardForm.bankName) {
                        return findBankMatch(externalCardForm.bankName)
                      }
                      return null
                    })()}
                    cardId={(() => {
                      // For international cards, use null (will show generic design)
                      if (cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE) {
                        return null
                      }
                      // For UAE cards, try to use lookup result
                      if (cardLookupResult && !cardLookupResult.error && cardLookupResult.cardId) {
                        return cardLookupResult.cardId
                      }
                      // Fallback to manual selection
                      if (externalCardForm.bankName && externalCardForm.cardType) {
                        const bankId = findBankMatch(externalCardForm.bankName)
                        if (bankId && BANK_CARDS[bankId]) {
                          const bank = BANK_CARDS[bankId]
                          const matchingCard = bank.cards.find(card => 
                            card.type === externalCardForm.cardType
                          ) || bank.cards[0]
                          return matchingCard?.id || null
                        }
                      }
                      return null
                    })()}
                    showBalance={true}
                    showDetails={true}
                    isExternal={true}
                    className="transform scale-90 origin-center"
                  />
                </div>
                
                {/* Card Identification Info */}
                {cardLookupResult && !cardLookupResult.error && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-emerald-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check size={12} className="text-emerald-600" />
                      </div>
                      <h4 className="text-sm font-bold text-emerald-900">
                        {cardLookupResult.isUAE ? 'UAE Card Identified' : 'International Card Identified'}
                      </h4>
                    </div>
                    
                    <div className="space-y-2">
                                             <div className="flex items-center justify-between">
                         <span className="text-xs text-slate-500">Card Name</span>
                         <span className="text-sm font-semibold text-slate-900">
                           {(() => {
                             // Get proper card name from database
                             let cardName = cardLookupResult.cardName
                             
                             // If we have bankId and cardId, get the exact card name from database
                             if (cardLookupResult.bankId && cardLookupResult.cardId) {
                               const cardDesign = getCardBySelection(cardLookupResult.bankId, cardLookupResult.cardId)
                               if (cardDesign) {
                                 cardName = cardDesign.series
                               }
                             }
                             
                             // Fallback to bank name + type
                             if (!cardName) {
                               cardName = `${cardLookupResult.bankName} ${cardLookupResult.cardType}`
                             }
                             
                             // Format: "Card Name • Type Card"
                             const cardType = cardLookupResult.cardType
                             const formattedType = cardType ? `${cardType.charAt(0).toUpperCase() + cardType.slice(1)} Card` : ''
                             
                             return formattedType ? `${cardName} • ${formattedType}` : cardName
                           })()}
                         </span>
                       </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Bank</span>
                        <span className="text-sm font-medium text-slate-700">
                          {cardLookupResult.bankName}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Network</span>
                        <span className="text-sm font-medium text-slate-700">
                          {cardLookupResult.scheme?.toUpperCase()} {cardLookupResult.cardType}
                        </span>
                      </div>
                      
                      {cardLookupResult.brand && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Tier</span>
                          <span className="text-sm font-medium text-slate-700 capitalize">
                            {cardLookupResult.brand} • {cardLookupResult.tier}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Number</span>
                        <span className="text-sm font-mono text-slate-700">
                          {cardLookupResult.maskedNumber}
                        </span>
                      </div>
                      
                      {cardLookupResult.country && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Country</span>
                          <span className="text-sm font-medium text-slate-700">
                            {cardLookupResult.country}
                          </span>
                        </div>
                      )}
                      
                      {/* Show note for international cards */}
                      {!cardLookupResult.isUAE && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="flex items-start space-x-2">
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <Check size={10} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-blue-700 font-medium">International Card</p>
                              <p className="text-xs text-blue-600 mt-1">
                                Using generic design as this bank is not in our UAE database
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bank Name</label>
                  {/* Show different inputs based on card identification */}
                  {cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE ? (
                    /* International Card - Show bank name as readonly */
                    <input
                      type="text"
                      value={cardLookupResult.bankName}
                      readOnly
                      className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl bg-slate-50 text-slate-700 font-medium cursor-not-allowed"
                    />
                  ) : (
                    /* UAE Card or Unknown - Show dropdown */
                    <select 
                      value={externalCardForm.bankName}
                      onChange={(e) => handleExternalCardFormChange('bankName', e.target.value)}
                      className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-900 font-medium transition-all shadow-sm hover:border-slate-400"
                    >
                      <option value="" className="text-slate-500">Select your bank</option>
                      {BANKS_DROPDOWN.map((bank) => (
                        <option key={bank.id} value={bank.name} className="text-slate-900 font-medium">
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {/* Show helpful text for international cards */}
                  {cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                          <Check size={10} className="text-blue-600" />
                        </div>
                        <p className="text-xs text-blue-700">
                          International Card Detected - Automatically Filled.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full card number"
                    maxLength={19} // 16 digits + 3 spaces
                    value={formatCardNumber(externalCardForm.cardNumber)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '')
                      if (value.length <= 16) {
                        handleExternalCardFormChange('cardNumber', value)
                      }
                    }}
                    className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono bg-white text-slate-900 font-medium transition-all shadow-sm hover:border-slate-400"
                  />
                  
                  {/* Loading State */}
                  {isLookingUp && (
                    <div className="mt-2 flex items-center space-x-2 text-emerald-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                      <p className="text-xs">Looking up card details...</p>
                    </div>
                  )}
                  
                  {/* Card Lookup Error */}
                  {cardLookupResult && cardLookupResult.error && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle size={14} className="text-red-600" />
                        <p className="text-xs text-red-700">
                          {cardLookupResult.message}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Card Not Found */}
                  {!cardLookupResult && !isLookingUp && externalCardForm.cardNumber.length >= 8 && (
                    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle size={14} className="text-amber-600" />
                        <p className="text-xs text-amber-700">
                          Card not recognized in our database. Please select bank manually.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              
              <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Cardholder Name</label>
                  <input 
                    type="text" 
                    placeholder="As printed on card"
                    value={externalCardForm.cardholderName}
                    onChange={(e) => handleExternalCardFormChange('cardholderName', e.target.value.toUpperCase())}
                    className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-900 font-medium transition-all shadow-sm hover:border-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Card Type</label>
                  {/* Show different inputs based on card identification */}
                  {cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE ? (
                    /* International Card - Show card type as readonly */
                    <input
                      type="text"
                      value={`${cardLookupResult.cardType.charAt(0).toUpperCase() + cardLookupResult.cardType.slice(1)} Card`}
                      readOnly
                      className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl bg-slate-50 text-slate-700 font-medium cursor-not-allowed"
                    />
                  ) : (
                    /* UAE Card or Unknown - Show dropdown */
                    <select 
                      value={externalCardForm.cardType}
                      onChange={(e) => handleExternalCardFormChange('cardType', e.target.value)}
                      className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-900 font-medium transition-all shadow-sm hover:border-slate-400"
                    >
                      <option value="" className="text-slate-500">Select card type</option>
                      {(() => {
                        // If card is identified, show the identified type first
                        if (cardLookupResult && !cardLookupResult.error && cardLookupResult.cardType) {
                          return (
                            <option value={cardLookupResult.cardType} className="text-slate-900 font-medium">
                              {cardLookupResult.cardType.charAt(0).toUpperCase() + cardLookupResult.cardType.slice(1)} Card (Identified)
                            </option>
                          )
                        }
                        
                        // If bank is selected, show bank-specific card types
                        if (externalCardForm.bankName) {
                          const bankId = findBankMatch(externalCardForm.bankName)
                          if (bankId && BANK_CARDS[bankId]) {
                            const bank = BANK_CARDS[bankId]
                            const uniqueTypes = [...new Set(bank.cards.map(card => card.type))]
                            return uniqueTypes.map(type => (
                              <option key={type} value={type} className="text-slate-900 font-medium">
                                {type.charAt(0).toUpperCase() + type.slice(1)} Card
                              </option>
                            ))
                          }
                        }
                        
                        // Default options
                        return (
                          <>
                            <option value="credit" className="text-slate-900 font-medium">Credit Card</option>
                            <option value="debit" className="text-slate-900 font-medium">Debit Card</option>
                            <option value="prepaid" className="text-slate-900 font-medium">Prepaid Card</option>
                          </>
                        )
                      })()}
                    </select>
                  )}
                  
                  {/* Show available card variants for selected bank (UAE cards only) */}
                  {(!cardLookupResult || cardLookupResult.isUAE) && externalCardForm.bankName && externalCardForm.cardType && (() => {
                    const bankId = findBankMatch(externalCardForm.bankName)
                    if (bankId && BANK_CARDS[bankId]) {
                      const bank = BANK_CARDS[bankId]
                      const cardVariants = bank.cards.filter(card => card.type === externalCardForm.cardType)
                      if (cardVariants.length > 1) {
                        return (
                          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-700 font-medium mb-2">Available variants:</p>
                            <div className="flex flex-wrap gap-2">
                              {cardVariants.map(card => (
                                <span key={card.id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {card.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      }
                    }
                    return null
                  })()}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Month</label>
                    <select 
                      value={externalCardForm.expiryMonth}
                      onChange={(e) => handleExternalCardFormChange('expiryMonth', e.target.value)}
                      className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-900 font-medium transition-all shadow-sm hover:border-slate-400"
                    >
                      <option value="" className="text-slate-500">MM</option>
                      {Array.from({length: 12}, (_, i) => (
                        <option key={i+1} value={String(i+1).padStart(2, '0')} className="text-slate-900 font-medium">
                          {String(i+1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
          </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Year</label>
                    <select 
                      value={externalCardForm.expiryYear}
                      onChange={(e) => handleExternalCardFormChange('expiryYear', e.target.value)}
                      className="w-full p-3 border-[1.5px] border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-900 font-medium transition-all shadow-sm hover:border-slate-400"
                    >
                      <option value="" className="text-slate-500">YY</option>
                      {Array.from({length: 10}, (_, i) => (
                        <option key={i} value={String(new Date().getFullYear() + i).slice(-2)} className="text-slate-900 font-medium">
                          {String(new Date().getFullYear() + i).slice(-2)}
                        </option>
                      ))}
                    </select>
        </div>
      </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Shield size={20} className="text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-blue-900">Secure Connection</h3>
                      <p className="text-xs text-blue-700 mt-1">
                        We use bank-level encryption to protect your information. Your card details are stored securely and never shared.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 z-10">
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowAddCardModal(false)
                    setExternalCardForm({
                      bankName: '',
                      cardType: '',
                      cardNumber: '',
                      cardholderName: '',
                      expiryMonth: '',
                      expiryYear: ''
                    })
                    setCardLookupResult(null)
                    setIsLookingUp(false)
                    // Reset BIN lookup session
                    setHasLookedUpInSession(false)
                    setLastLookedUpBin('')
                  }}
                  className="flex-1 py-3 px-4 border-[1.5px] border-slate-300 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Validate form - for international cards, use lookup result bank name
                    const finalBankName = (cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE) 
                      ? cardLookupResult.bankName 
                      : externalCardForm.bankName
                    
                    const finalCardType = (cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE) 
                      ? cardLookupResult.cardType 
                      : externalCardForm.cardType
                    
                    if (!finalBankName || !finalCardType || 
                        !externalCardForm.cardNumber || !externalCardForm.cardholderName ||
                        !externalCardForm.expiryMonth || !externalCardForm.expiryYear) {
                      alert('Please fill in all required fields')
                      return
                    }
                    
                    // Create new account from external card
                    const newAccountId = Math.max(...accounts.map(a => a.id)) + 1
                    const lastFour = externalCardForm.cardNumber.slice(-4)
                    
                    // Try to map to internal database if we have lookup result
                    let bankId = null
                    let cardId = null
                    
                    // For international cards, don't try to map to UAE banks
                    if (cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE) {
                      // International card - use null for bankId/cardId (will show generic design)
                      bankId = null
                      cardId = null
                    } else if (cardLookupResult && cardLookupResult.bankId && cardLookupResult.cardId) {
                      // UAE card with successful mapping
                      bankId = cardLookupResult.bankId
                      cardId = cardLookupResult.cardId
                    } else {
                      // UAE card or unknown - try smart bank matching
                      bankId = findBankMatch(finalBankName)
                      
                      if (bankId && BANK_CARDS[bankId]) {
                        const bank = BANK_CARDS[bankId]
                        // Try to find a matching card type
                        const matchingCard = bank.cards.find(card => 
                          card.type === finalCardType
                        ) || bank.cards[0]
                        
                        if (matchingCard) {
                          cardId = matchingCard.id
                        }
                      }
                    }
                    
                    // Generate account name for external cards
                    const accountName = 'External Card'
                    
                    const newAccount = {
                      id: newAccountId,
                      name: accountName,
                      type: finalCardType,
                      balance: 0, // Default balance for external cards
                      accountNumber: `****${lastFour}`,
                      lastFour: lastFour,
                      bankId: bankId,
                      cardId: cardId,
                      currency: "AED",
                      isExternal: true // Mark as external card
                    }
                    
                    // Add to accounts and scroll to new card
                    setAccounts(prev => [...prev, newAccount])
                    
                    // Close modal and reset form
                    setShowAddCardModal(false)
                    setExternalCardForm({
                      bankName: '',
                      cardType: '',
                      cardNumber: '',
                      cardholderName: '',
                      expiryMonth: '',
                      expiryYear: ''
                    })
                    setCardLookupResult(null)
                    setIsLookingUp(false)
                    // Reset BIN lookup session
                    setHasLookedUpInSession(false)
                    setLastLookedUpBin('')
                    
                    // Scroll to the new card after a brief delay
                    setTimeout(() => {
                      setActiveCardIndex(accounts.length) // New card will be at this index
                      scrollToCard(accounts.length)
                    }, 100)
                  }}
                  disabled={(() => {
                    // For international cards, use lookup result values
                    const finalBankName = (cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE) 
                      ? cardLookupResult.bankName 
                      : externalCardForm.bankName
                    
                    const finalCardType = (cardLookupResult && !cardLookupResult.error && !cardLookupResult.isUAE) 
                      ? cardLookupResult.cardType 
                      : externalCardForm.cardType
                    
                    return !finalBankName || !finalCardType || 
                           !externalCardForm.cardNumber || !externalCardForm.cardholderName ||
                           !externalCardForm.expiryMonth || !externalCardForm.expiryYear
                  })()}
                  className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Menu */}
      <GlobalMenu currentPage="dashboard" />
    </div>
  )
}