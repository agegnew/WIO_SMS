"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  BarChart3, 
  Bell, 
  Mail, 
  Brain, 
  Monitor,
  Cloud,
  Menu,
  X,
  Settings
} from "lucide-react"

interface GlobalMenuProps {
  currentPage?: string
}

export default function GlobalMenu({ currentPage = '' }: GlobalMenuProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuAnimating, setMenuAnimating] = useState(false)

  const toggleMenu = () => {
    if (isMenuOpen) {
      setMenuAnimating(true)
      setTimeout(() => {
        setIsMenuOpen(false)
        setMenuAnimating(false)
      }, 300)
    } else {
      setIsMenuOpen(true)
      setMenuAnimating(true)
      setTimeout(() => {
        setMenuAnimating(false)
      }, 50)
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white max-w-sm`
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 4000)
  }

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'sms', title: 'Smart Alerts', icon: Bell, path: '/sms' },
    { id: 'email', title: 'Email Insights', icon: Mail, path: '/email' },
    { id: 'ai', title: 'AI Analytics', icon: Brain, path: '/ai' },
    { id: 'demo', title: 'Demo Mode', icon: Monitor, path: '/demo' },
    { id: 'cloudlynq', title: 'CloudLynq Special', icon: Cloud, path: '/cloudlynq', isGolden: true }
  ]

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <button
          onClick={toggleMenu}
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-white transform ${
            isMenuOpen ? 'rotate-45' : 'rotate-0'
          }`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full Page Menu Overlay */}
      {isMenuOpen && (
        <div 
          className={`fixed inset-0 z-50 transition-all duration-300 ${
            menuAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Background with blur effect */}
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={toggleMenu}
          />
          
          {/* Menu Content */}
          <div className="relative z-10 h-full flex flex-col bg-slate-50">
            {/* Header */}
            <div className="bg-white p-6 pt-16 border-b border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">WIO Hub</h1>
                  <p className="text-sm text-slate-600 mt-1">Smart Banking Intelligence</p>
                </div>
                <button 
                  onClick={toggleMenu}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-200 flex items-center justify-center"
                >
                  <Settings size={20} className="text-slate-600" />
                </button>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="flex-1 p-6 bg-white">
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {menuItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group relative rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-24 ${
                      item.isGolden
                        ? 'bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-600 text-black shadow-xl border-1 border-black hover:shadow-2xl hover:from-yellow-500 hover:to-amber-700'
                        : currentPage === item.id 
                        ? 'bg-white text-slate-900 shadow-lg border-2 border-slate-900 text-black' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-300 text-black'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: menuAnimating ? 'none' : 'slideInUp 0.4s ease-out forwards'
                    }}
                    onClick={() => {
                      if (item.path === '/dashboard' || item.path === '/sms') {
                        router.push(item.path)
                        toggleMenu()
                      } else if (item.isGolden) {
                        showToast(`${item.title} - Premium Feature Coming Soon! ✨`, 'success')
                      } else {
                        showToast(`${item.title} - Coming Soon!`, 'success')
                      }
                    }}
                  >
                    {/* Golden Premium Indicator */}
                    {item.isGolden && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    
                    {/* Professional Card Layout */}
                    <div className="p-4 h-full flex flex-col justify-between">
                      {/* Icon - Top Left */}
                      <div className="flex justify-start">
                        <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${
                          item.isGolden
                            ? 'bg-white/20 backdrop-blur-sm'
                            : currentPage === item.id 
                            ? 'bg-slate-100' 
                            : 'bg-white shadow-sm'
                        }`}>
                          <item.icon size={18} className={`${
                            item.isGolden 
                              ? 'text-black drop-shadow-sm' 
                              : currentPage === item.id ? 'text-black' : 'texttext-black'
                          }`} />
                        </div>
                      </div>
                      
                      {/* Title - Bottom Left */}
                      <div className="flex justify-start">
                        <h3 className={`text-sm font-semibold ${
                          item.isGolden 
                            ? 'text-black drop-shadow-sm' 
                            : currentPage === item.id ? 'text-black' : 'text-black'
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white p-6 border-t border-slate-200">
              <div className="text-center mb-6">
                <p className="text-slate-500 text-sm mb-2">WIO Bank PJSC</p>
                <p className="text-slate-400 text-xs">
                  Licensed and regulated by the Central Bank of UAE
                </p>
              </div>
              
              {/* Close Button */}
              <div className="flex justify-center">
                <button 
                  onClick={toggleMenu}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white transform hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Add CSS animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  document.head.appendChild(style)
}