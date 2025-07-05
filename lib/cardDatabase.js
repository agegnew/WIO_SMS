// cardSelector.js - System for cards with only last 4 digits

// Simplified card database for manual selection
export const BANK_CARDS = {
  'fab': {
    name: 'First Abu Dhabi Bank',
    logo: '🏛️',
    cards: [
      {
        id: 'fab-platinum',
        name: 'FAB Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-800 via-slate-900 to-black',
          secondary: 'from-yellow-400 to-yellow-600',
          accent: 'text-yellow-400',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        logo: '✦',
        features: ['Airport Lounge', 'Concierge', 'Travel Insurance']
      },
      {
        id: 'fab-gold',
        name: 'FAB Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-amber-600 to-yellow-700',
          secondary: 'from-yellow-300 to-yellow-500',
          accent: 'text-yellow-200',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        logo: '♛',
        features: ['Cashback', 'Travel Benefits', 'Insurance']
      },
      {
        id: 'fab-classic',
        name: 'FAB Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-blue-600 via-blue-700 to-blue-800',
          secondary: 'from-blue-400 to-blue-600',
          accent: 'text-blue-300',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        logo: '🏛️',
        features: ['ATM Access', 'Online Banking', 'Mobile Pay']
      }
    ]
  },
  'enbd': {
    name: 'Emirates NBD',
    logo: '🏦',
    cards: [
      {
        id: 'enbd-infinite',
        name: 'Emirates NBD Infinite',
        type: 'credit',
        tier: 'infinite',
        colors: {
          primary: 'from-black via-slate-900 to-emerald-900',
          secondary: 'from-emerald-400 to-emerald-600',
          accent: 'text-emerald-300',
          text: 'text-white'
        },
        pattern: 'infinite-luxury',
        logo: '∞',
        features: ['Priority Pass', 'Concierge', 'Golf Access']
      },
      {
        id: 'enbd-signature',
        name: 'Emirates NBD Signature',
        type: 'credit',
        tier: 'signature',
        colors: {
          primary: 'from-emerald-700 via-green-700 to-emerald-800',
          secondary: 'from-emerald-400 to-green-500',
          accent: 'text-emerald-200',
          text: 'text-white'
        },
        pattern: 'signature-elegant',
        logo: '✓',
        features: ['Rewards Points', 'Travel Insurance', 'Dining']
      },
      {
        id: 'enbd-classic',
        name: 'Emirates NBD Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-green-600 via-emerald-600 to-green-700',
          secondary: 'from-green-400 to-emerald-500',
          accent: 'text-green-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        logo: '🏦',
        features: ['ATM Network', 'Online Banking', 'Mobile Banking']
      }
    ]
  },
  'adcb': {
    name: 'Abu Dhabi Commercial Bank',
    logo: '🏦',
    cards: [
      {
        id: 'adcb-touchpoints',
        name: 'ADCB Touchpoints Infinite',
        type: 'credit',
        tier: 'infinite',
        colors: {
          primary: 'from-purple-800 via-indigo-800 to-purple-900',
          secondary: 'from-purple-400 to-indigo-500',
          accent: 'text-purple-300',
          text: 'text-white'
        },
        pattern: 'touchpoints-premium',
        logo: '◊',
        features: ['Lifestyle Rewards', 'Dining', 'Entertainment']
      },
      {
        id: 'adcb-platinum',
        name: 'ADCB Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-slate-800 to-slate-900',
          secondary: 'from-slate-400 to-slate-600',
          accent: 'text-slate-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        logo: '✦',
        features: ['Premium Rewards', 'Travel Insurance', 'Lounge Access']
      },
      {
        id: 'adcb-classic',
        name: 'ADCB Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-blue-700 via-indigo-700 to-blue-800',
          secondary: 'from-blue-400 to-indigo-500',
          accent: 'text-blue-300',
          text: 'text-white'
        },
        pattern: 'adcb-classic',
        logo: '🏦',
        features: ['ATM Network', 'Online Banking', 'Mobile App']
      }
    ]
  },
  'rakbank': {
    name: 'RAKBANK',
    logo: '🏦',
    cards: [
      {
        id: 'rak-red',
        name: 'RAKBANK Red',
        type: 'credit',
        tier: 'premium',
        colors: {
          primary: 'from-red-600 via-red-700 to-red-800',
          secondary: 'from-red-400 to-red-600',
          accent: 'text-red-300',
          text: 'text-white'
        },
        pattern: 'rak-modern',
        logo: '🔥',
        features: ['Cashback', 'Dining Rewards', 'Entertainment']
      },
      {
        id: 'rak-titanium',
        name: 'RAKBANK Titanium',
        type: 'credit',
        tier: 'premium',
        colors: {
          primary: 'from-slate-600 via-slate-700 to-slate-800',
          secondary: 'from-slate-400 to-slate-600',
          accent: 'text-slate-300',
          text: 'text-white'
        },
        pattern: 'titanium-metallic',
        logo: '⚡',
        features: ['Travel Rewards', 'Airport Lounge', 'Insurance']
      },
      {
        id: 'rak-classic',
        name: 'RAKBANK Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-red-500 via-red-600 to-red-700',
          secondary: 'from-red-300 to-red-500',
          accent: 'text-red-200',
          text: 'text-white'
        },
        pattern: 'rak-classic',
        logo: '🏦',
        features: ['ATM Access', 'Online Banking', 'Mobile Banking']
      }
    ]
  }
}

// Function to get card design by bank and card ID
export const getCardBySelection = (bankId, cardId) => {
  const bank = BANK_CARDS[bankId]
  if (!bank) return null
  
  const card = bank.cards.find(c => c.id === cardId)
  if (!card) return null
  
  return {
    bank: bank.name,
    series: card.name,
    type: card.type,
    colors: card.colors,
    pattern: card.pattern,
    logo: card.logo,
    tier: card.tier,
    features: card.features
  }
}

// Default card for unknown selections
export const getDefaultCard = () => ({
  bank: 'Bank Card',
  series: 'Standard',
  type: 'debit',
  colors: {
    primary: 'from-slate-600 to-slate-700',
    secondary: 'from-slate-400 to-slate-500',
    accent: 'text-slate-300',
    text: 'text-white'
  },
  pattern: 'classic-waves',
  logo: '💳',
  tier: 'standard',
  features: ['Basic Banking']
})

// Export bank list for selection
export const BANKS_LIST = Object.keys(BANK_CARDS).map(bankId => ({
  id: bankId,
  name: BANK_CARDS[bankId].name,
  logo: BANK_CARDS[bankId].logo
}))