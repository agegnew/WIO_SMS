import { Component, type OnInit, ViewChild } from "@angular/core"
import type { ActivatedRoute } from "@angular/router"
import { IonContent, type NavController } from "@ionic/angular"
import type { SmsService, SmsConversation, SmsMessage } from "../services/sms.service"

@Component({
  selector: "app-conversation",
  templateUrl: "./conversation.page.html",
  styleUrls: ["./conversation.page.scss"],
})
export class ConversationPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent

  conversation: SmsConversation | undefined
  newMessage = ""

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private smsService: SmsService,
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get("contactId")
    if (contactId) {
      this.conversation = this.smsService.getConversation(contactId)
      if (this.conversation) {
        this.smsService.markAsRead(contactId)
      }
    }
  }

  ionViewDidEnter() {
    // Scroll to bottom when entering the conversation
    setTimeout(() => {
      this.scrollToBottom()
    }, 100)
  }

  goBack() {
    this.navController.back()
  }

  scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(300)
    }
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.conversation) return

    const message: SmsMessage = {
      id: Date.now().toString(),
      address: this.conversation.contactNumber,
      body: this.newMessage.trim(),
      date: Date.now(),
      type: "sent",
      read: true,
    }

    this.conversation.messages.push(message)
    this.conversation.lastMessage = message.body
    this.conversation.lastMessageTime = message.date

    this.newMessage = ""

    setTimeout(() => {
      this.scrollToBottom()
    }, 100)

    // In a real app, you would send the SMS here using Capacitor plugin
    // await this.smsService.sendSms(this.conversation.contactNumber, message.body);
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  shouldShowDateHeader(message: SmsMessage, index: number): boolean {
    if (index === 0) return true

    const currentDate = new Date(message.date).toDateString()
    const previousDate = new Date(this.conversation!.messages[index - 1].date).toDateString()

    return currentDate !== previousDate
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
}

export default ConversationPage
