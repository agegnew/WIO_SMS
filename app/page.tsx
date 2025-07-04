"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, ArrowLeftIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [logoVisible, setLogoVisible] = useState(false)
  const [logoExploding, setLogoExploding] = useState(false)
  const [cameraZooming, setCameraZooming] = useState(false)
  const [loginEntering, setLoginEntering] = useState(false)

  useEffect(() => {
    // Modern fast animation sequence
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 200)

    const explodeTimer = setTimeout(() => {
      setLogoExploding(true)
    }, 800)

    const zoomTimer = setTimeout(() => {
      setCameraZooming(true)
    }, 1000)

    const loginTimer = setTimeout(() => {
      setLoginEntering(true)
    }, 1200)

    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 1600)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(explodeTimer)
      clearTimeout(zoomTimer)
      clearTimeout(loginTimer)
      clearTimeout(splashTimer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Check for fake credentials
    if (email === 'test@test.com' && password === '123') {
      setIsLoading(false)
      // Successful login - redirect to SMS functionality
      router.push('/sms')
    } else {
      setIsLoading(false)
      // Show error for wrong credentials
      alert('Invalid credentials. Please use:\nEmail: test@test.com\nPassword: 123')
    }
  }

  // Epic Splash Screen with Mind-Blowing Animations
  if (showSplash) {
    return (
      <div className="h-screen relative overflow-hidden perspective-1000">
        {/* Enhanced Video Background with 3D effects */}
        <div className={`absolute inset-0 z-0 transition-all duration-1000 ease-out ${
          cameraZooming ? 'scale-150 blur-sm' : 'scale-100'
        }`}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/smoke-background.mp4" type="video/mp4" />
          </video>
          
          {/* Dynamic gradient overlays */}
          <div className="absolute inset-0 bg-black/40" />
          <div className={`absolute inset-0 bg-gradient-to-br from-pink-900/70 via-purple-900/60 to-violet-900/80 transition-all duration-1000 ${
            logoExploding ? 'animate-pulse' : ''
          }`} />
          
          {/* Cinematic vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
        </div>

        {/* Epic Splash Content */}
        <div className={`relative z-10 h-screen flex items-center justify-center transition-all duration-1000 ease-out ${
          cameraZooming ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
        }`}>
          
          {/* Modern Logo Container */}
          <div className={`relative transform-gpu transition-all duration-600 ease-out ${
            logoVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-75 translate-y-8'
          } ${
            logoExploding 
              ? 'scale-105 animate-pulse' 
              : ''
          }`}
          style={{
            transform: logoExploding 
              ? 'scale(1.05)' 
              : logoVisible 
                ? 'scale(1)' 
                : 'scale(0.75) translateY(32px)',
            filter: logoExploding ? 'brightness(1.2)' : 'brightness(1)'
          }}>
            
            {/* Professional Breathing Glow System */}
            <div className="absolute inset-0 -z-10">
              {/* Core Energy Ring */}
              <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/60 to-purple-500/60 rounded-full blur-xl scale-110 transition-all duration-400 ${
                logoExploding ? 'scale-140 opacity-95' : 'scale-110'
              }`} 
              style={{
                animation: logoVisible ? 'breathe 3s ease-in-out infinite' : 'none'
              }} />
              
              {/* Ambient Halo */}
              <div className={`absolute inset-0 bg-gradient-to-r from-violet-400/40 to-pink-400/40 rounded-full blur-2xl scale-130 transition-all duration-300 delay-100 ${
                logoExploding ? 'scale-180 opacity-80' : 'scale-130'
              }`}
              style={{
                animation: logoVisible ? 'breathe-reverse 4s ease-in-out infinite' : 'none'
              }} />
              
              {/* Outer Energy Field */}
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-300/25 to-pink-300/25 rounded-full blur-3xl scale-160 transition-all duration-500 delay-200 ${
                logoExploding ? 'scale-220 opacity-60' : 'scale-160'
              }`}
              style={{
                animation: logoVisible ? 'breathe 5s ease-in-out infinite' : 'none'
              }} />
            </div>

            {/* Main Logo with 3D effect */}
            <div className="relative z-10 flex justify-center">
              <Image
                src="/wiologo.svg"
                alt="WIO Bank Logo"
                width={140}
                height={70}
                className={`filter brightness-0 invert transition-all duration-800 ${
                  logoExploding ? 'drop-shadow-2xl' : 'drop-shadow-lg'
                }`}
                style={{
                  filter: logoExploding 
                    ? 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255,255,255,0.8))' 
                    : 'brightness(0) invert(1) drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Modern Login Page Entrance
  return (
    <div className={`h-screen relative overflow-hidden transition-all duration-600 ease-out transform ${
      loginEntering 
        ? 'opacity-100 scale-100 blur-0' 
        : 'opacity-0 scale-98 blur-sm'
    }`}
    style={{
      transform: loginEntering 
        ? 'scale(1)' 
        : 'scale(0.98)'
    }}>
      {/* Video Background with entrance effect */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${
        loginEntering ? 'scale-100 opacity-100' : 'scale-110 opacity-70'
      }`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/smoke-background.mp4" type="video/mp4" />
        </video>
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 via-purple-900/70 to-violet-900/90" />
      </div>

      {/* Content Layer with staggered entrance */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Main Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          {/* Logo Section */}
          <div className={`text-center mb-6 transition-all duration-400 delay-200 transform ${
            loginEntering ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}>
            <div className="mb-4 flex justify-center">
              <div className="relative"
                   style={{
                     animation: loginEntering ? 'float 6s ease-in-out infinite' : 'none'
                   }}>
                <Image
                  src="/wiologo.svg"
                  alt="WIO Bank Logo"
                  width={120}
                  height={60}
                  className="filter brightness-0 invert drop-shadow-2xl"
                />
                {/* Subtle glow around main logo */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-lg"
                     style={{
                       animation: loginEntering ? 'breathe 4s ease-in-out infinite' : 'none'
                     }} />
              </div>
            </div>
          </div>

          {/* Professional Hero Section */}
          <div className={`text-center mb-8 w-full max-w-2xl transition-all duration-400 delay-300 transform ${
            loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-4xl md:text-4xl font-light text-white mb-4 leading-tight tracking-wide">
              Welcome to the
              <span className="block font-semibold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                Future of Banking
              </span>
            </h1>
          </div>

          {/* Refined Login Form */}
          <div className={`w-full max-w-sm transition-all duration-400 delay-400 transform ${
            loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-pink-100 font-medium text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-pink-100 font-medium text-sm">
                  Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 h-11 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-all duration-200 hover:scale-110 transform-gpu"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-pink-400 bg-white/10 border-pink-300/30 rounded focus:ring-pink-400/30 focus:ring-1 transition-all duration-200"
                  />
                  <label htmlFor="remember" className="text-pink-200 text-sm">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-pink-200 hover:text-pink-100 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Professional Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 hover:shadow-xl hover:shadow-pink-500/40 text-white border-0 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg shadow-pink-500/25 mt-4 transform-gpu"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Secondary Action */}
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/signup')}
                className="w-full h-11 text-sm font-medium bg-transparent border border-pink-300/30 text-pink-100 hover:bg-pink-500/10 hover:border-pink-300/50 hover:text-white hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] rounded-lg backdrop-blur-sm transform-gpu"
              >
                Create Account
              </Button>
            </form>
          </div>

          {/* Professional Bottom Section */}
          <div className={`mt-6 text-center space-y-2 transition-all duration-400 delay-500 transform ${
            loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {/* License Information */}
            <p className="text-pink-200/80 text-xs font-medium flex items-center justify-center space-x-1.5">
              <LockIcon className="w-3 h-3" />
              <span>Licensed and Regulated by UAE Central Bank</span>
            </p>
            <p className="text-pink-300/60 text-xs">
              Your deposits are protected up to AED 250,000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom CSS animations
const cssStyles = `
  @keyframes breathe {
    0%, 100% { 
      transform: scale(1); 
      opacity: 0.5;
    }
    50% { 
      transform: scale(1.05); 
      opacity: 0.8;
    }
  }
  
  @keyframes breathe-reverse {
    0%, 100% { 
      transform: scale(1); 
      opacity: 0.4;
    }
    50% { 
      transform: scale(0.95); 
      opacity: 0.6;
    }
  }
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px); 
    }
    50% { 
      transform: translateY(-10px); 
    }
  }
`

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = cssStyles
  document.head.appendChild(styleSheet)
}