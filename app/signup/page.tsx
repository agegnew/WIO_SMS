"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, ArrowLeftIcon, ArrowRightIcon, UserIcon, PhoneIcon, CalendarIcon, GlobeIcon, HeartHandshakeIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface FormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  nationality: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  hearAboutUs: string
}

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [logoVisible, setLogoVisible] = useState(false)
  const [logoExploding, setLogoExploding] = useState(false)
  const [cameraZooming, setCameraZooming] = useState(false)
  const [particlesActive, setParticlesActive] = useState(false)
  const [loginEntering, setLoginEntering] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    hearAboutUs: ""
  })

  const totalSteps = 4

  useEffect(() => {
    // Complex animation sequence
    const logoTimer = setTimeout(() => {
      setLogoVisible(true)
    }, 500)

    const explodeTimer = setTimeout(() => {
      setLogoExploding(true)
    }, 2000)

    const particlesTimer = setTimeout(() => {
      setParticlesActive(true)
    }, 2300)

    const zoomTimer = setTimeout(() => {
      setCameraZooming(true)
    }, 2600)

    const loginTimer = setTimeout(() => {
      setLoginEntering(true)
    }, 3200)

    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 4000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(explodeTimer)
      clearTimeout(particlesTimer)
      clearTimeout(zoomTimer)
      clearTimeout(loginTimer)
      clearTimeout(splashTimer)
    }
  }, [])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep < totalSteps) {
      nextStep()
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically make an API call to create the account
    console.log("Account creation:", formData)
    
    setIsLoading(false)
    // Navigate to success page or login
    router.push('/login')
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.nationality
      case 2:
        return formData.email && formData.phoneNumber
      case 3:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
      case 4:
        return formData.hearAboutUs
      default:
        return false
    }
  }

  const countries = [
    "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman",
    "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
    "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Switzerland",
    "Austria", "Belgium", "Ireland", "Portugal", "India", "Pakistan", "Bangladesh",
    "Egypt", "Jordan", "Lebanon", "Morocco", "Tunisia", "Turkey", "Iran", "Iraq",
    "Syria", "Yemen", "Afghanistan", "Other"
  ]

  const hearAboutUsOptions = [
    "Social Media (Instagram, Facebook, Twitter)",
    "Google Search",
    "Friend or Family Recommendation",
    "Banking Professional",
    "Online Advertisement",
    "News Article or Blog",
    "App Store",
    "Emirates/UAE Banking Authority",
    "Investment Forum",
    "Other"
  ]

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
          
          {/* 3D Rotating Logo Container */}
          <div className={`relative transform-gpu transition-all duration-1200 ease-out ${
            logoVisible 
              ? 'opacity-100 scale-100 translate-y-0 rotateY-0' 
              : 'opacity-0 scale-50 translate-y-20 rotateY-180'
          } ${
            logoExploding 
              ? 'scale-110 rotateX-12 rotateY-12 animate-pulse' 
              : ''
          }`}
          style={{
            transform: logoExploding 
              ? 'perspective(1000px) rotateX(12deg) rotateY(12deg) scale(1.1)' 
              : logoVisible 
                ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)' 
                : 'perspective(1000px) rotateX(0deg) rotateY(180deg) scale(0.5)',
            transformStyle: 'preserve-3d'
          }}>
            
            {/* Multi-layered Glow Effects */}
            <div className="absolute inset-0 -z-10">
              {/* Primary glow */}
              <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl scale-150 transition-all duration-1000 ${
                logoExploding ? 'scale-300 opacity-80 animate-spin' : 'scale-150'
              }`} />
              
              {/* Secondary glow */}
              <div className={`absolute inset-0 bg-gradient-to-r from-violet-400/20 to-pink-400/20 rounded-full blur-2xl scale-200 transition-all duration-700 delay-200 ${
                logoExploding ? 'scale-400 opacity-60' : 'scale-200'
              }`} />
              
              {/* Outer aura */}
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-4xl scale-300 transition-all duration-500 delay-400 ${
                logoExploding ? 'scale-500 opacity-40' : 'scale-300'
              }`} />
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

            {/* Particle explosion effect */}
            {particlesActive && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${50 + i * 10}px)`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.8s'
                    }}
                  />
                ))}
                
                {/* Additional micro particles */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`micro-${i}`}
                    className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
                    style={{
                      left: `${45 + Math.random() * 10}%`,
                      top: `${45 + Math.random() * 10}%`,
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Floating geometric elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={`geo-${i}`}
                className={`absolute w-3 h-3 border border-pink-300/30 rotate-45 transition-all duration-2000 ease-out ${
                  logoVisible ? 'opacity-60 animate-pulse' : 'opacity-0'
                }`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 2) * 60}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Energy waves */}
          {logoExploding && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`wave-${i}`}
                  className="absolute inset-0 border-2 border-pink-400/20 rounded-full animate-ping"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cinematic scan lines effect */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 animate-pulse" 
               style={{ animation: 'scan 2s linear infinite' }} />
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label htmlFor="firstName" className="text-pink-100 font-medium text-xs">
                  First Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="pl-8 h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="lastName" className="text-pink-100 font-medium text-xs">
                  Last Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="pl-8 h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="dateOfBirth" className="text-pink-100 font-medium text-xs">
                Date of Birth
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  className="pl-8 h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="nationality" className="text-pink-100 font-medium text-xs">
                Nationality
              </label>
              <div className="relative">
                <GlobeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3 z-10" />
                <Select value={formData.nationality} onValueChange={(value) => updateFormData('nationality', value)}>
                  <SelectTrigger className="pl-8 h-9 bg-white/95 border-2 border-white/30 text-slate-800 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu">
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border-pink-200/30">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="text-slate-800 hover:bg-pink-50/50">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="email" className="text-pink-100 font-medium text-xs">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="pl-8 h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="phoneNumber" className="text-pink-100 font-medium text-xs">
                Phone Number
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                  className="pl-8 h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="password" className="text-pink-100 font-medium text-xs">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="pl-8 pr-9 h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-all duration-200 hover:scale-110 transform-gpu"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-3 h-3" />
                  ) : (
                    <EyeIcon className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-pink-100 font-medium text-xs">
                Confirm Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className="pl-8 pr-9 h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-all duration-200 hover:scale-110 transform-gpu"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="w-3 h-3" />
                  ) : (
                    <EyeIcon className="w-3 h-3" />
                  )}
                </button>
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="bg-pink-100/10 backdrop-blur-sm rounded-lg p-2 border border-pink-300/20">
              <p className="text-pink-200/80 text-xs">
                Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="hearAboutUs" className="text-pink-100 font-medium text-xs">
                How did you hear about us?
              </label>
              <div className="relative">
                <HeartHandshakeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3 z-10" />
                <Select value={formData.hearAboutUs} onValueChange={(value) => updateFormData('hearAboutUs', value)}>
                  <SelectTrigger className="pl-8 h-9 bg-white/95 border-2 border-white/30 text-slate-800 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border-pink-200/30">
                    {hearAboutUsOptions.map((option) => (
                      <SelectItem key={option} value={option} className="text-slate-800 hover:bg-pink-50/50">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-100/10 to-purple-100/10 backdrop-blur-sm rounded-lg p-3 border border-pink-300/20">
              <h3 className="text-pink-200 font-medium text-xs mb-1">🎉 Welcome to the WIO Family!</h3>
              <p className="text-pink-200/80 text-xs leading-relaxed">
                You're about to join thousands of satisfied customers who trust WIO Bank for their financial needs. 
                Get ready for a revolutionary banking experience!
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Epic Signup Page with Same Design
  return (
    <div className={`h-screen relative overflow-hidden transition-all duration-1200 ease-out transform ${
      loginEntering 
        ? 'opacity-100 scale-100 blur-0 rotateX-0' 
        : 'opacity-0 scale-95 blur-sm rotateX-12'
    }`}
    style={{
      transform: loginEntering 
        ? 'perspective(1000px) rotateX(0deg) scale(1)' 
        : 'perspective(1000px) rotateX(12deg) scale(0.95)',
      transformStyle: 'preserve-3d'
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
        {/* Progress Bar - Top Fixed */}
        <div className={`pt-4 px-6 transition-all duration-800 delay-300 ${
          loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-pink-200/80 text-xs font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-pink-200/80 text-xs">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-pink-300/20 rounded-full h-1.5 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-400 h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Logo and Step Header - Centered Between Progress and Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Logo Section */}
          <div className={`text-center mb-3 transition-all duration-800 delay-500 transform ${
            loginEntering ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
          }`}>
            <div className="mb-2 flex justify-center">
              <Image
                src="/wiologo.svg"
                alt="WIO Bank Logo"
                width={80}
                height={40}
                className="filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Dynamic Step Header */}
          <div className={`text-center mb-4 w-full max-w-2xl transition-all duration-800 delay-700 transform ${
            loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h1 className="text-2xl md:text-3xl font-light text-white mb-2 leading-tight tracking-wide">
              {currentStep === 1 && (
                <>
                  Personal
                  <span className="block font-semibold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Information
                  </span>
                </>
              )}
              {currentStep === 2 && (
                <>
                  Contact
                  <span className="block font-semibold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Details
                  </span>
                </>
              )}
              {currentStep === 3 && (
                <>
                  Account
                  <span className="block font-semibold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Security
                  </span>
                </>
              )}
              {currentStep === 4 && (
                <>
                  Almost
                  <span className="block font-semibold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Complete
                  </span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Form Container - Bottom Section */}
        <div className="px-6 pb-20">
          {/* Multi-Step Form */}
          <div className={`w-full max-w-sm mx-auto transition-all duration-800 delay-900 transform ${
            loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <form onSubmit={handleSubmit}>
              {/* Render Current Step */}
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex gap-2 mt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 h-9 text-xs font-medium bg-transparent border border-pink-300/30 text-pink-100 hover:bg-pink-500/10 hover:border-pink-300/50 hover:text-white hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] rounded-lg backdrop-blur-sm transform-gpu"
                  >
                    <ArrowLeftIcon className="w-3 h-3 mr-1" />
                    Previous
                  </Button>
                )}
                
                <Button
                  type="submit"
                  disabled={isLoading || !isStepValid()}
                  className={`${currentStep === 1 ? 'w-full' : 'flex-1'} h-9 text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 hover:shadow-xl hover:shadow-pink-500/40 text-white border-0 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 shadow-lg shadow-pink-500/25 transform-gpu`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : currentStep === totalSteps ? (
                    "Create Account"
                  ) : (
                    <>
                      Next
                      <ArrowRightIcon className="w-3 h-3 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Professional Bottom Section */}
            <div className={`mt-4 text-center space-y-1 transition-all duration-800 delay-1100 transform ${
              loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              {/* Already have account */}
              <p className="text-pink-200/80 text-xs">
                Already have an account?{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="text-pink-300 hover:text-pink-200 font-medium transition-colors duration-200"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Fixed License Information - Always in Same Position */}
        <div className={`absolute bottom-6 left-0 right-0 text-center space-y-1 transition-all duration-800 delay-1200 transform ${
          loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <p className="text-pink-200/80 text-xs font-medium flex items-center justify-center space-x-1">
            <LockIcon className="w-3 h-3" />
            <span>Licensed and Regulated by UAE Central Bank</span>
          </p>
          <p className="text-pink-300/60 text-xs">
            Your deposits are protected up to AED 250,000
          </p>
        </div>
      </div>
    </div>
  )
}

// Custom CSS for scan line animation
const style = `
@keyframes scan {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}
` 