import { NgModule } from "@angular/core"
import { PreloadAllModules, RouterModule, type Routes } from "@angular/router"

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "conversation/:contactId",
    loadChildren: () => import("./conversation/conversation.module").then((m) => m.ConversationPageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
