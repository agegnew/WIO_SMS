"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import QRCode from "qrcode-generator"

// Types for the SMS plugin
interface SMSObject {
  id: number
  threadId: number
  type: number
  address: string
  creator: string
  person: string
  date: number
  dateSent: number
  subject: string
  body: string
}

interface PermissionStatus {
  sms: 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'
}

export default function SMSPage() {
  const router = useRouter()
  const [hasPermission, setHasPermission] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
  const [smsMessages, setSmsMessages] = useState<SMSObject[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCapacitorApp, setIsCapacitorApp] = useState(false)

  const networkUrl = "http://192.168.56.1:3000"

  useEffect(() => {
    // Generate QR code on component mount
    generateQRCode()
    
    // Check if running in Capacitor
    if (typeof window !== 'undefined') {
      const capacitor = (window as any).Capacitor
      if (capacitor) {
        setIsCapacitorApp(true)
        console.log('Running in Capacitor environment')
      }
    }
  }, [])

  const generateQRCode = () => {
    try {
      const qr = QRCode(0, 'M')
      qr.addData(networkUrl)
      qr.make()
      
      // Convert to data URL for display
      const qrDataUrl = qr.createDataURL(8, 4)
      setQrCodeDataUrl(qrDataUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const requestSmsPermission = async () => {
    setIsRequesting(true)
    
    try {
      // Check if we're in a Capacitor environment
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        const { Capacitor } = (window as any)
        
        if (Capacitor.isNativePlatform()) {
          try {
            // Import the plugin dynamically
            const { SMSInboxReader } = await import('capacitor-sms-inbox')
            
            // Check current permissions
            const permissionStatus = await SMSInboxReader.checkPermissions()
            console.log('Current permission status:', permissionStatus)
            
            if (permissionStatus.sms === 'granted') {
              setHasPermission(true)
              showToast('SMS permission already granted!', 'success')
              await loadSmsMessages()
            } else {
              // Request SMS permissions
              const permissionResult = await SMSInboxReader.requestPermissions()
              console.log('Permission result:', permissionResult)
              
              if (permissionResult.sms === 'granted') {
                setHasPermission(true)
                showToast('SMS permission granted!', 'success')
                await loadSmsMessages()
              } else {
                showToast('SMS permission denied', 'error')
              }
            }
          } catch (error) {
            console.error('Error requesting SMS permission:', error)
            showToast('Error requesting SMS permission: ' + error, 'error')
          }
        } else {
          // Fallback for web
          showPermissionDialog()
        }
      } else {
        // Fallback for web
        showPermissionDialog()
      }
    } catch (error) {
      console.error('Error requesting SMS permission:', error)
      showToast('Error requesting SMS permission', 'error')
    } finally {
      setIsRequesting(false)
    }
  }

  const loadSmsMessages = async () => {
    setIsLoading(true)
    
    try {
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        const { Capacitor } = (window as any)
        
        if (Capacitor.isNativePlatform()) {
          try {
            // Import the plugin dynamically
            const { SMSInboxReader } = await import('capacitor-sms-inbox')
            
            // Get SMS messages
            const result = await SMSInboxReader.getSMSList({
             filter: {
               maxCount: 50, // Limit to 50 messages
               type: 1 // Inbox messages
             }
           })
           
           console.log('SMS messages:', result.smsList)
           setSmsMessages(result.smsList || [])
           showToast(`Loaded ${result.smsList?.length || 0} SMS messages`, 'success')
         } catch (error) {
           console.error('Error loading SMS messages:', error)
           showToast('Error loading SMS messages: ' + error, 'error')
         }
       }
     }
   } catch (error) {
     console.error('Error loading SMS messages:', error)
     showToast('Error loading SMS messages', 'error')
   } finally {
     setIsLoading(false)
   }
 }

 const showPermissionDialog = () => {
   const granted = window.confirm(
     'SMS Permission Required\n\n' +
     'This app needs access to your SMS messages to display your conversations. ' +
     'Grant permission to continue?\n\n' +
     'Note: This is a simulation for web browsers. On mobile devices, ' +
     'this would trigger the actual SMS permission request.'
   )
   
   if (granted) {
     setHasPermission(true)
     showToast('SMS permission granted! (Simulated)', 'success')
     // Load mock data for web
     loadMockSmsMessages()
   } else {
     showToast('SMS permission denied', 'error')
   }
 }

 const loadMockSmsMessages = () => {
   // Mock SMS data for web demonstration
   const mockSms: SMSObject[] = [
     {
       id: 1,
       threadId: 1,
       type: 1,
       address: "+1234567890",
       creator: "com.google.android.apps.messaging",
       person: "John Doe",
       date: Date.now() - 300000,
       dateSent: Date.now() - 300000,
       subject: "",
       body: "Hey, how are you doing? Are we still meeting tomorrow?"
     },
     {
       id: 2,
       threadId: 2,
       type: 1,
       address: "+0987654321",
       creator: "com.google.android.apps.messaging",
       person: "Jane Smith",
       date: Date.now() - 3600000,
       dateSent: Date.now() - 3600000,
       subject: "",
       body: "Thanks for the help with the project!"
     },
     {
       id: 3,
       threadId: 3,
       type: 1,
       address: "+1122334455",
       creator: "com.google.android.apps.messaging",
       person: "Mom",
       date: Date.now() - 7200000,
       dateSent: Date.now() - 7200000,
       subject: "",
       body: "Don't forget to call your grandmother today."
     }
   ]
   
   setSmsMessages(mockSms)
   showToast('Loaded mock SMS messages', 'success')
 }

 const formatDate = (timestamp: number) => {
   return new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString()
 }

 const showToast = (message: string, type: 'success' | 'error') => {
   // Create a simple toast notification
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

 const handleLogout = () => {
   // Simple logout - redirect back to login
   router.push('/')
 }

 return (
   <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4">
     <div className="max-w-4xl w-full space-y-8">
       <div className="text-center relative">
         {/* Logout Button */}
         <div className="absolute top-0 right-0">
           <button
             onClick={handleLogout}
             className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
           >
             Logout
           </button>
         </div>
         
         <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
           SMS Messenger App
         </h2>
         <p className="mt-2 text-sm text-gray-600">
           Real SMS Permission & Message Reader
         </p>
         <div className="mt-2 text-xs text-gray-500">
           {isCapacitorApp ? '📱 Running on Mobile Device' : '🌐 Running in Web Browser'}
         </div>
       </div>

       <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         <div className="space-y-6">
           <div className="text-center">
             <h3 className="text-lg font-medium text-gray-900">Mobile SMS Access</h3>
             <p className="mt-2 text-sm text-gray-600">
               This app requests real SMS permissions and displays actual SMS messages from your device.
             </p>
             {isCapacitorApp && (
               <div className="mt-2 p-2 bg-blue-100 rounded-lg">
                 <p className="text-sm text-blue-800">
                   ✅ Native app environment detected! Real SMS permissions will be requested.
                 </p>
               </div>
             )}
           </div>

           {/* SMS Permission Section */}
           <div className="border rounded-lg p-6 bg-blue-50">
             <h4 className="font-medium text-gray-900 mb-4">📱 SMS Permissions</h4>
             <div className="space-y-4">
               <p className="text-sm text-gray-600">
                 Enable SMS access to view and manage your text messages from your phone.
               </p>
               <div className="flex items-center space-x-3">
                 <button
                   onClick={requestSmsPermission}
                   disabled={isRequesting || hasPermission}
                   className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                     hasPermission
                       ? 'bg-green-100 text-green-800 cursor-not-allowed'
                       : isRequesting
                       ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                       : 'bg-blue-600 text-white hover:bg-blue-700'
                   }`}
                 >
                   {isRequesting 
                     ? 'Requesting...' 
                     : hasPermission 
                     ? '✓ Permission Granted' 
                     : 'Request SMS Permission'
                   }
                 </button>
                 {hasPermission && (
                   <button
                     onClick={loadSmsMessages}
                     disabled={isLoading}
                     className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300"
                   >
                     {isLoading ? 'Loading...' : 'Refresh Messages'}
                   </button>
                 )}
               </div>
               {hasPermission && (
                 <span className="text-sm text-green-600">
                   ✓ SMS access enabled - {smsMessages.length} messages loaded
                 </span>
               )}
             </div>
           </div>

           {/* SMS Messages List */}
           {hasPermission && smsMessages.length > 0 && (
             <div className="border rounded-lg p-6 bg-green-50">
               <h4 className="font-medium text-gray-900 mb-4">📩 Your SMS Messages</h4>
               <div className="space-y-3 max-h-96 overflow-y-auto">
                 {smsMessages.map((sms) => (
                   <div key={sms.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                     <div className="flex justify-between items-start mb-2">
                       <div className="font-medium text-gray-900">
                         {sms.person || sms.address}
                       </div>
                       <div className="text-xs text-gray-500">
                         {formatDate(sms.date)}
                       </div>
                     </div>
                     <div className="text-sm text-gray-700 mb-2">
                       {sms.body}
                     </div>
                     <div className="text-xs text-gray-500">
                       From: {sms.address}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* QR Code Section */}
           <div className="border rounded-lg p-6 bg-purple-50">
             <h4 className="font-medium text-gray-900 mb-4">📱 Mobile Access</h4>
             <div className="space-y-4">
               <p className="text-sm text-gray-600">
                 Scan this QR code with your mobile device to access the app on the same network.
               </p>
               <div className="flex flex-col items-center space-y-4">
                 {qrCodeDataUrl && (
                   <div className="bg-white p-4 rounded-lg border">
                     <img 
                       src={qrCodeDataUrl} 
                       alt="QR Code for mobile access" 
                       className="w-48 h-48"
                     />
                   </div>
                 )}
                 <div className="text-center">
                   <p className="text-sm font-medium text-gray-900">Network URL:</p>
                   <p className="text-sm text-blue-600 font-mono">{networkUrl}</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 )
} 