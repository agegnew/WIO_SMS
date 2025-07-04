import { Component, type OnInit } from "@angular/core"
import type { Platform } from "@ionic/angular"
import type { SmsService } from "./services/sms.service"

@Component({
  selector: "app-root",
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private smsService: SmsService,
  ) {}

  async ngOnInit() {
    await this.platform.ready()

    // Initialize SMS permissions when app starts
    if (this.platform.is("android")) {
      await this.smsService.initializePermissions()
    }
  }
}
