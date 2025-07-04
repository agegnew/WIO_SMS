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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-2 sm:space-y-3">
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
                    className="pl-8 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
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
                    className="pl-8 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
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
                  className="pl-8 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
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
                  <SelectTrigger className="pl-8 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu">
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
          <div className="space-y-2 sm:space-y-3">
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
                  className="pl-8 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
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
                  className="pl-8 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-2 sm:space-y-3">
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
                  className="pl-8 pr-9 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
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
                  className="pl-8 pr-9 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu"
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

            <div className="bg-pink-100/10 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <p className="text-pink-200/80 text-xs">
                Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-2 sm:space-y-3">
            <div className="space-y-1">
              <label htmlFor="hearAboutUs" className="text-pink-100 font-medium text-xs">
                How did you hear about us?
              </label>
              <div className="relative">
                <HeartHandshakeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-3 h-3 z-10" />
                <Select value={formData.hearAboutUs} onValueChange={(value) => updateFormData('hearAboutUs', value)}>
                  <SelectTrigger className="pl-8 h-8 sm:h-9 bg-white/95 border-2 border-white/30 text-slate-800 focus:ring-2 focus:bg-white rounded-lg backdrop-blur-sm transition-all duration-300 text-xs font-medium shadow-sm hover:shadow-md focus:shadow-lg transform-gpu">
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

            <div className="bg-gradient-to-r from-pink-100/10 to-purple-100/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
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

  // Modern Responsive Signup Page
  return (
    <div className={`min-h-screen h-screen relative overflow-hidden transition-all duration-600 ease-out transform ${
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
        {/* Progress Bar - Top Fixed */}
        <div className={`pt-2 sm:pt-4 px-4 sm:px-6 flex-shrink-0 transition-all duration-400 delay-100 ${
          loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="mb-1 sm:mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-pink-200/80 text-xs font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-pink-200/80 text-xs">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-pink-300/20 rounded-full h-1.5 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-400 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Logo and Step Header - Responsive Centered */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-2 sm:py-4 min-h-0">
          {/* Logo Section */}
          <div className={`text-center mb-2 sm:mb-3 transition-all duration-400 delay-200 transform ${
            loginEntering ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}>
            <div className="mb-1 sm:mb-2 flex justify-center">
              <div className="relative"
                   style={{
                     animation: loginEntering ? 'float 6s ease-in-out infinite' : 'none'
                   }}>
                <Image
                  src="/wiologo.svg"
                  alt="WIO Bank Logo"
                  width={64}
                  height={32}
                  className="filter brightness-0 invert drop-shadow-xl sm:w-20 sm:h-10"
                />
                {/* Subtle glow around main logo */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-lg"
                     style={{
                       animation: loginEntering ? 'breathe 4s ease-in-out infinite' : 'none'
                     }} />
              </div>
            </div>
          </div>

          {/* Dynamic Step Header */}
          <div className={`text-center mb-2 sm:mb-4 w-full max-w-2xl mx-auto transition-all duration-400 delay-300 transform ${
            loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-1 sm:mb-2 leading-tight tracking-wide">
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
        <div className="px-4 sm:px-6 pb-16 sm:pb-24 flex-shrink-0">
          {/* Multi-Step Form */}
          <div className={`w-full max-w-sm mx-auto transition-all duration-400 delay-400 transform ${
            loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <form onSubmit={handleSubmit}>
              {/* Render Current Step */}
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex gap-2 mt-3 sm:mt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 h-8 sm:h-9 text-xs font-medium bg-white/5 backdrop-blur-sm text-pink-100 hover:bg-pink-500/20 hover:text-white hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01] rounded-lg transform-gpu"
                  >
                    <ArrowLeftIcon className="w-3 h-3 mr-1" />
                    Previous
                  </Button>
                )}
                
                <Button
                  type="submit"
                  disabled={isLoading || !isStepValid()}
                  className={`${currentStep === 1 ? 'w-full' : 'flex-1'} h-8 sm:h-9 text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 hover:shadow-xl hover:shadow-pink-500/40 text-white border-0 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 shadow-lg shadow-pink-500/25 transform-gpu`}
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
            <div className={`mt-3 sm:mt-4 text-center space-y-1 transition-all duration-400 delay-500 transform ${
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
        <div className={`absolute bottom-2 sm:bottom-6 left-0 right-0 text-center space-y-1 transition-all duration-400 delay-600 transform ${
          loginEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <p className="text-pink-200/80 text-xs font-medium flex items-center justify-center space-x-1">
            <LockIcon className="w-3 h-3" />
            <span className="text-xs sm:text-sm">Licensed and Regulated by UAE Central Bank</span>
          </p>
          <p className="text-pink-300/60 text-xs">
            Your deposits are protected up to AED 250,000
          </p>
        </div>
      </div>
    </div>
  )
}

 