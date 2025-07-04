import { Injectable } from "@angular/core"
import type { Platform, AlertController, LoadingController, ToastController } from "@ionic/angular"
import { Capacitor } from "@capacitor/core"

export interface SmsMessage {
  id: string
  address: string
  body: string
  date: number
  type: "inbox" | "sent"
  read: boolean
}

export interface SmsConversation {
  contactId: string
  contactName: string
  contactNumber: string
  lastMessage: string
  lastMessageTime: number
  unreadCount: number
  messages: SmsMessage[]
}

@Injectable({
  providedIn: "root",
})
export class SmsService {
  private hasPermissions = false
  private conversations: SmsConversation[] = []

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {}

  async initializePermissions(): Promise<boolean> {
    if (!this.platform.is("android") || !Capacitor.isNativePlatform()) {
      // For web/PWA, use mock data
      this.loadMockData()
      this.hasPermissions = true
      return true
    }

    try {
      // In a real implementation, you would use:
      // import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
      // const permissions = await this.androidPermissions.requestPermissions([
      //   this.androidPermissions.PERMISSION.READ_SMS,
      //   this.androidPermissions.PERMISSION.RECEIVE_SMS
      // ]);

      // For now, simulate permission request
      const granted = await this.showPermissionDialog()

      if (granted) {
        this.hasPermissions = true
        await this.loadSmsMessages()
        return true
      } else {
        await this.showPermissionDeniedAlert()
        return false
      }
    } catch (error) {
      console.error("Permission error:", error)
      await this.showErrorToast("Failed to request SMS permissions")
      return false
    }
  }

  private async showPermissionDialog(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: "SMS Permission Required",
        message:
          "This app needs access to your SMS messages to display your conversations. Grant permission to continue.",
        buttons: [
          {
            text: "Deny",
            role: "cancel",
            handler: () => resolve(false),
          },
          {
            text: "Allow",
            handler: () => resolve(true),
          },
        ],
      })
      await alert.present()
    })
  }

  private async showPermissionDeniedAlert() {
    const alert = await this.alertController.create({
      header: "Permission Denied",
      message: "SMS access is required for this app to function. Please enable it in your device settings.",
      buttons: ["OK"],
    })
    await alert.present()
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: "danger",
    })
    await toast.present()
  }

  private async loadSmsMessages() {
    const loading = await this.loadingController.create({
      message: "Loading messages...",
    })
    await loading.present()

    try {
      // In a real implementation, you would use a Capacitor plugin:
      // import { SmsReader } from '../plugins/sms-reader';
      // const messages = await SmsReader.getAllSms();

      // For now, load mock data
      this.loadMockData()

      await loading.dismiss()
    } catch (error) {
      await loading.dismiss()
      console.error("Error loading SMS:", error)
      await this.showErrorToast("Failed to load SMS messages")
    }
  }

  private loadMockData() {
    // Mock SMS data for demonstration
    this.conversations = [
      {
        contactId: "1",
        contactName: "John Doe",
        contactNumber: "+1234567890",
        lastMessage: "Hey, how are you doing?",
        lastMessageTime: Date.now() - 300000, // 5 minutes ago
        unreadCount: 2,
        messages: [
          {
            id: "1",
            address: "+1234567890",
            body: "Hey, how are you doing?",
            date: Date.now() - 300000,
            type: "inbox",
            read: false,
          },
          {
            id: "2",
            address: "+1234567890",
            body: "Are we still meeting tomorrow?",
            date: Date.now() - 180000,
            type: "inbox",
            read: false,
          },
          {
            id: "3",
            address: "+1234567890",
            body: "Yes, see you at 3 PM",
            date: Date.now() - 3600000,
            type: "sent",
            read: true,
          },
        ],
      },
      {
        contactId: "2",
        contactName: "Jane Smith",
        contactNumber: "+0987654321",
        lastMessage: "Thanks for the help!",
        lastMessageTime: Date.now() - 3600000, // 1 hour ago
        unreadCount: 0,
        messages: [
          {
            id: "4",
            address: "+0987654321",
            body: "Thanks for the help!",
            date: Date.now() - 3600000,
            type: "inbox",
            read: true,
          },
          {
            id: "5",
            address: "+0987654321",
            body: "No problem, anytime!",
            date: Date.now() - 3900000,
            type: "sent",
            read: true,
          },
        ],
      },
      {
        contactId: "3",
        contactName: "Mom",
        contactNumber: "+1122334455",
        lastMessage: "Don't forget dinner tonight",
        lastMessageTime: Date.now() - 7200000, // 2 hours ago
        unreadCount: 1,
        messages: [
          {
            id: "6",
            address: "+1122334455",
            body: "Don't forget dinner tonight",
            date: Date.now() - 7200000,
            type: "inbox",
            read: false,
          },
        ],
      },
    ]
  }

  async refreshMessages(): Promise<void> {
    if (!this.hasPermissions) {
      await this.initializePermissions()
      return
    }

    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would fetch new messages here
    // For now, just update timestamps to simulate new activity
    this.conversations.forEach((conv) => {
      if (Math.random() > 0.7) {
        // 30% chance of new message
        conv.lastMessageTime = Date.now()
        conv.unreadCount += 1
      }
    })
  }

  getConversations(): SmsConversation[] {
    return this.conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime)
  }

  getConversation(contactId: string): SmsConversation | undefined {
    return this.conversations.find((conv) => conv.contactId === contactId)
  }

  markAsRead(contactId: string) {
    const conversation = this.getConversation(contactId)
    if (conversation) {
      conversation.unreadCount = 0
      conversation.messages.forEach((msg) => (msg.read = true))
    }
  }

  hasPermission(): boolean {
    return this.hasPermissions
  }
}
