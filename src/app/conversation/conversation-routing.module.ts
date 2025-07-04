import { NgModule } from "@angular/core"
import { type Routes, RouterModule } from "@angular/router"
import { ConversationPage } from "./conversation.page"

const routes: Routes = [
  {
    path: "",
    component: ConversationPage,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationPageRoutingModule {}
