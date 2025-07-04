import { Component, type OnInit } from "@angular/core"
import type { Router } from "@angular/router"
import type { SmsService, SmsConversation } from "../services/sms.service"

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  conversations: SmsConversation[] = []
  isRefreshing = false

  constructor(
    private smsService: SmsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadConversations()
  }

  ionViewWillEnter() {
    this.loadConversations()
  }

  loadConversations() {
    this.conversations = this.smsService.getConversations()
  }

  async doRefresh(event: any) {
    this.isRefreshing = true
    try {
      await this.smsService.refreshMessages()
      this.loadConversations()
    } finally {
      this.isRefreshing = false
      event.target.complete()
    }
  }

  openConversation(conversation: SmsConversation) {
    this.router.navigate(["/conversation", conversation.contactId])
  }

  getTimeAgo(timestamp: number): string {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return new Date(timestamp).toLocaleDateString()
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
}

export default HomePage
