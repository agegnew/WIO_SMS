// cardSelector.js - System for cards with only last 4 digits

// Simplified card database for manual selection
export const BANK_CARDS = {
  'wio': {
    name: 'Wio Bank',
    logo: '🚀',
    cards: [
      {
        id: 'wio-signature',
        name: 'Wio Signature',
        type: 'credit',
        tier: 'signature',
        colors: {
          primary: 'from-purple-600 via-indigo-600 to-purple-700',
          secondary: 'from-purple-400 to-indigo-500',
          accent: 'text-purple-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Digital First', 'Cashback', 'Travel Rewards']
      },
      {
        id: 'wio-metal',
        name: 'Wio Metal',
        type: 'credit',
        tier: 'premium',
        colors: {
          primary: 'from-slate-800 via-zinc-800 to-slate-900',
          secondary: 'from-purple-400 to-purple-600',
          accent: 'text-purple-300',
          text: 'text-white'
        },
        pattern: 'titanium-metallic',
        features: ['Metal Card', 'Premium Rewards', 'Digital Banking']
      },
      {
        id: 'wio-digital',
        name: 'Wio Digital',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-purple-500 via-indigo-500 to-purple-600',
          secondary: 'from-purple-300 to-indigo-400',
          accent: 'text-purple-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Digital Banking', 'Real-time Notifications', 'Zero Fees']
      }
    ]
  },
  'fab': {
    name: 'First Abu Dhabi Bank',
    logo: '🏛️',
    cards: [
      {
        id: 'fab-infinite',
        name: 'FAB Infinite',
        type: 'credit',
        tier: 'infinite',
        colors: {
          primary: 'from-black via-slate-900 to-zinc-900',
          secondary: 'from-yellow-400 to-amber-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'infinite-luxury',
        features: ['Infinite Privileges', 'Global Concierge', 'Priority Pass']
      },
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
        features: ['Cashback', 'Travel Benefits', 'Insurance']
      },
      {
        id: 'fab-world',
        name: 'FAB World',
        type: 'credit',
        tier: 'world',
        colors: {
          primary: 'from-blue-800 via-blue-900 to-indigo-900',
          secondary: 'from-blue-400 to-blue-600',
          accent: 'text-blue-300',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['World Benefits', 'Travel Insurance', 'Emergency Services']
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
        features: ['Rewards Points', 'Travel Insurance', 'Dining']
      },
      {
        id: 'enbd-platinum',
        name: 'Emirates NBD Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-emerald-700 to-slate-800',
          secondary: 'from-emerald-400 to-slate-500',
          accent: 'text-emerald-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Premium Rewards', 'Lounge Access', 'Travel Benefits']
      },
      {
        id: 'enbd-gold',
        name: 'Emirates NBD Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-emerald-600 to-yellow-700',
          secondary: 'from-yellow-400 to-emerald-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Cashback Rewards', 'Travel Benefits', 'Insurance']
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
        features: ['ATM Network', 'Online Banking', 'Mobile Banking']
      }
    ]
  },
  'adcb': {
    name: 'Abu Dhabi Commercial Bank',
    logo: '🏦',
    cards: [
      {
        id: 'adcb-touchpoints-infinite',
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
        features: ['Premium Rewards', 'Travel Insurance', 'Lounge Access']
      },
      {
        id: 'adcb-gold',
        name: 'ADCB Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-amber-600 to-yellow-700',
          secondary: 'from-yellow-400 to-amber-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Cashback', 'Rewards', 'Travel Benefits']
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
        pattern: 'classic-waves',
        features: ['ATM Network', 'Online Banking', 'Mobile App']
      }
    ]
  },
  'rakbank': {
    name: 'RAKBANK',
    logo: '🏦',
    cards: [
      {
        id: 'rak-red-platinum',
        name: 'RAKBANK Red Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-red-700 via-red-800 to-red-900',
          secondary: 'from-red-400 to-red-600',
          accent: 'text-red-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Premium Cashback', 'Dining', 'Travel Insurance']
      },
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
        pattern: 'classic-waves',
        features: ['ATM Access', 'Online Banking', 'Mobile Banking']
      }
    ]
  },
  'mashreq': {
    name: 'Mashreq Bank',
    logo: '⭐',
    cards: [
      {
        id: 'mashreq-world',
        name: 'Mashreq World',
        type: 'credit',
        tier: 'world',
        colors: {
          primary: 'from-orange-600 via-red-600 to-orange-700',
          secondary: 'from-orange-400 to-red-500',
          accent: 'text-orange-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['World Privileges', 'Travel Benefits', 'Concierge']
      },
      {
        id: 'mashreq-platinum',
        name: 'Mashreq Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-orange-700 to-slate-800',
          secondary: 'from-orange-400 to-slate-500',
          accent: 'text-orange-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Premium Rewards', 'Travel Insurance', 'Dining']
      },
      {
        id: 'mashreq-gold',
        name: 'Mashreq Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-orange-600 to-yellow-700',
          secondary: 'from-yellow-400 to-orange-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Cashback', 'Rewards Points', 'Travel Benefits']
      },
      {
        id: 'mashreq-classic',
        name: 'Mashreq Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-orange-500 via-red-500 to-orange-600',
          secondary: 'from-orange-300 to-red-400',
          accent: 'text-orange-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['ATM Network', 'Online Banking', 'Mobile Banking']
      }
    ]
  },
  'dib': {
    name: 'Dubai Islamic Bank',
    logo: '🕌',
    cards: [
      {
        id: 'dib-signature',
        name: 'DIB Signature',
        type: 'credit',
        tier: 'signature',
        colors: {
          primary: 'from-emerald-700 via-teal-700 to-emerald-800',
          secondary: 'from-emerald-400 to-teal-500',
          accent: 'text-emerald-300',
          text: 'text-white'
        },
        pattern: 'signature-elegant',
        features: ['Sharia Compliant', 'Travel Benefits', 'Rewards']
      },
      {
        id: 'dib-platinum',
        name: 'DIB Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-teal-700 to-slate-800',
          secondary: 'from-teal-400 to-slate-500',
          accent: 'text-teal-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Islamic Banking', 'Premium Rewards', 'Travel Insurance']
      },
      {
        id: 'dib-gold',
        name: 'DIB Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-teal-600 to-yellow-700',
          secondary: 'from-yellow-400 to-teal-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Halal Rewards', 'Cashback', 'Travel Benefits']
      },
      {
        id: 'dib-classic',
        name: 'DIB Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-teal-600 via-emerald-600 to-teal-700',
          secondary: 'from-teal-400 to-emerald-500',
          accent: 'text-teal-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Islamic Banking', 'ATM Network', 'Mobile Banking']
      }
    ]
  },
  'cbd': {
    name: 'Commercial Bank of Dubai',
    logo: '🏢',
    cards: [
      {
        id: 'cbd-platinum',
        name: 'CBD Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-blue-700 to-slate-800',
          secondary: 'from-blue-400 to-slate-500',
          accent: 'text-blue-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Premium Banking', 'Travel Insurance', 'Concierge']
      },
      {
        id: 'cbd-gold',
        name: 'CBD Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-blue-600 to-yellow-700',
          secondary: 'from-yellow-400 to-blue-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Rewards Points', 'Cashback', 'Travel Benefits']
      },
      {
        id: 'cbd-classic',
        name: 'CBD Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-blue-600 via-indigo-600 to-blue-700',
          secondary: 'from-blue-400 to-indigo-500',
          accent: 'text-blue-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['ATM Access', 'Online Banking', 'Mobile Banking']
      }
    ]
  },
  'hsbc': {
    name: 'HSBC UAE',
    logo: '🔺',
    cards: [
      {
        id: 'hsbc-premier',
        name: 'HSBC Premier World',
        type: 'credit',
        tier: 'world',
        colors: {
          primary: 'from-red-700 via-red-800 to-black',
          secondary: 'from-red-400 to-red-600',
          accent: 'text-red-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Premier Banking', 'Global Access', 'Concierge']
      },
      {
        id: 'hsbc-platinum',
        name: 'HSBC Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-red-700 to-slate-800',
          secondary: 'from-red-400 to-slate-500',
          accent: 'text-red-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['International Banking', 'Travel Insurance', 'Rewards']
      },
      {
        id: 'hsbc-gold',
        name: 'HSBC Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-red-600 to-yellow-700',
          secondary: 'from-yellow-400 to-red-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Global Rewards', 'Cashback', 'Travel Benefits']
      },
      {
        id: 'hsbc-classic',
        name: 'HSBC Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-red-500 via-red-600 to-red-700',
          secondary: 'from-red-300 to-red-500',
          accent: 'text-red-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Global ATM', 'Online Banking', 'Mobile Banking']
      }
    ]
  },
  'citi': {
    name: 'Citibank UAE',
    logo: '🔷',
    cards: [
      {
        id: 'citi-prestige',
        name: 'Citi Prestige',
        type: 'credit',
        tier: 'infinite',
        colors: {
          primary: 'from-black via-slate-900 to-blue-900',
          secondary: 'from-blue-400 to-blue-600',
          accent: 'text-blue-300',
          text: 'text-white'
        },
        pattern: 'infinite-luxury',
        features: ['Prestige Benefits', 'Airport Lounge', 'Global Concierge']
      },
      {
        id: 'citi-platinum',
        name: 'Citi Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-blue-700 to-slate-800',
          secondary: 'from-blue-400 to-slate-500',
          accent: 'text-blue-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['ThankYou Points', 'Travel Insurance', 'Price Protection']
      },
      {
        id: 'citi-rewards',
        name: 'Citi Rewards',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-blue-600 to-yellow-700',
          secondary: 'from-yellow-400 to-blue-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Rewards Points', 'Cashback', 'Dining Benefits']
      },
      {
        id: 'citi-classic',
        name: 'Citi Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-blue-600 via-blue-700 to-blue-800',
          secondary: 'from-blue-400 to-blue-600',
          accent: 'text-blue-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Global Banking', 'ATM Network', 'Online Banking']
      }
    ]
  },
  'sc': {
    name: 'Standard Chartered UAE',
    logo: '💚',
    cards: [
      {
        id: 'sc-infinite',
        name: 'Standard Chartered Infinite',
        type: 'credit',
        tier: 'infinite',
        colors: {
          primary: 'from-black via-slate-900 to-green-900',
          secondary: 'from-green-400 to-green-600',
          accent: 'text-green-300',
          text: 'text-white'
        },
        pattern: 'infinite-luxury',
        features: ['Infinite Privileges', 'Priority Pass', 'Global Concierge']
      },
      {
        id: 'sc-platinum',
        name: 'Standard Chartered Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-green-700 to-slate-800',
          secondary: 'from-green-400 to-slate-500',
          accent: 'text-green-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Premium Banking', 'Travel Insurance', 'Rewards']
      },
      {
        id: 'sc-gold',
        name: 'Standard Chartered Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-green-600 to-yellow-700',
          secondary: 'from-yellow-400 to-green-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Cashback', 'Rewards Points', 'Travel Benefits']
      },
      {
        id: 'sc-classic',
        name: 'Standard Chartered Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-green-600 via-emerald-600 to-green-700',
          secondary: 'from-green-400 to-emerald-500',
          accent: 'text-green-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['International Banking', 'ATM Network', 'Mobile Banking']
      }
    ]
  },
  'alhilal': {
    name: 'Al Hilal Bank',
    logo: '🌙',
    cards: [
      {
        id: 'alhilal-signature',
        name: 'Al Hilal Signature',
        type: 'credit',
        tier: 'signature',
        colors: {
          primary: 'from-emerald-700 via-green-700 to-emerald-800',
          secondary: 'from-emerald-400 to-green-500',
          accent: 'text-emerald-300',
          text: 'text-white'
        },
        pattern: 'signature-elegant',
        features: ['Sharia Compliant', 'Premium Banking', 'Travel Benefits']
      },
      {
        id: 'alhilal-gold',
        name: 'Al Hilal Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-emerald-600 to-yellow-700',
          secondary: 'from-yellow-400 to-emerald-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Islamic Banking', 'Cashback', 'Halal Rewards']
      },
      {
        id: 'alhilal-classic',
        name: 'Al Hilal Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-emerald-600 via-green-600 to-emerald-700',
          secondary: 'from-emerald-400 to-green-500',
          accent: 'text-emerald-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Sharia Compliant', 'ATM Network', 'Islamic Banking']
      }
    ]
  },
  'nbad': {
    name: 'NBAD (Legacy)',
    logo: '🏛️',
    cards: [
      {
        id: 'nbad-platinum',
        name: 'NBAD Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-blue-700 to-slate-800',
          secondary: 'from-blue-400 to-slate-500',
          accent: 'text-blue-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Legacy Card', 'Premium Benefits', 'Travel Insurance']
      },
      {
        id: 'nbad-classic',
        name: 'NBAD Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-blue-600 via-blue-700 to-blue-800',
          secondary: 'from-blue-400 to-blue-600',
          accent: 'text-blue-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Legacy Banking', 'ATM Access', 'Basic Banking']
      }
    ]
  },
  'eib': {
    name: 'Emirates Islamic Bank',
    logo: '🕌',
    cards: [
      {
        id: 'eib-signature',
        name: 'Emirates Islamic Signature',
        type: 'credit',
        tier: 'signature',
        colors: {
          primary: 'from-emerald-700 via-green-700 to-emerald-800',
          secondary: 'from-emerald-400 to-green-500',
          accent: 'text-emerald-300',
          text: 'text-white'
        },
        pattern: 'signature-elegant',
        features: ['Sharia Compliant', 'Premium Banking', 'Halal Rewards']
      },
      {
        id: 'eib-platinum',
        name: 'Emirates Islamic Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-emerald-700 to-slate-800',
          secondary: 'from-emerald-400 to-slate-500',
          accent: 'text-emerald-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Islamic Banking', 'Premium Rewards', 'Travel Benefits']
      },
      {
        id: 'eib-gold',
        name: 'Emirates Islamic Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-emerald-600 to-yellow-700',
          secondary: 'from-yellow-400 to-emerald-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Halal Cashback', 'Islamic Rewards', 'Travel Insurance']
      },
      {
        id: 'eib-classic',
        name: 'Emirates Islamic Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-emerald-600 via-green-600 to-emerald-700',
          secondary: 'from-emerald-400 to-green-500',
          accent: 'text-emerald-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Sharia Compliant', 'ATM Network', 'Islamic Banking']
      }
    ]
  },
  'adib': {
    name: 'Abu Dhabi Islamic Bank',
    logo: '🕌',
    cards: [
      {
        id: 'adib-infinite',
        name: 'ADIB Infinite',
        type: 'credit',
        tier: 'infinite',
        colors: {
          primary: 'from-black via-slate-900 to-teal-900',
          secondary: 'from-teal-400 to-teal-600',
          accent: 'text-teal-300',
          text: 'text-white'
        },
        pattern: 'infinite-luxury',
        features: ['Infinite Sharia Benefits', 'Global Concierge', 'Halal Rewards']
      },
      {
        id: 'adib-signature',
        name: 'ADIB Signature',
        type: 'credit',
        tier: 'signature',
        colors: {
          primary: 'from-teal-700 via-emerald-700 to-teal-800',
          secondary: 'from-teal-400 to-emerald-500',
          accent: 'text-teal-300',
          text: 'text-white'
        },
        pattern: 'signature-elegant',
        features: ['Sharia Compliant', 'Premium Banking', 'Islamic Finance']
      },
      {
        id: 'adib-platinum',
        name: 'ADIB Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-teal-700 to-slate-800',
          secondary: 'from-teal-400 to-slate-500',
          accent: 'text-teal-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Islamic Banking', 'Premium Rewards', 'Halal Finance']
      },
      {
        id: 'adib-classic',
        name: 'ADIB Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-teal-600 via-emerald-600 to-teal-700',
          secondary: 'from-teal-400 to-emerald-500',
          accent: 'text-teal-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Sharia Banking', 'ATM Network', 'Islamic Finance']
      }
    ]
  },
  'unb': {
    name: 'Union National Bank',
    logo: '🏦',
    cards: [
      {
        id: 'unb-platinum',
        name: 'UNB Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-purple-700 to-slate-800',
          secondary: 'from-purple-400 to-slate-500',
          accent: 'text-purple-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Premium Banking', 'Travel Insurance', 'Rewards Program']
      },
      {
        id: 'unb-gold',
        name: 'UNB Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-purple-600 to-yellow-700',
          secondary: 'from-yellow-400 to-purple-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Cashback Rewards', 'Travel Benefits', 'Insurance']
      },
      {
        id: 'unb-classic',
        name: 'UNB Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-purple-600 via-indigo-600 to-purple-700',
          secondary: 'from-purple-400 to-indigo-500',
          accent: 'text-purple-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['ATM Network', 'Online Banking', 'Mobile Banking']
      }
    ]
  },
  'noor': {
    name: 'Noor Bank (Legacy)',
    logo: '💎',
    cards: [
      {
        id: 'noor-platinum',
        name: 'Noor Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-cyan-700 to-slate-800',
          secondary: 'from-cyan-400 to-slate-500',
          accent: 'text-cyan-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Legacy Card', 'Premium Banking', 'Travel Benefits']
      },
      {
        id: 'noor-classic',
        name: 'Noor Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-cyan-600 via-blue-600 to-cyan-700',
          secondary: 'from-cyan-400 to-blue-500',
          accent: 'text-cyan-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Legacy Banking', 'ATM Access', 'Basic Services']
      }
    ]
  },
  'ajman': {
    name: 'Ajman Bank',
    logo: '🕌',
    cards: [
      {
        id: 'ajman-platinum',
        name: 'Ajman Bank Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-orange-700 to-slate-800',
          secondary: 'from-orange-400 to-slate-500',
          accent: 'text-orange-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Sharia Compliant', 'Regional Banking', 'Islamic Finance']
      },
      {
        id: 'ajman-gold',
        name: 'Ajman Bank Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-orange-600 to-yellow-700',
          secondary: 'from-yellow-400 to-orange-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Halal Rewards', 'Islamic Banking', 'Regional Focus']
      },
      {
        id: 'ajman-classic',
        name: 'Ajman Bank Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-orange-600 via-red-600 to-orange-700',
          secondary: 'from-orange-400 to-red-500',
          accent: 'text-orange-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Islamic Banking', 'Local ATM', 'Sharia Services']
      }
    ]
  },
  'sib': {
    name: 'Sharjah Islamic Bank',
    logo: '🕌',
    cards: [
      {
        id: 'sib-gold',
        name: 'Sharjah Islamic Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-teal-600 to-yellow-700',
          secondary: 'from-yellow-400 to-teal-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Sharia Compliant', 'Regional Banking', 'Halal Finance']
      },
      {
        id: 'sib-classic',
        name: 'Sharjah Islamic Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-teal-600 via-emerald-600 to-teal-700',
          secondary: 'from-teal-400 to-emerald-500',
          accent: 'text-teal-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Islamic Banking', 'Regional Focus', 'Sharia Services']
      }
    ]
  },
  'bos': {
    name: 'Bank of Sharjah',
    logo: '🏦',
    cards: [
      {
        id: 'bos-platinum',
        name: 'Bank of Sharjah Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-indigo-700 to-slate-800',
          secondary: 'from-indigo-400 to-slate-500',
          accent: 'text-indigo-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Regional Banking', 'Premium Services', 'Local Focus']
      },
      {
        id: 'bos-classic',
        name: 'Bank of Sharjah Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-indigo-600 via-blue-600 to-indigo-700',
          secondary: 'from-indigo-400 to-blue-500',
          accent: 'text-indigo-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Local Banking', 'ATM Network', 'Regional Services']
      }
    ]
  },
  'nbf': {
    name: 'National Bank of Fujairah',
    logo: '🏦',
    cards: [
      {
        id: 'nbf-platinum',
        name: 'NBF Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-emerald-700 to-slate-800',
          secondary: 'from-emerald-400 to-slate-500',
          accent: 'text-emerald-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Regional Banking', 'Premium Benefits', 'Local Focus']
      },
      {
        id: 'nbf-classic',
        name: 'NBF Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-emerald-600 via-green-600 to-emerald-700',
          secondary: 'from-emerald-400 to-green-500',
          accent: 'text-emerald-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Local Banking', 'ATM Access', 'Regional Services']
      }
    ]
  },
  'icici': {
    name: 'ICICI Bank UAE',
    logo: '🔶',
    cards: [
      {
        id: 'icici-platinum',
        name: 'ICICI Platinum',
        type: 'credit',
        tier: 'platinum',
        colors: {
          primary: 'from-slate-700 via-orange-700 to-slate-800',
          secondary: 'from-orange-400 to-slate-500',
          accent: 'text-orange-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['International Banking', 'NRI Services', 'Global Access']
      },
      {
        id: 'icici-gold',
        name: 'ICICI Gold',
        type: 'credit',
        tier: 'gold',
        colors: {
          primary: 'from-yellow-600 via-orange-600 to-yellow-700',
          secondary: 'from-yellow-400 to-orange-500',
          accent: 'text-yellow-300',
          text: 'text-white'
        },
        pattern: 'gold-shimmer',
        features: ['Rewards Points', 'NRI Benefits', 'International Access']
      },
      {
        id: 'icici-classic',
        name: 'ICICI Classic',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-orange-600 via-red-600 to-orange-700',
          secondary: 'from-orange-400 to-red-500',
          accent: 'text-orange-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['International Banking', 'Global ATM', 'NRI Services']
      }
    ]
  },
  'liv': {
    name: 'Liv Bank (by Emirates NBD)',
    logo: '📱',
    cards: [
      {
        id: 'liv-metal',
        name: 'Liv Metal',
        type: 'credit',
        tier: 'premium',
        colors: {
          primary: 'from-slate-800 via-purple-800 to-slate-900',
          secondary: 'from-purple-400 to-purple-600',
          accent: 'text-purple-300',
          text: 'text-white'
        },
        pattern: 'titanium-metallic',
        features: ['Digital First', 'Metal Card', 'Gen Z Banking']
      },
      {
        id: 'liv-signature',
        name: 'Liv Signature',
        type: 'credit',
        tier: 'signature',
        colors: {
          primary: 'from-purple-700 via-pink-700 to-purple-800',
          secondary: 'from-purple-400 to-pink-500',
          accent: 'text-purple-300',
          text: 'text-white'
        },
        pattern: 'premium-metallic',
        features: ['Digital Banking', 'Lifestyle Rewards', 'Social Features']
      },
      {
        id: 'liv-digital',
        name: 'Liv Digital',
        type: 'debit',
        tier: 'standard',
        colors: {
          primary: 'from-purple-600 via-pink-600 to-purple-700',
          secondary: 'from-purple-400 to-pink-500',
          accent: 'text-purple-200',
          text: 'text-white'
        },
        pattern: 'classic-waves',
        features: ['Digital Native', 'Instant Banking', 'Social Money']
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
    logo: bank.logo,
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